import { SafeHTML } from "../html"
import { isBrowser } from "../utilities"
import { callFun } from "./_helper"
import { OBSERVED_ATTRS_KEY } from "./_constants"
import { PropertyOptions } from "./property"
import { ZuiComponent, UpdateMethods } from "./types"

export interface DefineElementOptions {
  tagName: string
  html: string | SafeHTML
  css?: string
  options?: ElementDefinitionOptions
}

export const defineElement = ({ tagName, html, css = "", options }: DefineElementOptions) => {
  return <T extends CustomElementConstructor>(
    originalClass: T & { prototype: UpdateMethods<InstanceType<T>> },
    context: ClassDecoratorContext<T>
  ) => {
    const attributes = context.metadata![OBSERVED_ATTRS_KEY] as PropertyOptions[]
    const htmlString = html instanceof SafeHTML ? html.value : html;

    if (!htmlString) throw "Html is empty!"

    const template = document.createElement("template")
    template.innerHTML = `<style>${css}</style>${htmlString}`

    const NewClass = class extends (originalClass as any) {
      shadowRoot: ShadowRoot

      constructor(...args: any[]) {
        super(...args);
        this.setAttribute("z-is", tagName);
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
      customElements.define(tagName, NewClass as unknown as T, options);
    }

    return NewClass as unknown as T;
  };
}
