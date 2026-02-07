[**ZUI Framework API**](../README.md)

***

# Interface: StateOptions

Defined in: [src/lib/decorators/state.ts:21](https://github.com/z-npm/zui/blob/7462a855b708843a1cb700339806285d1dcda15f/src/lib/decorators/state.ts#L21)

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

> `optional` **callbackName**: `string`

Defined in: [src/lib/decorators/state.ts:22](https://github.com/z-npm/zui/blob/7462a855b708843a1cb700339806285d1dcda15f/src/lib/decorators/state.ts#L22)

Custom update callback method name
