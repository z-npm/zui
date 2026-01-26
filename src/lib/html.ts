/**
 * A wrapper class to mark strings as "safe" (already sanitized or trusted).
 */
export class SafeHTML {
  constructor(public readonly value: string) {}
  toString() { return this.value }
}

const escapeCharMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escape = (str: string) => str.replace(/[&<>"']/g, (m) => escapeCharMap[m]);

/**
 * A tagged template literal for safely generating HTML strings.
 * It automatically escapes values unless they are already valid `SafeHTML`.
 * * Usage:
 * const content = html`<div>${userInput}</div>`;
 */
export const html = (strings: TemplateStringsArray, ...values: any[]): SafeHTML => {
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    const val = values[i];
    let escapedVal = '';

    if (val instanceof SafeHTML) {
      escapedVal = val.value;
    } else if (Array.isArray(val)) {
      // Handle arrays (e.g. lists of elements) by joining them
      escapedVal = val.map(v => (v instanceof SafeHTML ? v.value : escape(String(v)))).join('');
    } else {
      escapedVal = escape(String(val));
    }

    result += escapedVal + strings[i + 1];
  }
  return new SafeHTML(result);
};

/**
 * An escape hatch to treat a string as safe HTML.
 * WARNING: Only use this with trusted content.
 */
export const unsafeHTML = (str: string) => new SafeHTML(str);
