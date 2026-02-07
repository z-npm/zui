[**ZUI Framework API**](../README.md)

***

# Function: toKebabCase()

> **toKebabCase**(`str`): `string`

Defined in: src/lib/utilities/toKebabCase.ts:26

Converts a camelCase or PascalCase string to kebab-case.

Used internally for attribute and event name generation.

## Parameters

### str

`string`

Input string in camelCase or PascalCase

## Returns

`string`

kebab-case version of the input

## Example

```typescript
toKebabCase('myVariableName'); // 'my-variable-name'
toKebabCase('HTMLDivElement'); // 'html-div-element'
toKebabCase('dataURL'); // 'data-url'
toKebabCase('backgroundColor'); // 'background-color'
```

## Remarks

- Handles multiple uppercase letters in sequence
- Preserves existing hyphens and underscores
- Converts spaces to hyphens
- Returns lowercase result

## See

 - [https://developer.mozilla.org/en-US/docs/Glossary/Camel\_case](https://developer.mozilla.org/en-US/docs/Glossary/Camel_case)
 - [https://developer.mozilla.org/en-US/docs/Glossary/Kebab\_case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case)
