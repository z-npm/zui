/**
 * @fileoverview Zui mixin for enhanced Web Components with TypeScript support.
 * Provides improved event typing and lifecycle method structure.
 * 
 * @module mixin
 */

import { ZuiEventMap } from "./types";

/**
 * Mixin function that enhances base HTML elements with ZUI capabilities.
 * 
 * Features:
 * - Type-safe event listeners for custom events
 * - Abstract lifecycle methods (connected, disconnected, attributeChanged)
 * - Proper inheritance chain for customized built-in elements
 * 
 * @template TBase - Base constructor type (extends HTMLElement)
 * @param {TBase} Base - Base class constructor to enhance
 * @returns {abstract class} Enhanced class with ZUI capabilities
 * 
 * @example
 * ```typescript
 * // Extend native div element
 * class Counter extends Zui(HTMLDivElement) {
 *   connected() {
 *     console.log('Counter connected to DOM');
 *   }
 * }
 * 
 * // Extend button element
 * class CustomButton extends Zui(HTMLButtonElement) {
 *   @event()
 *   customClick!: EventEmitter<void>;
 * }
 * ```
 * 
 * @remarks
 * - Must be used as a base class for all ZUI components
 * - Provides abstract methods that should be implemented
 * - Enables type inference for custom event maps
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements}
 */
export function Zui<TBase extends new (...args: any[]) => HTMLElement>(Base: TBase) {
  abstract class ZuiElement extends Base {
    /**
     * Called when the element is connected to the DOM.
     * Override to perform setup operations.
     */
    abstract connected?(): void

    /**
     * Called when the element is disconnected from the DOM.
     * Override to perform cleanup operations.
     */
    abstract disconnected?(): void

    /**
     * Called when an observed attribute changes.
     * @param attributeName - Name of the changed attribute
     * @param oldValue - Previous attribute value
     * @param newValue - New attribute value
     */
    abstract attributeChanged?(attributeName: string, oldValue: string, newValue: string): void

    /**
     * Type-safe overload for adding event listeners.
     * Supports both custom ZUI events and standard DOM events.
     * 
     * @template K - Event type key
     * @param {K} type - Event type to listen for
     * @param {(ev: CustomEvent<ZuiEventMap<this>[K]>) => void} listener - Event handler function
     * @param {boolean | AddEventListenerOptions} [options] - Event listener options
     */
    addEventListener<K extends keyof ZuiEventMap<this>>(
      type: K,
      listener: (ev: CustomEvent<ZuiEventMap<this>[K]>) => void,
      options?: boolean | AddEventListenerOptions
    ): void

    /**
     * Standard DOM event listener.
     */
    addEventListener<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void

    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ): void
    addEventListener(
      type: string,
      listener: any,
      options?: boolean | AddEventListenerOptions
    ): void {
      super.addEventListener(type, listener, options);
    }
  }

  return ZuiElement
}

