[**ZUI Framework API**](../README.md)

***

# Function: property()

> **property**(`options?`): \<`T`, `V`\>(`_accessor`, `context`) => `object`

Defined in: [src/lib/decorators/property.ts:77](https://github.com/z-npm/zui/blob/6661d1446c04df5326fc8b0bf2e03e078c8d42f4/src/lib/decorators/property.ts#L77)

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

> \<`T`, `V`\>(`_accessor`, `context`): `object`

### Type Parameters

#### T

`T` *extends* `HTMLElement`

#### V

`V` *extends* `string` \| `number` \| `boolean`

### Parameters

#### \_accessor

##### get

(`this`) => `V`

##### set

(`this`, `value`) => `void`

#### context

`ClassAccessorDecoratorContext`\<`T`, `V`\>

### Returns

`object`

#### init()

> **init**(`this`, `initialValue`): `V`

##### Parameters

###### this

`T`

###### initialValue

`V`

##### Returns

`V`

#### get()

> **get**: (`this`) => `V`

##### Parameters

###### this

`T`

##### Returns

`V`

#### set()

> **set**: (`this`, `value`) => `void`

##### Parameters

###### this

`T`

###### value

`V`

##### Returns

`void`

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
