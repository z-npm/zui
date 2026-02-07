[**ZUI Framework API**](../README.md)

***

# Function: delay()

> **delay**(`ms`): `Promise`\<`unknown`\>

Defined in: src/lib/utilities/delay.ts:18

Creates a promise that resolves after a specified delay.

Useful for debouncing, animations, or simulating async operations.

## Parameters

### ms

`number`

Delay in milliseconds

## Returns

`Promise`\<`unknown`\>

Promise that resolves after the delay

## Example

```typescript
// Wait for 1 second
await delay(1000);
console.log('1 second later');
```

## See

[https://developer.mozilla.org/en-US/docs/Web/API/setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
