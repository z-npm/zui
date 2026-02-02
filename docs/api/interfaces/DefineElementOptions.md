[**ZUI Framework API**](../README.md)

***

# Interface: DefineElementOptions

Defined in: [src/lib/decorators/defineElement.ts:32](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/decorators/defineElement.ts#L32)

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

Defined in: [src/lib/decorators/defineElement.ts:33](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/decorators/defineElement.ts#L33)

The custom element tag name (must contain hyphen, e.g., 'my-counter')

***

### html

> **html**: `string` \| [`SafeHTML`](../classes/SafeHTML.md)

Defined in: [src/lib/decorators/defineElement.ts:34](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/decorators/defineElement.ts#L34)

HTML template string or SafeHTML object for the element's shadow DOM

***

### css?

> `optional` **css**: `string`

Defined in: [src/lib/decorators/defineElement.ts:35](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/decorators/defineElement.ts#L35)

Optional CSS string to inject into the shadow DOM

***

### options?

> `optional` **options**: `ElementDefinitionOptions`

Defined in: [src/lib/decorators/defineElement.ts:36](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/decorators/defineElement.ts#L36)

Custom element definition options including extension support
