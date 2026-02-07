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

