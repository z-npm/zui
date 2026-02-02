[**ZUI Framework API**](../README.md)

***

# Variable: isBrowser

> `const` **isBrowser**: `boolean`

Defined in: [src/lib/utilities.ts:78](https://github.com/z-npm/zui/blob/4a034ce3ea9e1b4fb23ee85178fdca766c31b1cb/src/lib/utilities.ts#L78)

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
