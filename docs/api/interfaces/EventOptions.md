[**ZUI Framework API**](../README.md)

***

# Interface: EventOptions

Defined in: [src/lib/decorators/event.ts:21](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/decorators/event.ts#L21)

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

Defined in: [src/lib/decorators/event.ts:22](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/decorators/event.ts#L22)

Custom event name (defaults to kebab-case of property name)
