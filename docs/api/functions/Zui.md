[**ZUI Framework API**](../README.md)

***

# Function: Zui()

> **Zui**\<`TBase`\>(`Base`): \{(...`args`): `ZuiElement`; `prototype`: `ZuiElement`\<`any`\>; \} & `TBase`

Defined in: [src/lib/decorators/mixin.ts:45](https://github.com/z-npm/zui/blob/7f1d66960688b03e03628842d4fb0c24590b68ab/src/lib/decorators/mixin.ts#L45)

Mixin function that enhances base HTML elements with ZUI capabilities.

Features:
- Type-safe event listeners for custom events
- Abstract lifecycle methods (connected, disconnected, attributeChanged)
- Proper inheritance chain for customized built-in elements

## Type Parameters

### TBase

`TBase` *extends* (...`args`) => `HTMLElement`

Base constructor type (extends HTMLElement)

## Parameters

### Base

`TBase`

Base class constructor to enhance

## Returns

\{(...`args`): `ZuiElement`; `prototype`: `ZuiElement`\<`any`\>; \} & `TBase`

Enhanced class with ZUI capabilities

## Example

```typescript
// Extend native div element
class Counter extends Zui(HTMLDivElement) {
  connected() {
    console.log('Counter connected to DOM');
  }
}

// Extend button element
class CustomButton extends Zui(HTMLButtonElement) {
  @event()
  customClick!: EventEmitter<void>;
}
```

## Remarks

- Must be used as a base class for all ZUI components
- Provides abstract methods that should be implemented
- Enables type inference for custom event maps

## See

[https://developer.mozilla.org/en-US/docs/Web/API/Web\_components/Using\_custom\_elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
