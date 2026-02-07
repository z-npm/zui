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

