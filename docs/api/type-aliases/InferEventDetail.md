[**ZUI Framework API**](../README.md)

***

# Type Alias: InferEventDetail\<T\>

> **InferEventDetail**\<`T`\> = `T` *extends* [`EventEmitter`](../classes/EventEmitter.md)\<infer U\> ? [`CustomEventDetail`](../interfaces/CustomEventDetail.md)\<`U`\> : `never`

Defined in: [src/lib/decorators/types.ts:141](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/decorators/types.ts#L141)

Infers the CustomEvent detail type from an EventEmitter.

## Type Parameters

### T

`T`

EventEmitter type
