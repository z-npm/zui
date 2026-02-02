/**
 * @fileoverview Property decorator for reactive attributes in ZUI components.
 * Creates two-way binding between JavaScript properties and DOM attributes.
 * 
 * @module property
 */

import { toKebabCase } from "../utilities";
import { callFun, getConvertor } from "./_helper";
import { OBSERVED_ATTRS_KEY } from "./_constants";
import { ZuiComponent } from "./types";

/**
 * Supported property types for attribute reflection.
 */
export type PropertyType = "string" | "number" | "boolean";

/**
 * Suffix for update callback methods.
 */
export type PropertyCallback = "Update" | "Changed";

/**
 * Configuration options for the @property decorator.
 * 
 * @interface PropertyOptions
 * @property {PropertyType} [type] - Type of the property for attribute conversion
 * @property {string} [name] - Custom attribute name (defaults to kebab-case of property name)
 * @property {`${string}${PropertyCallback}`} [callbackName] - Custom update callback method name
 * 
 * @example
 * @property({ type: 'number', name: 'count-value' })
 * accessor count = 0;
 */
export interface PropertyOptions {
  type?: PropertyType;
  name?: string;
  callbackName?: `${string}${PropertyCallback}`;
}

/**
 * Accessor decorator that creates reactive properties synchronized with DOM attributes.
 * 
 * Features:
 * - Automatic attribute reflection (property ↔ attribute)
 * - Type conversion (string, number, boolean)
 * - Lifecycle hooks with automatic update callbacks
 * - Default values from initializer
 * 
 * @template T - Element type extending HTMLElement
 * @template V - Property value type (number | string | boolean)
 * @param {PropertyOptions} [options={}] - Property configuration options
 * @returns {ClassAccessorDecorator} An accessor decorator function
 * 
 * @example
 * ```typescript
 * // Basic usage with type inference
 * @property()
 * accessor count = 0; // Creates 'count' attribute, calls countUpdate()
 * 
 * // With custom attribute name
 * @property({ name: 'is-enabled' })
 * accessor enabled = true; // Creates 'is-enabled' attribute
 * 
 * // With explicit type
 * @property({ type: 'boolean' })
 * accessor disabled = false;
 * ```
 * 
 * @remarks
 * - Boolean attributes are set as "true"/"false" strings
 * - Empty string for boolean attributes evaluates to true
 * - Update methods are called asynchronously via queueMicrotask
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute}
 */
export const property = ({ type, name, callbackName }: PropertyOptions = {}) => {
  return <T extends HTMLElement, V extends number | string | boolean>(
    _accessor: { get: (this: T) => V, set: (this: T, value: V) => void },
    context: ClassAccessorDecoratorContext<T, V>) => {
    const attributName = name ?? toKebabCase(context.name.toString())
    const attributCallbackName = callbackName ?? `${context.name.toString()}Update`
    let attribute: PropertyOptions = { type, name: attributName, callbackName: attributCallbackName }

    context.metadata![OBSERVED_ATTRS_KEY] ??= [];
    const attributes = context.metadata![OBSERVED_ATTRS_KEY] as PropertyOptions[];
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

