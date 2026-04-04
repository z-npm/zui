[**ZUI Framework API**](../README.md)

***

# Interface: PropertyOptions

Defined in: [src/lib/decorators/property.ts:35](https://github.com/z-npm/zui/blob/476a9a1f0b0beed5843d63449d20234d11788a39/src/lib/decorators/property.ts#L35)

Configuration options for the

## Example

```ts
@property({ type: 'number', name: 'count-value' })
accessor count = 0;
```

## Properties

### type?

> `optional` **type?**: [`PropertyType`](../type-aliases/PropertyType.md)

Defined in: [src/lib/decorators/property.ts:36](https://github.com/z-npm/zui/blob/476a9a1f0b0beed5843d63449d20234d11788a39/src/lib/decorators/property.ts#L36)

Type of the property for attribute conversion

***

### name?

> `optional` **name?**: `string`

Defined in: [src/lib/decorators/property.ts:37](https://github.com/z-npm/zui/blob/476a9a1f0b0beed5843d63449d20234d11788a39/src/lib/decorators/property.ts#L37)

Custom attribute name (defaults to kebab-case of property name)

***

### callbackName?

> `optional` **callbackName?**: `` `${string}Update` `` \| `` `${string}Changed` ``

Defined in: [src/lib/decorators/property.ts:38](https://github.com/z-npm/zui/blob/476a9a1f0b0beed5843d63449d20234d11788a39/src/lib/decorators/property.ts#L38)

Custom update callback method name
