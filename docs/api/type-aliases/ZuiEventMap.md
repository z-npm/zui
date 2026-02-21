[**ZUI Framework API**](../README.md)

***

# Type Alias: ZuiEventMap\<T\>

> **ZuiEventMap**\<`T`\> = `{ [K in keyof T as T[K] extends EventEmitter<any> ? KebabCase<string & K> : never]: InferEventDetail<T[K]> }`

Defined in: [src/lib/decorators/types.ts:156](https://github.com/z-npm/zui/blob/7f1d66960688b03e03628842d4fb0c24590b68ab/src/lib/decorators/types.ts#L156)

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
