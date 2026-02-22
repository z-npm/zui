[**ZUI Framework API**](../README.md)

***

# Type Alias: KebabCase\<S\>

> **KebabCase**\<`S`\> = `S` *extends* `` `${infer T}${infer U}` `` ? `U` *extends* `Uncapitalize`\<`U`\> ? `` `${Uncapitalize<T>}${KebabCase<U>}` `` : `` `${Uncapitalize<T>}-${KebabCase<U>}` `` : `S`

Defined in: [src/lib/decorators/types.ts:130](https://github.com/z-npm/zui/blob/6661d1446c04df5326fc8b0bf2e03e078c8d42f4/src/lib/decorators/types.ts#L130)

Converts camelCase strings to kebab-case.
Used for automatic event name generation.

## Type Parameters

### S

`S` *extends* `string`

Input string type
