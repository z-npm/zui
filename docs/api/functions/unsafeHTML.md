[**ZUI Framework API**](../README.md)

***

# Function: unsafeHTML()

> **unsafeHTML**(`str`): [`SafeHTML`](../classes/SafeHTML.md)

Defined in: [src/lib/html.ts:153](https://github.com/z-npm/zui/blob/7462a855b708843a1cb700339806285d1dcda15f/src/lib/html.ts#L153)

An escape hatch to treat a string as safe HTML without escaping.

⚠️ **WARNING**: Only use this with content you completely trust.
Never use with user input, database content, or external data.

## Parameters

### str

`string`

Trusted HTML string that doesn't need escaping

## Returns

[`SafeHTML`](../classes/SafeHTML.md)

SafeHTML wrapper marking the string as safe

## Example

```typescript
// ✅ Safe usage - hardcoded content
const icon = unsafeHTML('<svg>...</svg>');

// ❌ DANGEROUS - user input
const userContent = getUserInput();
const dangerous = unsafeHTML(userContent); // XSS vulnerability!

// ✅ Safe pattern with sanitization
const sanitized = sanitizeHTML(userInput);
const safe = unsafeHTML(sanitized);
```

## Remarks

- Consider using a proper HTML sanitizer like DOMPurify
- Review usage of this function during security audits
- Prefer `html` template tag for automatic escaping

## See

 - [https://github.com/cure53/DOMPurify](https://github.com/cure53/DOMPurify) for HTML sanitization
 - [html](html.md) for safe template literals
