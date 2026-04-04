[**ZUI Framework API**](../README.md)

***

# Type Alias: PropertyUpdateMethod\<T\>

> **PropertyUpdateMethod**\<`T`\> = `T` *extends* `number` ? (`oldValue`, `newValue`) => `void` : `T` *extends* `string` ? (`oldValue`, `newValue`) => `void` : `T` *extends* `boolean` ? (`oldValue`, `newValue`) => `void` : (`oldValue`, `newValue`) => `void`

Defined in: [src/lib/decorators/types.ts:19](https://github.com/z-npm/zui/blob/476a9a1f0b0beed5843d63449d20234d11788a39/src/lib/decorators/types.ts#L19)

Type guard for property update methods based on property type.

## Type Parameters

### T

`T`

Property type

## Example

```ts
// For number properties:
countUpdate(oldValue: number, newValue: number): void

// For string properties:
nameUpdate(oldValue: string, newValue: string): void
```
