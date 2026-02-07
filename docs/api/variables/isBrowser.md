[**ZUI Framework API**](../README.md)

***

# Variable: isBrowser

> `const` **isBrowser**: `boolean`

Defined in: src/lib/utilities/isBrowser.ts:22

Detects if the code is running in a browser environment.

Useful for server-side rendering (SSR) or avoiding browser-only APIs.

## Constant

## Example

```typescript
if (isBrowser) {
  // Safe to use window, document, etc.
  document.querySelector('...');
} else {
  // Server-side or Node.js environment
  console.log('Running on server');
}
```

## See

[https://developer.mozilla.org/en-US/docs/Web/API/Window/window](https://developer.mozilla.org/en-US/docs/Web/API/Window/window)
