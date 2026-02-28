[**ZUI Framework API**](../README.md)

***

# Interface: EventOptions

Defined in: [src/lib/decorators/event.ts:22](https://github.com/z-npm/zui/blob/8343ddbfb68b96e237a63bf86f35f8e5fcf64328/src/lib/decorators/event.ts#L22)

Configuration options for the  decorator.

 EventOptions

## Example

```ts
@event({ name: 'count-changed' })
onChange!: EventEmitter<number>;
```

## Properties

### name?

> `optional` **name**: `string`

Defined in: [src/lib/decorators/event.ts:23](https://github.com/z-npm/zui/blob/8343ddbfb68b96e237a63bf86f35f8e5fcf64328/src/lib/decorators/event.ts#L23)

Custom event name (defaults to kebab-case of property name)
