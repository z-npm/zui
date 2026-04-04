[**ZUI Framework API**](../README.md)

***

# Interface: StateOptions

Defined in: [src/lib/decorators/state.ts:21](https://github.com/z-npm/zui/blob/476a9a1f0b0beed5843d63449d20234d11788a39/src/lib/decorators/state.ts#L21)

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

Defined in: [src/lib/decorators/state.ts:22](https://github.com/z-npm/zui/blob/476a9a1f0b0beed5843d63449d20234d11788a39/src/lib/decorators/state.ts#L22)

Custom update callback method name
