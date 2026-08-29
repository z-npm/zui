[**ZUI Framework API**](../README.md)

***

# Interface: DefineElementOptions

Defined in: [src/lib/decorators/defineElement.ts:38](https://github.com/z-npm/zui/blob/84e8372d25a414a972914b586bcfe9442a8f5a55/src/lib/decorators/defineElement.ts#L38)

Configuration options for defining a custom element.

## Example

```ts
const options = {
  tagName: 'my-counter',
  html: '<div>Count: </div>',
  css: ':host { display: block; }',
  options: { extends: 'div' },
  shadowDom: true
};
```

## Properties

### tagName

> **tagName**: `string`

Defined in: [src/lib/decorators/defineElement.ts:39](https://github.com/z-npm/zui/blob/84e8372d25a414a972914b586bcfe9442a8f5a55/src/lib/decorators/defineElement.ts#L39)

The custom element tag name (must contain hyphen, e.g., 'my-counter')

***

### html

> **html**: `string` \| `SafeHTML`

Defined in: [src/lib/decorators/defineElement.ts:40](https://github.com/z-npm/zui/blob/84e8372d25a414a972914b586bcfe9442a8f5a55/src/lib/decorators/defineElement.ts#L40)

HTML template string or SafeHTML object for the element's shadow DOM

***

### css?

> `optional` **css?**: `string`

Defined in: [src/lib/decorators/defineElement.ts:41](https://github.com/z-npm/zui/blob/84e8372d25a414a972914b586bcfe9442a8f5a55/src/lib/decorators/defineElement.ts#L41)

Optional CSS string to inject into the shadow DOM

***

### options?

> `optional` **options?**: `ElementDefinitionOptions`

Defined in: [src/lib/decorators/defineElement.ts:42](https://github.com/z-npm/zui/blob/84e8372d25a414a972914b586bcfe9442a8f5a55/src/lib/decorators/defineElement.ts#L42)

Custom element definition options including extension support

***

### shadowDom?

> `optional` **shadowDom?**: `boolean`

Defined in: [src/lib/decorators/defineElement.ts:43](https://github.com/z-npm/zui/blob/84e8372d25a414a972914b586bcfe9442a8f5a55/src/lib/decorators/defineElement.ts#L43)

Whether to create a shadow DOM (default: true). If false, uses light DOM
