/**
 * @fileoverview Refs decorator for type-safe DOM element references in ZUI components.
 * Provides automatic element querying from Shadow DOM with proper typing.
 *
 * @module refs
 */

import { ZuiComponent } from "./types"
import { REF_CONSTRUCTOR_KEY } from "./_constants"

/**
 * Field decorator that automatically queries and assigns DOM elements from the shadow root.
 *
 * This decorator eliminates manual querySelector calls by automatically resolving
 * DOM element references when the component connects to the DOM. It provides:
 * - Type-safe element references with full TypeScript support
 * - Automatic query execution on component initialization
 * - Support for any valid CSS selector (class, ID, attribute, complex selectors)
 * - Asynchronous resolution via queueMicrotask for proper timing
 * - Works with both shadow DOM and light DOM components
 *
 * @template T - Element type extending HTMLElement (component type)
 * @template V - Reference element type extending HTMLElement (queried element type)
 *
 * @param {string} selector - CSS selector to query the element in shadow DOM or light DOM
 *
 * @returns {ClassFieldDecorator} A field decorator function
 *
 * @throws {Error} If selector doesn't match any element (returns undefined with non-null assertion)
 *
 * @example
 * // Query by class name
 * @defineElement({ tagName: 'my-component', html: '<div class="display">0</div>' })
 * class MyComponent extends Zui(HTMLElement) {
 *   @ref('.display')
 *   displayRef!: HTMLDivElement;
 *
 *   connected() {
 *     console.log(this.displayRef.textContent); // Access after connection
 *   }
 * }
 *
 * @example
 * // Query by ID
 * @defineElement({ tagName: 'my-form', html: '<button id="submit">Submit</button>' })
 * class MyForm extends Zui(HTMLElement) {
 *   @ref('#submit')
 *   submitButton!: HTMLButtonElement;
 * }
 *
 * @example
 * // Query with complex CSS selector
 * @defineElement({
 *   tagName: 'my-search',
 *   html: '<form><input type="text" class="search-input" /></form>'
 * })
 * class MySearch extends Zui(HTMLElement) {
 *   @ref('form input[type="text"]')
 *   textInput!: HTMLInputElement;
 * }
 *
 * @example
 * // Multiple references in one component
 * @defineElement({
 *   tagName: 'my-counter',
 *   html: `
 *     <button class="decrease">-</button>
 *     <span class="count">0</span>
 *     <button class="increase">+</button>
 *   `
 * })
 * class MyCounter extends Zui(HTMLElement) {
 *   @ref('.decrease')
 *   decreaseBtn!: HTMLButtonElement;
 *
 *   @ref('.count')
 *   countDisplay!: HTMLSpanElement;
 *
 *   @ref('.increase')
 *   increaseBtn!: HTMLButtonElement;
 *
 *   connected() {
 *     this.increaseBtn.addEventListener('click', () => {
 *       this.countDisplay.textContent = '1';
 *     });
 *   }
 * }
 *
 * @remarks
 * - References are resolved after the element is connected to the DOM (in connectedCallback)
 * - Uses shadowRoot.querySelector() for shadow DOM components, or this.querySelector() for light DOM
 * - Non-null assertion operator (!) is used - ensure your selector always matches an element
 * - If selector doesn't match, the reference will be undefined (runtime error on access)
 * - For dynamic content, consider querying in lifecycle hooks instead of using @ref
 * - References are not reactive - changes to the DOM won't update the reference
 *
 * @bestPractices
 * - Use specific selectors (ID or unique class) to avoid matching multiple elements
 * - Always verify selectors match elements in your HTML template
 * - For optional elements, consider checking existence before access
 * - Don't use @ref for elements that may be conditionally rendered
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector}
 * @see {@link defineElement} - Element definition decorator
 * @see {@link Zui} - Base mixin for ZUI components
 */
export const ref = (selector: string) => {
  return <T extends HTMLElement, V extends HTMLElement>(
    _target: undefined,
    context: ClassFieldDecoratorContext<T, V>,
  ) => {
    context.addInitializer(function () {
      const zuiThis = this as unknown as ZuiComponent
      const refInit = zuiThis?.[REF_CONSTRUCTOR_KEY as any]

      zuiThis[REF_CONSTRUCTOR_KEY as any] = function (this: any) {
        if (typeof refInit === "function") refInit.call(this)
        zuiThis[context.name.toString()] = (
          zuiThis.shadowRoot || zuiThis
        ).querySelector(selector)!
      }
    })
  }
}
