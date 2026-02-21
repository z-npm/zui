[**ZUI Framework API**](../README.md)

***

# Function: defineElement()

> **defineElement**(`config`): \<`T`\>(`originalClass`, `context`) => `T`

Defined in: [src/lib/decorators/defineElement.ts:74](https://github.com/z-npm/zui/blob/7f1d66960688b03e03628842d4fb0c24590b68ab/src/lib/decorators/defineElement.ts#L74)

Class decorator that registers a custom element with the browser's Custom Elements registry.

This decorator:
1. Creates a Shadow DOM for the element
2. Injects HTML and CSS templates
3. Sets up lifecycle callbacks (connected/disconnected)
4. Handles attribute change observation
5. Registers the element with customElements.define()

## Parameters

### config

[`DefineElementOptions`](../interfaces/DefineElementOptions.md)

Element configuration object

## Returns

A class decorator function

> \<`T`\>(`originalClass`, `context`): `T`

### Type Parameters

#### T

`T` *extends* `CustomElementConstructor`

### Parameters

#### originalClass

`T` & `object`

#### context

`ClassDecoratorContext`\<`T`\>

### Returns

`T`

## Throws

If HTML template is empty

## Example

```typescript
@defineElement({
  tagName: 'my-counter',
  html: counterTemplate,
  css: counterStyles,
  options: { extends: 'div' }
})
class Counter extends Zui(HTMLDivElement) {
  // class implementation
}
```

## See

 - [https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define)
 - [https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow)
