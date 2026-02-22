[**ZUI Framework API**](../README.md)

***

# Function: ref()

> **ref**(`selector`): \<`T`, `V`\>(`_target`, `context`) => `void`

Defined in: [src/lib/decorators/refs.ts:49](https://github.com/z-npm/zui/blob/6661d1446c04df5326fc8b0bf2e03e078c8d42f4/src/lib/decorators/refs.ts#L49)

Field decorator that automatically queries and assigns DOM elements from the shadow root.

Features:
- Type-safe element references
- Automatic query on component initialization
- Works with any CSS selector
- Asynchronous resolution via queueMicrotask

## Parameters

### selector

`string`

CSS selector to query the element in shadow DOM

## Returns

A field decorator function

> \<`T`, `V`\>(`_target`, `context`): `void`

### Type Parameters

#### T

`T` *extends* `HTMLElement`

#### V

`V` *extends* `HTMLElement`

### Parameters

#### \_target

`undefined`

#### context

`ClassFieldDecoratorContext`\<`T`, `V`\>

### Returns

`void`

## Throws

If selector doesn't match any element (returns null)

## Example

```typescript
// Query by class
@ref('.counter-display')
displayRef!: HTMLDivElement;

// Query by ID
@ref('#submit-btn')
submitButton!: HTMLButtonElement;

// Query with complex selector
@ref('form input[type="text"]')
textInput!: HTMLInputElement;
```

## Remarks

- References are resolved after the element is connected to DOM
- Uses shadowRoot.querySelector() internally
- Non-null assertion is used, ensure selector matches

## See

[https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector)
