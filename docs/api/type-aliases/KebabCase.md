[**ZUI Framework API**](../README.md)

***

# Type Alias: KebabCase\<S\>

> **KebabCase**\<`S`\> = `S` *extends* `` `${infer T}${infer U}` `` ? `U` *extends* `Uncapitalize`\<`U`\> ? `` `${Uncapitalize<T>}${KebabCase<U>}` `` : `` `${Uncapitalize<T>}-${KebabCase<U>}` `` : `S`

Defined in: [src/lib/decorators/types.ts:130](https://github.com/z-npm/zui/blob/8343ddbfb68b96e237a63bf86f35f8e5fcf64328/src/lib/decorators/types.ts#L130)

Converts camelCase strings to kebab-case.
Used for automatic event name generation.

## Type Parameters

### S

`S` *extends* `string`

Input string type
