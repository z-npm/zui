[**ZUI Framework API**](../README.md)

***

# Function: html()

> **html**(`strings`, ...`values`): [`SafeHTML`](../classes/SafeHTML.md)

Defined in: [src/lib/html.ts:102](https://github.com/z-npm/zui/blob/7462a855b708843a1cb700339806285d1dcda15f/src/lib/html.ts#L102)

A tagged template literal for safely generating HTML strings.

Automatically escapes interpolated values to prevent XSS attacks,
unless they are wrapped in `SafeHTML` or `unsafeHTML()`.

## Parameters

### strings

`TemplateStringsArray`

Template string parts

### values

...`any`[]

Interpolated values to insert

## Returns

[`SafeHTML`](../classes/SafeHTML.md)

SafeHTML instance containing the generated HTML

## Throws

If values cannot be converted to strings

## Example

```typescript
// Basic usage with escaping
const userInput = '<script>alert("xss")</script>';
const safeHtml = html`<div>${userInput}</div>`;
// Result: '<div>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</div>'

// With SafeHTML (no escaping)
const trusted = unsafeHTML('<em>italic</em>');
const html = html`<div>${trusted}</div>`;
// Result: '<div><em>italic</em></div>'

// With arrays
const items = ['apple', 'banana', 'cherry'];
const list = html`<ul>${items.map(item => html`<li>${item}</li>`)}</ul>`;
```

## Remarks

- Always escapes strings unless they're SafeHTML instances
- Handles arrays by recursively processing each item
- Returns SafeHTML object for type safety
- Follows the same pattern as lit-html or hyperHTML

## See

 - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template\_literals#tagged\_templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
 - [unsafeHTML](unsafeHTML.md) for escape hatch
