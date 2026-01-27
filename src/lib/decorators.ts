import { SafeHTML } from "./html";
import { EventEmitter, ZuiComponent } from "./types";
import { isBrowser, makeReactive, toKebabCase } from "./utilities";

const OBSERVED_ATTRS_KEY = Symbol('observedAttributes');

const callFun = (attribute: PropertyProp | undefined, oldValue: unknown, newValue: unknown, zuiThis: ZuiComponent) => {
  if (attribute) {
    const funName = attribute.callbackName!
    if (funName in zuiThis) {
      if (attribute.type === "string") {
        zuiThis[funName](oldValue, newValue);
      } else if (attribute.type === "number") {
        zuiThis[funName](+(oldValue as string), +(newValue as string));
      } else if (attribute.type === "boolean") {
        zuiThis[funName](
          typeof oldValue === "string" ? oldValue === "" || String(oldValue).toLowerCase() === "true" : Boolean(oldValue),
          typeof newValue === "string" ? newValue === "" || String(newValue).toLowerCase() === "true" : Boolean(newValue)
        );
      }
    }
  }
}

const getConvertor = ({ type, name }: PropertyProp, zuiThis: ZuiComponent): number | string | boolean | undefined => {
  const value = zuiThis.getAttribute(name!)
  if (value !== undefined && value !== null) {
    if (type === "number")
      return +value
    else if (type === "string")
      return value
    else if (type === "boolean") {
      return (value === "" || value?.toLowerCase() === "true")
    }
    else throw `Only accept type of "string", "number", "boolean"`
  }
}

export interface DefineElementProp {
  tagName: string
  html: string | SafeHTML
  css?: string
  options?: ElementDefinitionOptions
}

export const defineElement = ({ tagName, html, css = "", options }: DefineElementProp) => {
  return <T extends CustomElementConstructor>(
    originalClass: T,
    context: ClassDecoratorContext<T>
  ) => {
    const attributes = context.metadata![OBSERVED_ATTRS_KEY] as PropertyProp[]
    const htmlString = html instanceof SafeHTML ? html.value : html;

    if (!htmlString) throw "Html is empty!"

    const template = document.createElement("template")
    template.innerHTML = `<style>${css}</style>${htmlString}`

    const NewClass = class extends originalClass {
      shadowRoot: ShadowRoot

      constructor(...args: any[]) {
        super(...args);
        this.setAttribute("is", tagName);
        this.shadowRoot = this.attachShadow({ mode: "closed" })
        this.shadowRoot!.appendChild(template.content.cloneNode(true))
      }

      connectedCallback() {
        queueMicrotask(() => {
          const zuiThis = this as unknown as ZuiComponent
          zuiThis.connected?.()
        })
      }

      disconnectedCallback() {
        queueMicrotask(() => {
          const zuiThis = this as unknown as ZuiComponent
          zuiThis.disconnected?.()
        })
      }

      attributeChangedCallback(
        attributeName: string,
        oldValue: string,
        newValue: string,
      ) {
        const zuiThis = this as unknown as ZuiComponent
        if (oldValue !== newValue) {
          zuiThis.attributeChanged?.(attributeName, oldValue, newValue)
        }

        if (oldValue !== newValue) {
          callFun(
            attributes.find(i => i.name === attributeName),
            oldValue,
            newValue,
            zuiThis)
        }
      }
    };

    (NewClass as any).observedAttributes = attributes.map(i => (i.name))

    if (isBrowser && !customElements.get(tagName)) {
      customElements.define(tagName, NewClass, options);
    }

    return NewClass as T & { prototype: { zcolor: string } };
  };
}

export interface PropertyProp {
  type?: "string" | "number" | "boolean"
  name?: string
  callbackName?: string
}

export const property = ({ type, name, callbackName }: PropertyProp = {}) => {
  return <T extends HTMLElement, V extends number | string | boolean>(
    _accessor: { get: (this: T) => V, set: (this: T, value: V) => void },
    context: ClassAccessorDecoratorContext<T, V>) => {
    const attributName = name ?? toKebabCase(context.name.toString())
    const attributCallbackName = callbackName ?? `${context.name.toString()}Update`
    let attribute: PropertyProp = { type, name: attributName, callbackName: attributCallbackName }

    context.metadata![OBSERVED_ATTRS_KEY] ??= [];
    const attributes = context.metadata![OBSERVED_ATTRS_KEY] as PropertyProp[];
    attributes.push(attribute)

    return {
      init(this: T, initialValue: V): V {
        attribute.type = type ?? typeof initialValue as any

        const zuiThis = this as unknown as ZuiComponent
        zuiThis.setAttribute(attribute.name!, String(initialValue));

        queueMicrotask(() => {
          callFun(
            attribute,
            initialValue,
            initialValue,
            zuiThis)
        });

        return initialValue;
      },
      get: function (this: T): V {
        const zuiThis = this as unknown as ZuiComponent
        return getConvertor(attribute, zuiThis) as V
      },
      set: function (this: T, value: V) {
        queueMicrotask(() => {
          const zuiThis = this as unknown as ZuiComponent
          const oldValue = getConvertor(attribute, zuiThis)
          if (attribute.type === "string" || attribute.type === "number") {
            zuiThis.setAttribute(attributName, String(value))
          } else if (attribute.type === "boolean") {
            zuiThis.setAttribute(attributName, value ? "true" : "false")
          }
          else throw `Only accept type of "string", "number", "boolean"`
          if (oldValue !== value)
            callFun(
              attribute,
              oldValue,
              value,
              zuiThis)
        })
      }
    }
  };
}

export interface StateOptions {
  callbackName?: string
}

/**
 * Decorator for internal reactive state.
 * Triggers component updates but does NOT reflect to DOM attributes.
 * Useful for Objects, Arrays, or private data.
 */
export const state = ({ callbackName }: StateOptions = {}) => {
  return <T extends HTMLElement, V>(
    accessor: { get: (this: T) => V, set: (this: T, value: V) => void },
    context: ClassAccessorDecoratorContext<T, V>
  ) => {
    const propName = context.name.toString();
    const updateMethodName = callbackName ?? `${propName}Update`;

    return {
      init(this: T, initialValue: V): V {
        const zuiThis = this as unknown as ZuiComponent;

        const triggerUpdate = () => {
          queueMicrotask(() => {
            if (typeof zuiThis[updateMethodName] === 'function') {
              zuiThis[updateMethodName](initialValue, initialValue);
            }
          });
        };

        let finalValue = initialValue;
        if (initialValue && typeof initialValue === 'object') {
          finalValue = makeReactive(initialValue as object, triggerUpdate) as V;
        }

        triggerUpdate();
        return finalValue;
      },
      get(this: T): V {
        return accessor.get.call(this);
      },
      set(this: T, newValue: V) {
        const zuiThis = this as unknown as ZuiComponent;

        const triggerUpdate = () => {
          queueMicrotask(() => {
            if (typeof zuiThis[updateMethodName] === 'function') {
              zuiThis[updateMethodName](newValue, newValue);
            }
          });
        };

        let finalValue = newValue;
        if (newValue && typeof newValue === 'object') {
          finalValue = makeReactive(newValue as object, triggerUpdate) as V;
        }

        accessor.set.call(this, finalValue);
        triggerUpdate();
      }
    };
  };
};

export const ref = (selector: string) => {
  return <T extends HTMLElement, V extends HTMLElement>(_target: undefined, context: ClassFieldDecoratorContext<T, V>) => {
    context.addInitializer(function () {
      queueMicrotask(() => {
        const zuiThis = this as unknown as ZuiComponent
        zuiThis[context.name.toString()] = zuiThis.shadowRoot!.querySelector(selector)!
      })
    })
  }
}

interface EventProp {
  name?: string
}

export const event = (options: EventProp = {}) => {
  return <T extends HTMLElement, V>(
    _target: undefined,
    context: ClassFieldDecoratorContext<T, EventEmitter<V>>
  ) => {
    const eventName = options.name ?? toKebabCase(context.name.toString());

    context.addInitializer(function (this: T) {
      queueMicrotask(() => {
        const zuiThis = this as unknown as ZuiComponent
        zuiThis[context.name.toString()] = new EventEmitter<V>(zuiThis, eventName);
      })
    });
  };
};

