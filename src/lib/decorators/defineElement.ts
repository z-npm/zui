/**
 * @fileoverview Core decorator for defining custom elements in ZUI framework.
 * Provides declarative element registration with template, styles, and lifecycle hooks.
 * 
 * @module defineElement
 */

import { SafeHTML } from "../html"
import { isBrowser } from "../utilities"
import { callFun } from "./_helper"
import { OBSERVED_ATTRS_KEY } from "./_constants"
import { PropertyOptions } from "./property"
import { ZuiComponent, UpdateMethods } from "./types"

/**
 * Configuration options for defining a custom element.
 * 
 * @interface DefineElementOptions
 * @property {string} tagName - The custom element tag name (must contain hyphen, e.g., 'my-counter')
 * @property {string|SafeHTML} html - HTML template string or SafeHTML object for the element's shadow DOM
 * @property {string} [css] - Optional CSS string to inject into the shadow DOM
 * @property {ElementDefinitionOptions} [options] - Custom element definition options including extension support
 * 
 * @example
 * @defineElement({
 *   tagName: 'my-counter',
 *   html: '<div>Count: <span class="count"></span></div>',
 *   css: ':host { display: block; }',
 *   options: { extends: 'div' }
 * })
 */
export interface DefineElementOptions {
  tagName: string
  html: string | SafeHTML
  css?: string
  options?: ElementDefinitionOptions
}

/**
 * Class decorator that registers a custom element with the browser's Custom Elements registry.
 * 
 * This decorator:
 * 1. Creates a Shadow DOM for the element
 * 2. Injects HTML and CSS templates
 * 3. Sets up lifecycle callbacks (connected/disconnected)
 * 4. Handles attribute change observation
 * 5. Registers the element with customElements.define()
 * 
 * @template T - Constructor type extending CustomElementConstructor
 * @param {DefineElementOptions} config - Element configuration object
 * @returns {ClassDecorator} A class decorator function
 * 
 * @throws {string} If HTML template is empty
 * @example
 * ```typescript
 * @defineElement({
 *   tagName: 'my-counter',
 *   html: counterTemplate,
 *   css: counterStyles,
 *   options: { extends: 'div' }
 * })
 * class Counter extends Zui(HTMLDivElement) {
 *   // class implementation
 * }
 * ```
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow}
 */
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
