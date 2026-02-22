[**ZUI Framework API**](../README.md)

***

# Type Alias: PropertyUpdateMethod\<T\>

> **PropertyUpdateMethod**\<`T`\> = `T` *extends* `number` ? (`oldValue`, `newValue`) => `void` : `T` *extends* `string` ? (`oldValue`, `newValue`) => `void` : `T` *extends* `boolean` ? (`oldValue`, `newValue`) => `void` : (`oldValue`, `newValue`) => `void`

Defined in: [src/lib/decorators/types.ts:19](https://github.com/z-npm/zui/blob/6661d1446c04df5326fc8b0bf2e03e078c8d42f4/src/lib/decorators/types.ts#L19)

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
