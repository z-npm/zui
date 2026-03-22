[**ZUI Framework API**](../README.md)

***

# Function: state()

> **state**(`options?`): \<`T`, `V`\>(`accessor`, `context`) => `object`

Defined in: [src/lib/decorators/state.ts:65](https://github.com/z-npm/zui/blob/c41276f97d0b4754671fbb37aa0c8386ada4cc0f/src/lib/decorators/state.ts#L65)

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

\<`T`, `V`\>(`accessor`, `context`) => `object`

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

makeReactive
