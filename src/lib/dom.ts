import type { Properties } from 'csstype';

/**
 * Creates an HTML element with type-safe styles and children.
 *
 * @param tagName - The HTML tag name (e.g., 'div', 'span', 'a').
 * @param styles - An object of CSS styles in camelCase (e.g., { backgroundColor: 'red' }).
 * @param children - A number, a boolean, a string, a Node, or an array of them to append as children.
 * @returns The created HTML Element with the correct specific type.
 */
export const createElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  styles: Properties<string | number> = {},
  children?: number | boolean | string | Node | (number | boolean | string | Node)[]
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tagName);

  Object.entries(styles).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.style[key as any] = value as string;
    }
  });

  if (children) {
    const nodes = Array.isArray(children) ? children : [children];

    nodes.forEach((child) => {
      if (typeof child === 'string' || typeof child === "number" || typeof child === "boolean") {
        element.appendChild(document.createTextNode(String(child)));
      } else if (child instanceof Node) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

