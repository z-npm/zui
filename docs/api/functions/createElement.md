[**ZUI Framework API**](../README.md)

***

# Function: createElement()

> **createElement**\<`K`\>(`tagName`, `styles?`, `children?`): `HTMLElementTagNameMap`\[`K`\]

Defined in: [src/lib/dom.ts:54](https://github.com/z-npm/zui/blob/7462a855b708843a1cb700339806285d1dcda15f/src/lib/dom.ts#L54)

Creates an HTML element with type-safe styles and children.

This utility provides a functional alternative to template literals or JSX,
with full TypeScript support for CSS properties and element types.

## Type Parameters

### K

`K` *extends* keyof `HTMLElementTagNameMap`

HTML tag name key from HTMLElementTagNameMap

## Parameters

### tagName

`K`

The HTML tag name (e.g., 'div', 'span', 'a', 'button')

### styles?

`Properties`\<`string` \| `number`\> = `{}`

CSS styles in camelCase format

### children?

Child nodes or text content

`string` | `number` | `boolean` | `Node` | (`string` \| `number` \| `boolean` \| `Node`)[]

## Returns

`HTMLElementTagNameMap`\[`K`\]

The created HTML element with proper type

## Throws

If tagName is not a valid HTML element

## Example

```typescript
// Create a styled div with text
const div = createElement('div', 
  { backgroundColor: 'red', padding: '10px' },
  'Hello World'
);

// Create nested elements
const container = createElement('div', { display: 'flex' }, [
  createElement('span', { color: 'blue' }, 'Item 1'),
  createElement('span', { color: 'green' }, 'Item 2')
]);

// Create form elements
const input = createElement('input', {
  type: 'text',
  placeholder: 'Enter text...'
});
```

## Remarks

- Styles use the `csstype` package for full CSS property type checking
- Children can be strings, numbers, booleans, Nodes, or arrays of these
- Boolean and number children are converted to strings
- Style properties with undefined/null values are ignored

## See

 - [https://www.npmjs.com/package/csstype](https://www.npmjs.com/package/csstype) for CSS property types
 - [https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
