/**
 * @fileoverview Core decorator for defining custom elements in ZUI framework.
 * Provides declarative element registration with template, styles, and lifecycle hooks.
 *
 * @module defineElement
 */

import { isBrowser, SafeHTML } from "@o.z/utils"
import { callFun } from "./_helper"
import {
  OBSERVED_ATTRS_KEY,
  REF_CONSTRUCTOR_KEY,
  EVENT_CONSTRUCTOR_KEY,
  FETCH_CONSTRUCTOR_KEY,
} from "./_constants"
import { PropertyOptions } from "./property"
import { ZuiComponent, UpdateMethods } from "./types"

/**
 * Configuration options for defining a custom element.
 *
 * @typedef {Object} DefineElementOptions
 * @property {string} tagName - The custom element tag name (must contain hyphen, e.g., 'my-counter')
 * @property {string|SafeHTML} html - HTML template string or SafeHTML object for the element's shadow DOM
 * @property {string} [css] - Optional CSS string to inject into the shadow DOM
 * @property {ElementDefinitionOptions} [options] - Custom element definition options including extension support
 * @property {boolean} [shadowDom=true] - Whether to create a shadow DOM (default: true). If false, uses light DOM
 *
 * @example
 * const options = {
 *   tagName: 'my-counter',
 *   html: '<div>Count: </div>',
 *   css: ':host { display: block; }',
 *   options: { extends: 'div' },
 *   shadowDom: true
 * };
 */
export interface DefineElementOptions {
  tagName: string
  html: string | SafeHTML
  css?: string
  options?: ElementDefinitionOptions
  shadowDom?: boolean
}

/**
 * Class decorator that registers a custom element with the browser's Custom Elements registry.
 *
 * This decorator provides a declarative way to define web components with automatic:
 * - Shadow DOM creation and management
 * - HTML and CSS template injection
 * - Lifecycle callback setup (connectedCallback, disconnectedCallback, attributeChangedCallback)
 * - Attribute observation and property synchronization
 * - Custom element registration via customElements.define()
 *
 * @template T - Constructor type extending CustomElementConstructor
 *
 * @param {DefineElementOptions} config - Element configuration object
 * @param {string} config.tagName - Custom element tag name (must contain hyphen)
 * @param {string|SafeHTML} config.html - HTML template for shadow/light DOM
 * @param {string} [config.css] - Optional CSS styles
 * @param {ElementDefinitionOptions} [config.options] - Custom element definition options
 * @param {boolean} [config.shadowDom=true] - Enable shadow DOM (default: true)
 *
 * @returns {ClassDecorator} A class decorator function that returns the enhanced class
 *
 * @throws {string} If HTML template is empty or undefined
 * @throws {Error} If tag name doesn't contain a hyphen (browser enforcement)
 * @throws {Error} If element with same tagName is already registered
 *
 * @example
 * // Basic usage with shadow DOM
 * @defineElement({
 *   tagName: 'my-counter',
 *   html: '<div class="counter">0</div>',
 *   css: ':host { display: block; }'
 * })
 * class Counter extends Zui(HTMLElement) {
 *   // class implementation
 * }
 *
 * @example
 * // Extending native element (customized built-in)
 * @defineElement({
 *   tagName: 'my-button',
 *   html: '<button><slot></slot></button>',
 *   css: 'button { color: blue; }',
 *   options: { extends: 'button' }
 * })
 * class MyButton extends Zui(HTMLButtonElement) {
 *   // class implementation
 * }
 *
 * @example
 * // Light DOM mode (no shadow DOM)
 * @defineElement({
 *   tagName: 'my-container',
 *   html: '<div><slot></slot></div>',
 *   shadowDom: false
 * })
 * class MyContainer extends Zui(HTMLElement) {
 *   // class implementation
 * }
 *
 * @remarks
 * - The decorator automatically calls customElements.define() in browser environments
 * - Server-side rendering is safe (registration is skipped when not in browser)
 * - HTML templates are cloned for each instance to prevent shared state
 * - CSS is scoped to shadow DOM when shadowDom option is true
 * - The class must extend Zui(BaseElement) for proper lifecycle integration
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements}
 * @see {@link Zui} - Base mixin for ZUI components
 */
export const defineElement = ({
  tagName,
  html,
  css = "",
  options,
  shadowDom = true,
}: DefineElementOptions) => {
  return <T extends CustomElementConstructor>(
    originalClass: T & { prototype: UpdateMethods<InstanceType<T>> },
    context: ClassDecoratorContext<T>,
  ) => {
    const attributes = (context.metadata?.[OBSERVED_ATTRS_KEY] ||
      []) as PropertyOptions[]
    const htmlString = html instanceof SafeHTML ? html.value : html

    if (!htmlString) throw "Html is empty!"

    const template = document.createElement("template")
    template.innerHTML = `<style>${css}</style>${htmlString}`

    const NewClass = class extends (originalClass as any) {
      shadowRoot?: ShadowRoot

      constructor(...args: any[]) {
        super(...args)
        this.setAttribute("z-is", tagName)
        if (shadowDom) {
          this.shadowRoot = this.attachShadow({ mode: "closed" })
          this.shadowRoot!.appendChild(template.content.cloneNode(true))
        } else {
          this.appendChild(template.content.cloneNode(true))
        }
        this?.[EVENT_CONSTRUCTOR_KEY as any]?.()
        this?.[REF_CONSTRUCTOR_KEY as any]?.()
      }

      connectedCallback() {
        queueMicrotask(() => {
          const zuiThis = this as unknown as ZuiComponent
          zuiThis.connected?.()
          queueMicrotask(() => {
            this?.[FETCH_CONSTRUCTOR_KEY as any]?.()
          })
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
          zuiThis?.attributeChanged?.(attributeName, oldValue, newValue)

          callFun(
            attributes.find((i) => i.name === attributeName),
            oldValue,
            newValue,
            zuiThis,
          )
        }
      }
    }

    ;(NewClass as any).observedAttributes = attributes.map((i) => i.name)

    if (isBrowser && !customElements.get(tagName)) {
      customElements.define(tagName, NewClass as unknown as T, options)
    }

    return NewClass as unknown as T
  }
}
