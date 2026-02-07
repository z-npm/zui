**ZUI Framework API**

***

# ZUI Framework API

## Fileoverview

Main entry point for ZUI framework.
Exports all decorators, utilities, and core functionality.

## Example

```typescript
import { defineElement, property, event, ref, Zui } from '@o.z/zui';

@defineElement({ tagName: 'my-element', html: '<div></div>' })
class MyElement extends Zui(HTMLElement) {
  @property() accessor count = 0;
  @event() onClick!: EventEmitter<void>;
  @ref('.btn') button!: HTMLButtonElement;
}
```

## Classes

- [EventEmitter](classes/EventEmitter.md)
- [SafeHTML](classes/SafeHTML.md)

## Interfaces

- [DefineElementOptions](interfaces/DefineElementOptions.md)
- [PropertyOptions](interfaces/PropertyOptions.md)
- [StateOptions](interfaces/StateOptions.md)
- [ZuiComponent](interfaces/ZuiComponent.md)
- [CustomEventDetail](interfaces/CustomEventDetail.md)

## Type Aliases

- [PropertyType](type-aliases/PropertyType.md)
- [PropertyCallback](type-aliases/PropertyCallback.md)
- [PropertyUpdateMethod](type-aliases/PropertyUpdateMethod.md)
- [UpdateMethods](type-aliases/UpdateMethods.md)
- [EventDetail](type-aliases/EventDetail.md)
- [KebabCase](type-aliases/KebabCase.md)
- [InferEventDetail](type-aliases/InferEventDetail.md)
- [ZuiEventMap](type-aliases/ZuiEventMap.md)

## Variables

- [isBrowser](variables/isBrowser.md)

## Functions

- [defineElement](functions/defineElement.md)
- [event](functions/event.md)
- [Zui](functions/Zui.md)
- [property](functions/property.md)
- [ref](functions/ref.md)
- [state](functions/state.md)
- [createElement](functions/createElement.md)
- [html](functions/html.md)
- [unsafeHTML](functions/unsafeHTML.md)
- [delay](functions/delay.md)
- [makeReactive](functions/makeReactive.md)
- [toKebabCase](functions/toKebabCase.md)

## Events

- [EventOptions](interfaces/EventOptions.md)
