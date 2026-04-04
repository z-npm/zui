[**ZUI Framework API**](../README.md)

***

# Interface: StateOptions

Defined in: [src/lib/decorators/state.ts:21](https://github.com/z-npm/zui/blob/9eb97da5fcf705679604ff6947fa10410017e48a/src/lib/decorators/state.ts#L21)

Configuration options for the

## State

decorator.

 StateOptions

## Example

```ts
@state({ callbackName: 'onHistoryChange' })
accessor history: number[] = [];
```

## Properties

### callbackName?

> `optional` **callbackName?**: `string`

Defined in: [src/lib/decorators/state.ts:22](https://github.com/z-npm/zui/blob/9eb97da5fcf705679604ff6947fa10410017e48a/src/lib/decorators/state.ts#L22)

Custom update callback method name
