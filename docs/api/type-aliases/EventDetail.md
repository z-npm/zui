[**ZUI Framework API**](../README.md)

***

# Type Alias: EventDetail\<T\>

> **EventDetail**\<`T`\> = `T` *extends* [`EventEmitter`](../classes/EventEmitter.md)\<infer U\> ? `U` : `never`

Defined in: [src/lib/decorators/types.ts:122](https://github.com/z-npm/zui/blob/7462a855b708843a1cb700339806285d1dcda15f/src/lib/decorators/types.ts#L122)

Extracts the event detail type from an EventEmitter.

## Type Parameters

### T

`T`

EventEmitter type
