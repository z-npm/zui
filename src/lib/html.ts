/**
 * @fileoverview HTML template literal utilities for safe HTML string generation.
 * Provides XSS protection through automatic escaping and type-safe HTML composition.
 * 
 * @module html
 */

/**
 * A wrapper class to mark strings as "safe" (already sanitized or trusted).
 * 
 * @class SafeHTML
 * @property {string} value - The safe HTML string
 * 
 * @example
 * ```typescript
 * const safe = new SafeHTML('<div>Trusted content</div>');
 * console.log(safe.value); // '<div>Trusted content</div>'
 * ```
 * 
 * @remarks
 * - Used internally by the `html` template tag
 * - Signals that content doesn't need escaping
 * - Should only be created from trusted sources
 */
export class SafeHTML {
  /**
   * Creates a SafeHTML instance.
   * @param {string} value - HTML string that is already sanitized or trusted
   */
  constructor(public readonly value: string) { }

  /**
   * Returns the safe HTML string.
   * @returns {string} The HTML string
   */
  toString() { return this.value }
}

// Character escape map for HTML entities
const escapeCharMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/**
 * Escapes HTML special characters in a string.
 * 
 * @param {string} str - String to escape
 * @returns {string} Escaped string with HTML entities
 * 
 * @private
 * @example
 * ```typescript
 * escape('<script>alert("xss")</script>');
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 * ```
 */
const escape = (str: string) => str.replace(/[&<>"']/g, (m) => escapeCharMap[m])

/**
 * A tagged template literal for safely generating HTML strings.
 * 
 * Automatically escapes interpolated values to prevent XSS attacks,
 * unless they are wrapped in `SafeHTML` or `unsafeHTML()`.
 * 
 * @template T - Type of interpolated values
 * @param {TemplateStringsArray} strings - Template string parts
 * @param {...any[]} values - Interpolated values to insert
 * @returns {SafeHTML} SafeHTML instance containing the generated HTML
 * 
 * @throws {TypeError} If values cannot be converted to strings
 * 
 * @example
 * ```typescript
 * // Basic usage with escaping
 * const userInput = '<script>alert("xss")</script>';
 * const safeHtml = html`<div>${userInput}</div>`;
 * // Result: '<div>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</div>'
 * 
 * // With SafeHTML (no escaping)
 * const trusted = unsafeHTML('<em>italic</em>');
 * const html = html`<div>${trusted}</div>`;
 * // Result: '<div><em>italic</em></div>'
 * 
 * // With arrays
 * const items = ['apple', 'banana', 'cherry'];
 * const list = html`<ul>${items.map(item => html`<li>${item}</li>`)}</ul>`;
 * ```
 * 
 * @remarks
 * - Always escapes strings unless they're SafeHTML instances
 * - Handles arrays by recursively processing each item
 * - Returns SafeHTML object for type safety
 * - Follows the same pattern as lit-html or hyperHTML
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates}
 * @see {@link unsafeHTML} for escape hatch
 */
export const html = (strings: TemplateStringsArray, ...values: any[]): SafeHTML => {
  let result = strings[0]
  for (let i = 0; i < values.length; i++) {
    const val = values[i]
    let escapedVal = ''

    if (val instanceof SafeHTML) {
      escapedVal = val.value
    } else if (Array.isArray(val)) {
      // Handle arrays (e.g. lists of elements) by joining them
      escapedVal = val.map(v => (v instanceof SafeHTML ? v.value : escape(String(v)))).join('')
    } else {
      escapedVal = escape(String(val))
    }

    result += escapedVal + strings[i + 1]
  }
  return new SafeHTML(result)
}

/**
 * An escape hatch to treat a string as safe HTML without escaping.
 * 
 * ⚠️ **WARNING**: Only use this with content you completely trust.
 * Never use with user input, database content, or external data.
 * 
 * @param {string} str - Trusted HTML string that doesn't need escaping
 * @returns {SafeHTML} SafeHTML wrapper marking the string as safe
 * 
 * @example
 * ```typescript
 * // ✅ Safe usage - hardcoded content
 * const icon = unsafeHTML('<svg>...</svg>');
 * 
 * // ❌ DANGEROUS - user input
 * const userContent = getUserInput();
 * const dangerous = unsafeHTML(userContent); // XSS vulnerability!
 * 
 * // ✅ Safe pattern with sanitization
 * const sanitized = sanitizeHTML(userInput);
 * const safe = unsafeHTML(sanitized);
 * ```
 * 
 * @remarks
 * - Consider using a proper HTML sanitizer like DOMPurify
 * - Review usage of this function during security audits
 * - Prefer `html` template tag for automatic escaping
 * 
 * @see {@link https://github.com/cure53/DOMPurify} for HTML sanitization
 * @see {@link html} for safe template literals
 */
export const unsafeHTML = (str: string) => new SafeHTML(str)

