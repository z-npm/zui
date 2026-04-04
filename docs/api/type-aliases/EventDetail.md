[**ZUI Framework API**](../README.md)

***

# Type Alias: EventDetail\<T\>

> **EventDetail**\<`T`\> = `T` *extends* [`EventEmitter`](../classes/EventEmitter.md)\<infer U\> ? `U` : `never`

Defined in: [src/lib/decorators/types.ts:122](https://github.com/z-npm/zui/blob/476a9a1f0b0beed5843d63449d20234d11788a39/src/lib/decorators/types.ts#L122)

Extracts the event detail type from an EventEmitter.

## Type Parameters

### T

`T`

EventEmitter type
