[**ZUI Framework API**](../README.md)

***

# Type Alias: EventDetail\<T\>

> **EventDetail**\<`T`\> = `T` *extends* [`EventEmitter`](../classes/EventEmitter.md)\<infer U\> ? `U` : `never`

Defined in: [src/lib/decorators/types.ts:122](https://github.com/z-npm/zui/blob/9eb97da5fcf705679604ff6947fa10410017e48a/src/lib/decorators/types.ts#L122)

Extracts the event detail type from an EventEmitter.

## Type Parameters

### T

`T`

EventEmitter type
