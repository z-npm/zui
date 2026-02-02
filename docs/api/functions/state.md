[**ZUI Framework API**](../README.md)

***

# Function: state()

> **state**(`options?`): \<`T`, `V`\>(`accessor`, `context`) => `object`

Defined in: [src/lib/decorators/state.ts:65](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/decorators/state.ts#L65)

Accessor decorator for internal reactive state that doesn't reflect to DOM attributes.

Features:
- Reactive state for objects and arrays
- Automatic update callbacks on state changes
- Deep reactivity with Proxy
- No attribute reflection (unlike @property)

## Parameters

### options?

[`StateOptions`](../interfaces/StateOptions.md) = `{}`

State configuration options

## Returns

An accessor decorator function

> \<`T`, `V`\>(`accessor`, `context`): `object`

### Type Parameters

#### T

`T` *extends* `HTMLElement`

#### V

`V`

### Parameters

#### accessor

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

> **get**(`this`): `V`

##### Parameters

###### this

`T`

##### Returns

`V`

#### set()

> **set**(`this`, `newValue`): `void`

##### Parameters

###### this

`T`

###### newValue

`V`

##### Returns

`void`

## Example

```typescript
// Reactive array state
@state()
accessor items: string[] = [];
// Calls itemsUpdate() on array mutations

// Reactive object state
@state()
accessor user = { name: '', age: 0 };
// Calls userUpdate() on property changes

// With custom callback
@state({ callbackName: 'onDataChange' })
accessor data = {};
// Calls onDataChange() instead of dataUpdate()
```

## Remarks

- Best for complex objects, arrays, or private data
- Uses Proxy for deep reactivity
- Update callbacks receive (oldValue, newValue)
- Changes are batched with queueMicrotask

## See

[makeReactive](makeReactive.md)
