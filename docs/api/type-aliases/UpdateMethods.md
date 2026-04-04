[**ZUI Framework API**](../README.md)

***

# Type Alias: UpdateMethods\<T\>

> **UpdateMethods**\<`T`\> = `` { [K in keyof T as `${string & K}Update`]?: K extends keyof T ? PropertyUpdateMethod<T[K]> : never } ``

Defined in: [src/lib/decorators/types.ts:34](https://github.com/z-npm/zui/blob/476a9a1f0b0beed5843d63449d20234d11788a39/src/lib/decorators/types.ts#L34)

Mapped type that generates update method names from property names.
Automatically appends 'Update' suffix to property names.

## Type Parameters

### T

`T`

Component instance type

## Example

```ts
// If component has properties: count, name
// UpdateMethods will include: countUpdate?, nameUpdate?
```
