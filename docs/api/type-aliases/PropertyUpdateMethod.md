[**ZUI Framework API**](../README.md)

***

# Type Alias: PropertyUpdateMethod\<T\>

> **PropertyUpdateMethod**\<`T`\> = `T` *extends* `number` ? (`oldValue`, `newValue`) => `void` : `T` *extends* `string` ? (`oldValue`, `newValue`) => `void` : `T` *extends* `boolean` ? (`oldValue`, `newValue`) => `void` : (`oldValue`, `newValue`) => `void`

Defined in: [src/lib/decorators/types.ts:19](https://github.com/z-npm/zui/blob/c41276f97d0b4754671fbb37aa0c8386ada4cc0f/src/lib/decorators/types.ts#L19)

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
