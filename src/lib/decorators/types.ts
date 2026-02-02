/**
 * @fileoverview Core TypeScript types and interfaces for ZUI framework.
 * Defines type-safe event systems, update methods, and component interfaces.
 * 
 * @module types
 */

/**
 * Type guard for property update methods based on property type.
 * 
 * @template T - Property type
 * @example
 * // For number properties:
 * countUpdate(oldValue: number, newValue: number): void
 * 
 * // For string properties:
 * nameUpdate(oldValue: string, newValue: string): void
 */
export type PropertyUpdateMethod<T> =
  T extends number ? (oldValue: number, newValue: number) => void :
  T extends string ? (oldValue: string, newValue: string) => void :
  T extends boolean ? (oldValue: boolean, newValue: boolean) => void :
  (oldValue: T, newValue: T) => void

/**
 * Mapped type that generates update method names from property names.
 * Automatically appends 'Update' suffix to property names.
 * 
 * @template T - Component instance type
 * @example
 * // If component has properties: count, name
 * // UpdateMethods will include: countUpdate?, nameUpdate?
 */
export type UpdateMethods<T> = {
  [K in keyof T as `${string & K}Update`]?:
  K extends keyof T
  ? PropertyUpdateMethod<T[K]>
  : never
}

/**
 * Base interface for all ZUI components.
 * Extends HTMLElement with optional lifecycle methods.
 * 
 * @interface ZuiComponent
 * @extends HTMLElement
 */
export interface ZuiComponent extends HTMLElement {
  /** Called when element connects to DOM */
  connected?(): void;
  /** Called when element disconnects from DOM */
  disconnected?(): void;
  /** Called when observed attribute changes */
  attributeChanged?(attributeName: string, oldValue: string, newValue: string): void;
  /** Index signature for dynamic properties */
  [key: string]: any;
}

/**
 * Wrapper for custom event detail.
 * 
 * @template T - Detail type
 * @interface CustomEventDetail
 * @property {T} value - The event payload
 */
export interface CustomEventDetail<T> {
  value: T;
}

/**
 * Type-safe event emitter for dispatching custom events.
 * 
 * @template T - Event detail type
 * @class EventEmitter
 * 
 * @example
 * ```typescript
 * const emitter = new EventEmitter<number>(element, 'count-changed');
 * emitter.emit(42);
 * ```
 */
export class EventEmitter<T> {
  /**
   * Creates an event emitter.
   * @param target - The element that will dispatch events
   * @param eventName - Name of the custom event (converted to kebab-case)
   */
  constructor(private target: HTMLElement, private eventName: string) { }

  /**
   * Dispatches a custom event.
   * 
   * @param {T} value - Event payload
   * @param {Omit<CustomEventInit, 'detail'>} [options] - Additional event options
   * 
   * @example
   * ```typescript
   * this.counterClick.emit({ count: 1 }, { bubbles: false });
   * ```
   * 
   * @remarks
   * - Events bubble and composed are true by default
   * - Detail is wrapped in { value: payload } structure
   */
  emit(value: T, options?: Omit<CustomEventInit, 'detail'>) {
    this.target.dispatchEvent(
      new CustomEvent<CustomEventDetail<T>>(this.eventName, {
        detail: { value },
        bubbles: true,
        composed: true,
        ...options,
      })
    )
  }
}

/**
 * Extracts the event detail type from an EventEmitter.
 * 
 * @template T - EventEmitter type
 */
export type EventDetail<T> = T extends EventEmitter<infer U> ? U : never;

/**
 * Converts camelCase strings to kebab-case.
 * Used for automatic event name generation.
 * 
 * @template S - Input string type
 */
export type KebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
  ? `${Uncapitalize<T>}${KebabCase<U>}`
  : `${Uncapitalize<T>}-${KebabCase<U>}`
  : S

/**
 * Infers the CustomEvent detail type from an EventEmitter.
 * 
 * @template T - EventEmitter type
 */
export type InferEventDetail<T> = T extends EventEmitter<infer U>
  ? CustomEventDetail<U>
  : never

/**
 * Maps component event properties to their corresponding event types.
 * 
 * @template T - Component type
 * 
 * @example
 * ```typescript
 * // If component has: counterClick!: EventEmitter<{ count: number }>;
 * // Then ZuiEventMap<Component> includes: 'counter-click': { value: { count: number } }
 * ```
 */
export type ZuiEventMap<T> = {
  [K in keyof T as T[K] extends EventEmitter<any>
  ? KebabCase<string & K>
  : never]: InferEventDetail<T[K]>
}

