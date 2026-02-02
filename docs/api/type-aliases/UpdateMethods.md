[**ZUI Framework API**](../README.md)

***

# Type Alias: UpdateMethods\<T\>

> **UpdateMethods**\<`T`\> = `` { [K in keyof T as `${string & K}Update`]?: K extends keyof T ? PropertyUpdateMethod<T[K]> : never } ``

Defined in: [src/lib/decorators/types.ts:34](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/decorators/types.ts#L34)

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
