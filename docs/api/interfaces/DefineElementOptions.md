[**ZUI Framework API**](../README.md)

***

# Interface: DefineElementOptions

Defined in: [src/lib/decorators/defineElement.ts:36](https://github.com/z-npm/zui/blob/8343ddbfb68b96e237a63bf86f35f8e5fcf64328/src/lib/decorators/defineElement.ts#L36)

Configuration options for defining a custom element.

 DefineElementOptions

## Example

```ts
@defineElement({
  tagName: 'my-counter',
  html: '<div>Count: <span class="count"></span></div>',
  css: ':host { display: block; }',
  options: { extends: 'div' }
})
```

## Properties

### tagName

> **tagName**: `string`

Defined in: [src/lib/decorators/defineElement.ts:37](https://github.com/z-npm/zui/blob/8343ddbfb68b96e237a63bf86f35f8e5fcf64328/src/lib/decorators/defineElement.ts#L37)

The custom element tag name (must contain hyphen, e.g., 'my-counter')

***

### html

> **html**: `string` \| `SafeHTML`

Defined in: [src/lib/decorators/defineElement.ts:38](https://github.com/z-npm/zui/blob/8343ddbfb68b96e237a63bf86f35f8e5fcf64328/src/lib/decorators/defineElement.ts#L38)

HTML template string or SafeHTML object for the element's shadow DOM

***

### css?

> `optional` **css**: `string`

Defined in: [src/lib/decorators/defineElement.ts:39](https://github.com/z-npm/zui/blob/8343ddbfb68b96e237a63bf86f35f8e5fcf64328/src/lib/decorators/defineElement.ts#L39)

Optional CSS string to inject into the shadow DOM

***

### options?

> `optional` **options**: `ElementDefinitionOptions`

Defined in: [src/lib/decorators/defineElement.ts:40](https://github.com/z-npm/zui/blob/8343ddbfb68b96e237a63bf86f35f8e5fcf64328/src/lib/decorators/defineElement.ts#L40)

Custom element definition options including extension support
