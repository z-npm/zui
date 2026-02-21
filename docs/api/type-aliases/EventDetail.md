[**ZUI Framework API**](../README.md)

***

# Type Alias: EventDetail\<T\>

> **EventDetail**\<`T`\> = `T` *extends* [`EventEmitter`](../classes/EventEmitter.md)\<infer U\> ? `U` : `never`

Defined in: [src/lib/decorators/types.ts:122](https://github.com/z-npm/zui/blob/7f1d66960688b03e03628842d4fb0c24590b68ab/src/lib/decorators/types.ts#L122)

Extracts the event detail type from an EventEmitter.

## Type Parameters

### T

`T`

EventEmitter type
