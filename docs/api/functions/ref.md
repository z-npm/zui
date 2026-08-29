[**ZUI Framework API**](../README.md)

***

# Function: ref()

> **ref**(`selector`): \<`T`, `V`\>(`_target`, `context`) => `void`

Defined in: [src/lib/decorators/refs.ts:107](https://github.com/z-npm/zui/blob/84e8372d25a414a972914b586bcfe9442a8f5a55/src/lib/decorators/refs.ts#L107)

Field decorator that automatically queries and assigns DOM elements from the shadow root.

This decorator eliminates manual querySelector calls by automatically resolving
DOM element references when the component connects to the DOM. It provides:
- Type-safe element references with full TypeScript support
- Automatic query execution on component initialization
- Support for any valid CSS selector (class, ID, attribute, complex selectors)
- Asynchronous resolution via queueMicrotask for proper timing
- Works with both shadow DOM and light DOM components

## Parameters

### selector

`string`

CSS selector to query the element in shadow DOM or light DOM

## Returns

A field decorator function

\<`T`, `V`\>(`_target`, `context`) => `void`

## Throws

If selector doesn't match any element (returns undefined with non-null assertion)

## Examples

```ts
// Query by class name
@defineElement({ tagName: 'my-component', html: '<div class="display">0</div>' })
class MyComponent extends Zui(HTMLElement) {
  @ref('.display')
  displayRef!: HTMLDivElement;

  connected() {
    console.log(this.displayRef.textContent); // Access after connection
  }
}
```

```ts
// Query by ID
@defineElement({ tagName: 'my-form', html: '<button id="submit">Submit</button>' })
class MyForm extends Zui(HTMLElement) {
  @ref('#submit')
  submitButton!: HTMLButtonElement;
}
```

```ts
// Query with complex CSS selector
@defineElement({
  tagName: 'my-search',
  html: '<form><input type="text" class="search-input" /></form>'
})
class MySearch extends Zui(HTMLElement) {
  @ref('form input[type="text"]')
  textInput!: HTMLInputElement;
}
```

```ts
// Multiple references in one component
@defineElement({
  tagName: 'my-counter',
  html: `
    <button class="decrease">-</button>
    <span class="count">0</span>
    <button class="increase">+</button>
  `
})
class MyCounter extends Zui(HTMLElement) {
  @ref('.decrease')
  decreaseBtn!: HTMLButtonElement;

  @ref('.count')
  countDisplay!: HTMLSpanElement;

  @ref('.increase')
  increaseBtn!: HTMLButtonElement;

  connected() {
    this.increaseBtn.addEventListener('click', () => {
      this.countDisplay.textContent = '1';
    });
  }
}
```

## Remarks

- References are resolved after the element is connected to the DOM (in connectedCallback)
- Uses shadowRoot.querySelector() for shadow DOM components, or this.querySelector() for light DOM
- Non-null assertion operator (!) is used - ensure your selector always matches an element
- If selector doesn't match, the reference will be undefined (runtime error on access)
- For dynamic content, consider querying in lifecycle hooks instead of using

## Ref

- References are not reactive - changes to the DOM won't update the reference

## Best Practices

- Use specific selectors (ID or unique class) to avoid matching multiple elements
- Always verify selectors match elements in your HTML template
- For optional elements, consider checking existence before access
- Don't use

## Ref

for elements that may be conditionally rendered

## See

 - [https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector)
 - [defineElement](defineElement.md) - Element definition decorator
 - [Zui](Zui.md) - Base mixin for ZUI components
