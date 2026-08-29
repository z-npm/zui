[**ZUI Framework API**](../README.md)

***

# Type Alias: ZuiEventMap\<T\>

> **ZuiEventMap**\<`T`\> = `{ [K in keyof T as T[K] extends EventEmitter<any> ? KebabCase<string & K> : never]: InferEventDetail<T[K]> }`

Defined in: [src/lib/decorators/types.ts:156](https://github.com/z-npm/zui/blob/84e8372d25a414a972914b586bcfe9442a8f5a55/src/lib/decorators/types.ts#L156)

Maps component event properties to their corresponding event types.

## Type Parameters

### T

`T`

Component type

## Example

```typescript
// If component has: counterClick!: EventEmitter<{ count: number }>;
// Then ZuiEventMap<Component> includes: 'counter-click': { value: { count: number } }
```
