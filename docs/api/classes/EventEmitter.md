[**ZUI Framework API**](../README.md)

***

# Class: EventEmitter\<T\>

Defined in: [src/lib/decorators/types.ts:82](https://github.com/z-npm/zui/blob/9eb97da5fcf705679604ff6947fa10410017e48a/src/lib/decorators/types.ts#L82)

Type-safe event emitter for dispatching custom events.

## Example

```typescript
const emitter = new EventEmitter<number>(element, 'count-changed');
emitter.emit(42);
```

## Type Parameters

### T

`T`

Event detail type
 EventEmitter

## Constructors

### Constructor

> **new EventEmitter**\<`T`\>(`target`, `eventName`): `EventEmitter`\<`T`\>

Defined in: [src/lib/decorators/types.ts:88](https://github.com/z-npm/zui/blob/9eb97da5fcf705679604ff6947fa10410017e48a/src/lib/decorators/types.ts#L88)

Creates an event emitter.

#### Parameters

##### target

`HTMLElement`

The element that will dispatch events

##### eventName

`string`

Name of the custom event (converted to kebab-case)

#### Returns

`EventEmitter`\<`T`\>

## Methods

### emit()

> **emit**(`value`, `options?`): `void`

Defined in: [src/lib/decorators/types.ts:105](https://github.com/z-npm/zui/blob/9eb97da5fcf705679604ff6947fa10410017e48a/src/lib/decorators/types.ts#L105)

Dispatches a custom event.

#### Parameters

##### value

`T`

Event payload

##### options?

`Omit`\<`CustomEventInit`\<`any`\>, `"detail"`\>

Additional event options

#### Returns

`void`

#### Example

```typescript
this.counterClick.emit({ count: 1 }, { bubbles: false });
```

#### Remarks

- Events bubble and composed are true by default
- Detail is wrapped in { value: payload } structure
