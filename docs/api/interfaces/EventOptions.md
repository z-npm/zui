[**ZUI Framework API**](../README.md)

***

# Interface: EventOptions

Defined in: [src/lib/decorators/event.ts:22](https://github.com/z-npm/zui/blob/c41276f97d0b4754671fbb37aa0c8386ada4cc0f/src/lib/decorators/event.ts#L22)

Configuration options for the  decorator.

 EventOptions

## Example

```ts
@event({ name: 'count-changed' })
onChange!: EventEmitter<number>;
```

## Properties

### name?

> `optional` **name?**: `string`

Defined in: [src/lib/decorators/event.ts:23](https://github.com/z-npm/zui/blob/c41276f97d0b4754671fbb37aa0c8386ada4cc0f/src/lib/decorators/event.ts#L23)

Custom event name (defaults to kebab-case of property name)
