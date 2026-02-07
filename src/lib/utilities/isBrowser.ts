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


