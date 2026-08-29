[**ZUI Framework API**](../README.md)

***

# Type Alias: InferEventDetail\<T\>

> **InferEventDetail**\<`T`\> = `T` *extends* [`EventEmitter`](../classes/EventEmitter.md)\<infer U\> ? [`CustomEventDetail`](../interfaces/CustomEventDetail.md)\<`U`\> : `never`

Defined in: [src/lib/decorators/types.ts:141](https://github.com/z-npm/zui/blob/84e8372d25a414a972914b586bcfe9442a8f5a55/src/lib/decorators/types.ts#L141)

Infers the CustomEvent detail type from an EventEmitter.

## Type Parameters

### T

`T`

EventEmitter type
