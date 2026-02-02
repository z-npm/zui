[**ZUI Framework API**](../README.md)

***

# Class: SafeHTML

Defined in: [src/lib/html.ts:25](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/html.ts#L25)

A wrapper class to mark strings as "safe" (already sanitized or trusted).

 SafeHTML

## Example

```typescript
const safe = new SafeHTML('<div>Trusted content</div>');
console.log(safe.value); // '<div>Trusted content</div>'
```

## Remarks

- Used internally by the `html` template tag
- Signals that content doesn't need escaping
- Should only be created from trusted sources

## Constructors

### Constructor

> **new SafeHTML**(`value`): `SafeHTML`

Defined in: [src/lib/html.ts:30](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/html.ts#L30)

Creates a SafeHTML instance.

#### Parameters

##### value

`string`

HTML string that is already sanitized or trusted

#### Returns

`SafeHTML`

## Properties

### value

> `readonly` **value**: `string`

Defined in: [src/lib/html.ts:30](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/html.ts#L30)

The safe HTML string

## Methods

### toString()

> **toString**(): `string`

Defined in: [src/lib/html.ts:36](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/html.ts#L36)

Returns the safe HTML string.

#### Returns

`string`

The HTML string
