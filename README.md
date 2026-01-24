# ZUI Framework ⚡

[![npm version](https://img.shields.io/npm/v/@o.z/zui?style=flat-square)](https://www.npmjs.com/package/@o.z/zui)
[![license](https://img.shields.io/npm/l/@o.z/zui?style=flat-square)](https://www.npmjs.com/package/@o.z/zui)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Compatible-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

**ZUI** is a next-generation, lightweight abstraction layer for building native Web Components. It leverages **TypeScript Stage 3 Decorators** to eliminate boilerplate, manage reactive state, and streamline DOM interactions while staying close to the metal of the browser.

---

## 🚀 Why ZUI?

Standard Web Components require significant boilerplate: managing `observedAttributes`, manually handling `shadowRoot`, and verbose event dispatching. **ZUI** solves this with a declarative, type-safe API:

* **⚡ Stage 3 Decorators:** Built for modern TypeScript, utilizing the standard `accessor` pattern.
* **🔄 Reactive State:** Properties automatically trigger view updates and lifecycle hooks.
* **🎯 Zero-Boilerplate Refs:** Type-safe DOM element caching without manual `querySelector` calls.
* **📡 Magic Event Emitters:** Auto-generated, strictly typed event dispatch methods.
* **🎨 Scoped Styling:** Seamless integration with standard Shadow DOM or scoped styles.
* **🛠 Customized Built-ins:** First-class support for extending native elements (e.g., `<div is="my-component">`).

---

## 📦 Installation

```bash
npm install @o.z/zui
# or
yarn add @o.z/zui
# or
pnpm add @o.z/zui
```

---

## 🛠️ Usage Example

ZUI is designed to work seamlessly with Vite’s raw and inline string imports for templates and styles.

### 1. The Component (```counter.ts```)

```typescript
import { defineElement, event, property, ref, Zui, EventEmitter } from "@o.z/zui"
import htmlStr from "./counter.html?raw"
import cssStr from "./counter.scss?inline"

export type CounterClickEvent = { count: number; e?: MouseEvent }

@defineElement({
  tagName: "my-counter",
  html: htmlStr,
  css: cssStr,
  options: { extends: 'div' } // Extend native div functionality
})
export class Counter extends Zui(HTMLDivElement) {
  // 1. Reactive State: Synchronized with 'count' attribute
  @property()
  accessor count = 0

  // 2. DOM References: Automatically queried from Shadow Root
  @ref(".counter-display")
  displayRef!: HTMLDivElement

  @ref(".btn-inc")
  incBtn!: HTMLButtonElement

  // 3. Event Emitter: Typed event dispatcher
  @event()
  counterClick!: EventEmitter<CounterClickEvent>

  connected() {
    this.incBtn.addEventListener("click", () => {
        this.counterClick.emit({ count: 1 })
    })
  }

  // 4. Reactive Hook: Called when 'count' changes
  countUpdate(oldValue: number, newValue: number) {
    this.displayRef.innerHTML = newValue.toString()
  }
}
```

### 2. Usage in HTML

Since we extended the native `div`, we use the `is` attribute:

```html
<div id="counter" is="my-counter">
  <span slot="increase">Increment</span>
</div>

<script type="module">
  import { Counter } from "./counter"
  
  const el = document.querySelector("#counter")
  
  // Fully typed event details via e.detail.value
  el.addEventListener("counter-click", (e) => {
    el.count += e.detail.value.count
  })
</script>
```

---

## 📚 API Reference

### ```@defineElement(config)```
Class decorator to register the custom element.
* **tagName**: The kebab-case name for your component.
* **html**: Raw HTML string for the template.
* **css**: (Optional) CSS string to be injected into the Shadow Root.
* **options**: (Optional) Standard `ElementDefinitionOptions` (e.g., `{ extends: 'button' }`).

### ```@property(options)```
Used on `accessor` fields to create reactive attributes.
* **type**: `"string" | "number" | "boolean"`. If omitted, it's inferred from the initial value.
* **name**: Custom attribute name (defaults to kebab-case of the property).
* **Hook**: Automatically calls `[propertyName]Update(old, new)` on change.

### ```@ref(selector)```
Field decorator that automatically assigns a child element from the Shadow Root to the property using `querySelector`.

### ```@event(options)```
Field decorator that initializes an `EventEmitter`. 
* **name**: Custom event name (defaults to kebab-case of the property).
* **Usage**: Call `this.propertyName.emit(payload)` to dispatch a `CustomEvent`.

### ```Zui(BaseClass)```
A class mixin that enhances the base element (like `HTMLElement` or `HTMLDivElement`) with improved TypeScript definitions for `addEventListener`, ensuring custom events have correct payload types.

---

## 💻 Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build the library
yarn build
```

---

## License and AI Training
This project is licensed under the GNU General Public License v3.0 (GPLv3).

The authors of this software consider the use of this code, including its source code, documentation, and any other project artifacts, for the training of artificial intelligence (AI) systems (including but not limited to machine learning, large language models, and other AI technologies) to be creating a derivative work. As such, any entity using this code for such purposes must comply with the terms of the GPLv3. This includes, but is not limited to, making the entire source code of the AI system that uses this code available under the same GPLv3 license.

If you wish to use this code for AI training without being subject to the GPLv3, please contact the authors to negotiate a separate license.

