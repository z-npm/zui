import { EventEmitter, toKebabCase } from "./utilities";

const OBSERVED_ATTRS_KEY = Symbol('observedAttributes');

const callFun = (attribute: PropertyProp | undefined, oldValue: any, newValue: any, bindThis: any) => {
  if (attribute) {
    const funName = attribute.callbackName!
    if (funName in bindThis) {
      if (attribute.type === "string") {
        bindThis[funName](oldValue, newValue);
      } else if (attribute.type === "number") {
        bindThis[funName](+oldValue, +newValue);
      } else if (attribute.type === "boolean") {
        bindThis[funName](
          typeof oldValue === "string" ? oldValue === "" || String(oldValue).toLowerCase() === "true" : Boolean(oldValue),
          typeof newValue === "string" ? newValue === "" || String(newValue).toLowerCase() === "true" : Boolean(newValue)
        );
      }
    }
  }
}

const getConvertor = ({ type, name }: PropertyProp, bindThis: any): number | string | boolean | undefined => {
  const value = bindThis.getAttribute(name)
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
  html: string
  css?: string
  options?: ElementDefinitionOptions
}

export const defineElement = ({ tagName, html, css = "", options }: DefineElementProp) => {
  return <T extends CustomElementConstructor>(
    originalClass: T,
    context: ClassDecoratorContext<T>
  ) => {
    const attributes = context.metadata![OBSERVED_ATTRS_KEY] as PropertyProp[]
    if (!html) throw "Html is empty!"

    const template = document.createElement("template")
    template.innerHTML = `<style>${css}</style>${html}`

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
          (this as any)?.["connected"]()
        })
      }

      disconnectedCallback() {
        queueMicrotask(() => {
          (this as any)?.["disconnected"]()
        })
      }

      attributeChangedCallback(
        attributeName: string,
        oldValue: string,
        newValue: string,
      ) {
        if (oldValue !== newValue) {
          (this as any)?.["attributyyeChanged"]?.(attributeName, oldValue, newValue)
        }

        if (oldValue !== newValue) {
          callFun(
            attributes.find(i => i.name === attributeName),
            oldValue,
            newValue,
            this)
        }
      }
    };

    (NewClass as any).observedAttributes = attributes.map(i => (i.name))

    if (!customElements.get(tagName)) {
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

        this.setAttribute(attribute.name!, String(initialValue));

        queueMicrotask(() => {
          callFun(
            attribute,
            initialValue,
            initialValue,
            this)
        });

        return initialValue;
      },
      get: function (this: T): V {
        return getConvertor(attribute, this) as V
      },
      set: function (this: T, value: V) {
        queueMicrotask(() => {
          const oldValue = getConvertor(attribute, this)
          if (attribute.type === "string" || attribute.type === "number") {
            this.setAttribute(attributName, String(value))
          } else if (attribute.type === "boolean") {
            this.setAttribute(attributName, value ? "true" : "false")
          }
          else throw `Only accept type of "string", "number", "boolean"`
          if (oldValue !== value)
            callFun(
              attribute,
              oldValue,
              value as any,
              this)
        })
      }
    }
  };
}

export const ref = (selector: string) => {
  return <T extends HTMLElement, V extends HTMLElement>(_target: undefined, context: ClassFieldDecoratorContext<T, V>) => {
    context.addInitializer(function () {
      queueMicrotask(() => {
        (this as any)[context.name] = (this as any).shadowRoot.querySelector(selector)!
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
        (this as any)[context.name] = new EventEmitter<V>(this, eventName);
      })
    });
  };
};

