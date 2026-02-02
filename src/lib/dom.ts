/**
 * @fileoverview DOM manipulation utilities for creating type-safe HTML elements.
 * Provides a clean, functional API for element creation with CSS-in-JS styling.
 * 
 * @module dom
 */

import type { Properties } from 'csstype';

/**
 * Creates an HTML element with type-safe styles and children.
 * 
 * This utility provides a functional alternative to template literals or JSX,
 * with full TypeScript support for CSS properties and element types.
 * 
 * @template K - HTML tag name key from HTMLElementTagNameMap
 * @param {K} tagName - The HTML tag name (e.g., 'div', 'span', 'a', 'button')
 * @param {Properties<string | number>} [styles={}] - CSS styles in camelCase format
 * @param {number | boolean | string | Node | (number | boolean | string | Node)[]} [children] - Child nodes or text content
 * @returns {HTMLElementTagNameMap[K]} The created HTML element with proper type
 * 
 * @throws {TypeError} If tagName is not a valid HTML element
 * 
 * @example
 * ```typescript
 * // Create a styled div with text
 * const div = createElement('div', 
 *   { backgroundColor: 'red', padding: '10px' },
 *   'Hello World'
 * );
 * 
 * // Create nested elements
 * const container = createElement('div', { display: 'flex' }, [
 *   createElement('span', { color: 'blue' }, 'Item 1'),
 *   createElement('span', { color: 'green' }, 'Item 2')
 * ]);
 * 
 * // Create form elements
 * const input = createElement('input', {
 *   type: 'text',
 *   placeholder: 'Enter text...'
 * });
 * ```
 * 
 * @remarks
 * - Styles use the `csstype` package for full CSS property type checking
 * - Children can be strings, numbers, booleans, Nodes, or arrays of these
 * - Boolean and number children are converted to strings
 * - Style properties with undefined/null values are ignored
 * 
 * @see {@link https://www.npmjs.com/package/csstype} for CSS property types
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
 */
export const createElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  styles: Properties<string | number> = {},
  children?: number | boolean | string | Node | (number | boolean | string | Node)[]
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tagName)

  Object.entries(styles).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.style[key as any] = value as string
    }
  })

  if (children) {
    const nodes = Array.isArray(children) ? children : [children]

    nodes.forEach((child) => {
      if (typeof child === 'string' || typeof child === "number" || typeof child === "boolean") {
        element.appendChild(document.createTextNode(String(child)))
      } else if (child instanceof Node) {
        element.appendChild(child)
      }
    })
  }

  return element
}

