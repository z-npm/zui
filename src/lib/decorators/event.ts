/**
 * @fileoverview Event decorator for creating typed event emitters in ZUI components.
 * Provides type-safe custom event dispatch with automatic naming.
 * 
 * @module event
 */

import { toKebabCase } from "../utilities";
import { EVENT_CONSTRUCTOR_KEY } from "./_constants";
import { EventEmitter, ZuiComponent } from "./types";

/**
 * Configuration options for the @event decorator.
 * 
 * @interface EventOptions
 * @property {string} [name] - Custom event name (defaults to kebab-case of property name)
 * 
 * @example
 * @event({ name: 'count-changed' })
 * onChange!: EventEmitter<number>;
 */
export interface EventOptions {
  name?: string
}

/**
 * Field decorator that creates a typed EventEmitter instance for dispatching custom events.
 * 
 * Features:
 * - Automatic event naming (camelCase → kebab-case)
 * - Type-safe event payloads
 * - Bubbles and composed by default
 * - Asynchronous initialization via queueMicrotask
 * 
 * @template T - Element type extending HTMLElement
 * @template V - Event detail type
 * @param {EventOptions} [options={}] - Event configuration options
 * @returns {ClassFieldDecorator} A field decorator function
 * 
 * @example
 * ```typescript
 * // Basic usage with automatic naming
 * @event()
 * counterClick!: EventEmitter<{ count: number }>;
 * // Dispatches 'counter-click' event
 * 
 * // With custom event name
 * @event({ name: 'value-changed' })
 * onChange!: EventEmitter<number>;
 * // Dispatches 'value-changed' event
 * 
 * // Usage in component
 * this.counterClick.emit({ count: this.count });
 * ```
 * 
 * @remarks
 * - Events bubble up the DOM tree by default
 * - Events can cross shadow DOM boundaries (composed: true)
 * - Event name is converted to kebab-case automatically
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent}
 * @see {@link EventEmitter}
 */
export const event = (options: EventOptions = {}) => {
  return <T extends HTMLElement, V>(
    _target: undefined,
    context: ClassFieldDecoratorContext<T, EventEmitter<V>>
  ) => {
    const eventName = options.name ?? toKebabCase(context.name.toString())

    context.addInitializer(function (this: T) {
      const zuiThis = this as unknown as ZuiComponent
      const refInit = zuiThis?.[EVENT_CONSTRUCTOR_KEY as any]

      zuiThis[EVENT_CONSTRUCTOR_KEY as any] = function (this: any) {
        if (typeof refInit === "function") refInit.call(this);
        zuiThis[context.name.toString()] = new EventEmitter<V>(zuiThis, eventName)
      }
    })
  }
}

