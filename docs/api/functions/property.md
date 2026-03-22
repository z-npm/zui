[**ZUI Framework API**](../README.md)

***

# Function: property()

> **property**(`options?`): \<`T`, `V`\>(`_accessor`, `context`) => `object`

Defined in: [src/lib/decorators/property.ts:77](https://github.com/z-npm/zui/blob/c41276f97d0b4754671fbb37aa0c8386ada4cc0f/src/lib/decorators/property.ts#L77)

Accessor decorator that creates reactive properties synchronized with DOM attributes.

Features:
- Automatic attribute reflection (property ↔ attribute)
- Type conversion (string, number, boolean)
- Lifecycle hooks with automatic update callbacks
- Default values from initializer

## Parameters

### options?

[`PropertyOptions`](../interfaces/PropertyOptions.md) = `{}`

Property configuration options

## Returns

An accessor decorator function

\<`T`, `V`\>(`_accessor`, `context`) => `object`

## Example

```typescript
// Basic usage with type inference
@property()
accessor count = 0; // Creates 'count' attribute, calls countUpdate()

// With custom attribute name
@property({ name: 'is-enabled' })
accessor enabled = true; // Creates 'is-enabled' attribute

// With explicit type
@property({ type: 'boolean' })
accessor disabled = false;
```

## Remarks

- Boolean attributes are set as "true"/"false" strings
- Empty string for boolean attributes evaluates to true
- Update methods are called asynchronously via queueMicrotask

## See

[https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
