/**
 * @fileoverview State decorator for reactive internal state management in ZUI components.
 * Provides reactive state that triggers updates without reflecting to DOM attributes.
 * 
 * @module state
 */

import { makeReactive } from "@o.z/utils";
import { ZuiComponent } from "./types";

/**
 * Configuration options for the @state decorator.
 * 
 * @interface StateOptions
 * @property {string} [callbackName] - Custom update callback method name
 * 
 * @example
 * @state({ callbackName: 'onHistoryChange' })
 * accessor history: number[] = [];
 */
export interface StateOptions {
  callbackName?: string
}

/**
 * Accessor decorator for internal reactive state that doesn't reflect to DOM attributes.
 * 
 * Features:
 * - Reactive state for objects and arrays
 * - Automatic update callbacks on state changes
 * - Deep reactivity with Proxy
 * - No attribute reflection (unlike @property)
 * 
 * @template T - Element type extending HTMLElement
 * @template V - State value type
 * @param {StateOptions} [options={}] - State configuration options
 * @returns {ClassAccessorDecorator} An accessor decorator function
 * 
 * @example
 * ```typescript
 * // Reactive array state
 * @state()
 * accessor items: string[] = [];
 * // Calls itemsUpdate() on array mutations
 * 
 * // Reactive object state
 * @state()
 * accessor user = { name: '', age: 0 };
 * // Calls userUpdate() on property changes
 * 
 * // With custom callback
 * @state({ callbackName: 'onDataChange' })
 * accessor data = {};
 * // Calls onDataChange() instead of dataUpdate()
 * ```
 * 
 * @remarks
 * - Best for complex objects, arrays, or private data
 * - Uses Proxy for deep reactivity
 * - Update callbacks receive (oldValue, newValue)
 * - Changes are batched with queueMicrotask
 * 
 * @see {@link makeReactive}
 */
export const state = ({ callbackName }: StateOptions = {}) => {
  return <T extends HTMLElement, V>(
    accessor: { get: (this: T) => V, set: (this: T, value: V) => void },
    context: ClassAccessorDecoratorContext<T, V>
  ) => {
    const propName = context.name.toString()
    const updateMethodName = callbackName ?? `${propName}Update`

    return {
      init(this: T, initialValue: V): V {
        const zuiThis = this as unknown as ZuiComponent

        const triggerUpdate = () => {
          queueMicrotask(() => {
            if (typeof zuiThis[updateMethodName] === 'function') {
              zuiThis[updateMethodName](initialValue, initialValue)
            }
          })
        }

        let finalValue = initialValue;
        if (initialValue && typeof initialValue === 'object') {
          finalValue = makeReactive(initialValue as object, triggerUpdate) as V
        }

        triggerUpdate()
        return finalValue
      },
      get(this: T): V {
        return accessor.get.call(this)
      },
      set(this: T, newValue: V) {
        const zuiThis = this as unknown as ZuiComponent

        const triggerUpdate = () => {
          queueMicrotask(() => {
            if (typeof zuiThis[updateMethodName] === 'function') {
              zuiThis[updateMethodName](newValue, newValue)
            }
          })
        }

        let finalValue = newValue
        if (newValue && typeof newValue === 'object') {
          finalValue = makeReactive(newValue as object, triggerUpdate) as V
        }

        accessor.set.call(this, finalValue)
        triggerUpdate()
      }
    }
  }
}

