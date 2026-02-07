[**ZUI Framework API**](../README.md)

***

# Type Alias: InferEventDetail\<T\>

> **InferEventDetail**\<`T`\> = `T` *extends* [`EventEmitter`](../classes/EventEmitter.md)\<infer U\> ? [`CustomEventDetail`](../interfaces/CustomEventDetail.md)\<`U`\> : `never`

Defined in: [src/lib/decorators/types.ts:141](https://github.com/z-npm/zui/blob/7462a855b708843a1cb700339806285d1dcda15f/src/lib/decorators/types.ts#L141)

Infers the CustomEvent detail type from an EventEmitter.

## Type Parameters

### T

`T`

EventEmitter type
