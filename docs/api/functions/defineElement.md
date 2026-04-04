[**ZUI Framework API**](../README.md)

***

# Function: defineElement()

> **defineElement**(`config`): \<`T`\>(`originalClass`, `context`) => `T`

Defined in: [src/lib/decorators/defineElement.ts:117](https://github.com/z-npm/zui/blob/9eb97da5fcf705679604ff6947fa10410017e48a/src/lib/decorators/defineElement.ts#L117)

Class decorator that registers a custom element with the browser's Custom Elements registry.

This decorator provides a declarative way to define web components with automatic:
- Shadow DOM creation and management
- HTML and CSS template injection
- Lifecycle callback setup (connectedCallback, disconnectedCallback, attributeChangedCallback)
- Attribute observation and property synchronization
- Custom element registration via customElements.define()

## Parameters

### config

[`DefineElementOptions`](../interfaces/DefineElementOptions.md)

Element configuration object

## Returns

A class decorator function that returns the enhanced class

\<`T`\>(`originalClass`, `context`) => `T`

## Throws

If HTML template is empty or undefined

## Throws

If tag name doesn't contain a hyphen (browser enforcement)

## Throws

If element with same tagName is already registered

## Examples

```ts
// Basic usage with shadow DOM
@defineElement({
  tagName: 'my-counter',
  html: '<div class="counter">0</div>',
  css: ':host { display: block; }'
})
class Counter extends Zui(HTMLElement) {
  // class implementation
}
```

```ts
// Extending native element (customized built-in)
@defineElement({
  tagName: 'my-button',
  html: '<button><slot></slot></button>',
  css: 'button { color: blue; }',
  options: { extends: 'button' }
})
class MyButton extends Zui(HTMLButtonElement) {
  // class implementation
}
```

```ts
// Light DOM mode (no shadow DOM)
@defineElement({
  tagName: 'my-container',
  html: '<div><slot></slot></div>',
  shadowDom: false
})
class MyContainer extends Zui(HTMLElement) {
  // class implementation
}
```

## Remarks

- The decorator automatically calls customElements.define() in browser environments
- Server-side rendering is safe (registration is skipped when not in browser)
- HTML templates are cloned for each instance to prevent shared state
- CSS is scoped to shadow DOM when shadowDom option is true
- The class must extend Zui(BaseElement) for proper lifecycle integration

## See

 - [https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define)
 - [https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow)
 - [https://developer.mozilla.org/en-US/docs/Web/Web\_Components/Using\_custom\_elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
 - [Zui](Zui.md) - Base mixin for ZUI components
