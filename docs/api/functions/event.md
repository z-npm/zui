[**ZUI Framework API**](../README.md)

***

# Function: event()

> **event**(`options?`): \<`T`, `V`\>(`_target`, `context`) => `void`

Defined in: [src/lib/decorators/event.ts:64](https://github.com/z-npm/zui/blob/476a9a1f0b0beed5843d63449d20234d11788a39/src/lib/decorators/event.ts#L64)

Field decorator that creates a typed EventEmitter instance for dispatching custom events.

Features:
- Automatic event naming (camelCase → kebab-case)
- Type-safe event payloads
- Bubbles and composed by default
- Asynchronous initialization via queueMicrotask

## Parameters

### options?

[`EventOptions`](../interfaces/EventOptions.md) = `{}`

Event configuration options

## Returns

A field decorator function

\<`T`, `V`\>(`_target`, `context`) => `void`

## Example

```typescript
// Basic usage with automatic naming
@event()
counterClick!: EventEmitter<{ count: number }>;
// Dispatches 'counter-click' event

// With custom event name
@event({ name: 'value-changed' })
onChange!: EventEmitter<number>;
// Dispatches 'value-changed' event

// Usage in component
this.counterClick.emit({ count: this.count });
```

## Remarks

- Events bubble up the DOM tree by default
- Events can cross shadow DOM boundaries (composed: true)
- Event name is converted to kebab-case automatically

## See

 - [https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
 - [EventEmitter](../classes/EventEmitter.md)
