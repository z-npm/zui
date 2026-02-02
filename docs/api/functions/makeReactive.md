[**ZUI Framework API**](../README.md)

***

# Function: makeReactive()

> **makeReactive**\<`T`\>(`target`, `onChange`, `proxyCache?`): `T`

Defined in: [src/lib/utilities.ts:120](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/utilities.ts#L120)

Creates a reactive proxy for an object that triggers callbacks on mutations.

Implements deep reactivity using JavaScript Proxy with caching for performance.

## Type Parameters

### T

`T` *extends* `object`

Object type (must be an object)

## Parameters

### target

`T`

Target object to make reactive

### onChange

() => `void`

Callback function triggered on any mutation

### proxyCache?

`WeakMap`\<`object`, `any`\> = `...`

Internal cache for avoiding duplicate proxies

## Returns

`T`

Reactive proxy of the target object

## Throws

If target is not an object

## Example

```typescript
// Create reactive state
const state = makeReactive(
  { count: 0, user: { name: 'John' } },
  () => console.log('State changed!')
);

// Triggers callback:
state.count = 1; // Logs: 'State changed!'
state.user.name = 'Jane'; // Logs: 'State changed!'

// Nested objects are also reactive
state.user.age = 30; // Logs: 'State changed!'
```

## Remarks

- Uses ES6 Proxy for interception
- Deep reactivity: nested objects become reactive automatically
- WeakMap cache prevents proxy duplication for same object
- Only intercepts set and deleteProperty operations
- Get operations return reactive proxies for nested objects
- Performance optimized with caching

## See

 - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
 - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
