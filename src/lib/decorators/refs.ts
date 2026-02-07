/**
 * @fileoverview Refs decorator for type-safe DOM element references in ZUI components.
 * Provides automatic element querying from Shadow DOM with proper typing.
 * 
 * @module refs
 */

import { ZuiComponent } from "./types";
import { REF_CONSTRUCTOR_KEY } from "./_constants";

/**
 * Field decorator that automatically queries and assigns DOM elements from the shadow root.
 * 
 * Features:
 * - Type-safe element references
 * - Automatic query on component initialization
 * - Works with any CSS selector
 * - Asynchronous resolution via queueMicrotask
 * 
 * @template T - Element type extending HTMLElement
 * @template V - Reference element type extending HTMLElement
 * @param {string} selector - CSS selector to query the element in shadow DOM
 * @returns {ClassFieldDecorator} A field decorator function
 * 
 * @throws {Error} If selector doesn't match any element (returns null)
 * 
 * @example
 * ```typescript
 * // Query by class
 * @ref('.counter-display')
 * displayRef!: HTMLDivElement;
 * 
 * // Query by ID
 * @ref('#submit-btn')
 * submitButton!: HTMLButtonElement;
 * 
 * // Query with complex selector
 * @ref('form input[type="text"]')
 * textInput!: HTMLInputElement;
 * ```
 * 
 * @remarks
 * - References are resolved after the element is connected to DOM
 * - Uses shadowRoot.querySelector() internally
 * - Non-null assertion is used, ensure selector matches
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector}
 */
export const ref = (selector: string) => {
  return <T extends HTMLElement, V extends HTMLElement>(_target: undefined, context: ClassFieldDecoratorContext<T, V>) => {
    context.addInitializer(function () {
      const zuiThis = this as unknown as ZuiComponent
      const refInit = zuiThis?.[REF_CONSTRUCTOR_KEY as any]

      zuiThis[REF_CONSTRUCTOR_KEY as any] = function (this: any) {
        if (typeof refInit === "function") refInit.call(this);
        zuiThis[context.name.toString()] = zuiThis.shadowRoot!.querySelector(selector)!
      }
    })
  }
}

