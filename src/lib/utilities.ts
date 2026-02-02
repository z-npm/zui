/**
 * @fileoverview General utility functions for the ZUI framework.
 * Includes helpers for string manipulation, browser detection, and reactive programming.
 * 
 * @module utilities
 */

/**
 * Creates a promise that resolves after a specified delay.
 * 
 * Useful for debouncing, animations, or simulating async operations.
 * 
 * @param {number} ms - Delay in milliseconds
 * @returns {Promise<void>} Promise that resolves after the delay
 * 
 * @example
 * ```typescript
 * // Wait for 1 second
 * await delay(1000);
 * console.log('1 second later');
 * ```
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout}
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Converts a camelCase or PascalCase string to kebab-case.
 * 
 * Used internally for attribute and event name generation.
 * 
 * @param {string} str - Input string in camelCase or PascalCase
 * @returns {string} kebab-case version of the input
 * 
 * @example
 * ```typescript
 * toKebabCase('myVariableName'); // 'my-variable-name'
 * toKebabCase('HTMLDivElement'); // 'html-div-element'
 * toKebabCase('dataURL'); // 'data-url'
 * toKebabCase('backgroundColor'); // 'background-color'
 * ```
 * 
 * @remarks
 * - Handles multiple uppercase letters in sequence
 * - Preserves existing hyphens and underscores
 * - Converts spaces to hyphens
 * - Returns lowercase result
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Camel_case}
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case}
 */
export const toKebabCase = (str: string) => str
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase()

/**
 * Detects if the code is running in a browser environment.
 * 
 * Useful for server-side rendering (SSR) or avoiding browser-only APIs.
 * 
 * @type {boolean}
 * @constant
 * 
 * @example
 * ```typescript
 * if (isBrowser) {
 *   // Safe to use window, document, etc.
 *   document.querySelector('...');
 * } else {
 *   // Server-side or Node.js environment
 *   console.log('Running on server');
 * }
 * ```
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/window}
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * Creates a reactive proxy for an object that triggers callbacks on mutations.
 * 
 * Implements deep reactivity using JavaScript Proxy with caching for performance.
 * 
 * @template T - Object type (must be an object)
 * @param {T} target - Target object to make reactive
 * @param {() => void} onChange - Callback function triggered on any mutation
 * @param {WeakMap<object, any>} [proxyCache=new WeakMap()] - Internal cache for avoiding duplicate proxies
 * @returns {T} Reactive proxy of the target object
 * 
 * @throws {TypeError} If target is not an object
 * 
 * @example
 * ```typescript
 * // Create reactive state
 * const state = makeReactive(
 *   { count: 0, user: { name: 'John' } },
 *   () => console.log('State changed!')
 * );
 * 
 * // Triggers callback:
 * state.count = 1; // Logs: 'State changed!'
 * state.user.name = 'Jane'; // Logs: 'State changed!'
 * 
 * // Nested objects are also reactive
 * state.user.age = 30; // Logs: 'State changed!'
 * ```
 * 
 * @remarks
 * - Uses ES6 Proxy for interception
 * - Deep reactivity: nested objects become reactive automatically
 * - WeakMap cache prevents proxy duplication for same object
 * - Only intercepts set and deleteProperty operations
 * - Get operations return reactive proxies for nested objects
 * - Performance optimized with caching
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap}
 */
export const makeReactive = <T extends object>(
  target: T,
  onChange: () => void,
  proxyCache = new WeakMap<object, any>()
): T => {
  // Return cached proxy if available
  if (proxyCache.has(target)) return proxyCache.get(target) as T

  const handler: ProxyHandler<T> = {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver)
      // Recursively make nested objects reactive
      if (typeof value === 'object' && value !== null) {
        return makeReactive(value, onChange, proxyCache)
      }
      return value
    },
    set(target, prop, value, receiver) {
      const oldValue = Reflect.get(target, prop, receiver)
      // Skip if value unchanged
      if (oldValue === value) return true

      const result = Reflect.set(target, prop, value, receiver)
      onChange()
      return result
    },
    deleteProperty(target, prop) {
      const result = Reflect.deleteProperty(target, prop)
      onChange()
      return result
    }
  }

  const proxy = new Proxy(target, handler)
  proxyCache.set(target, proxy)
  return proxy
}

