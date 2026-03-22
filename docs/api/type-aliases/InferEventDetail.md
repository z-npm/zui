[**ZUI Framework API**](../README.md)

***

# Type Alias: InferEventDetail\<T\>

> **InferEventDetail**\<`T`\> = `T` *extends* [`EventEmitter`](../classes/EventEmitter.md)\<infer U\> ? [`CustomEventDetail`](../interfaces/CustomEventDetail.md)\<`U`\> : `never`

Defined in: [src/lib/decorators/types.ts:141](https://github.com/z-npm/zui/blob/c41276f97d0b4754671fbb37aa0c8386ada4cc0f/src/lib/decorators/types.ts#L141)

Infers the CustomEvent detail type from an EventEmitter.

## Type Parameters

### T

`T`

EventEmitter type
