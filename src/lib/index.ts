/**
 * @fileoverview Main entry point for ZUI framework.
 * Exports all decorators, utilities, and core functionality.
 * 
 * @module @o.z/zui
 * 
 * @example
 * ```typescript
 * import { defineElement, property, event, ref, Zui } from '@o.z/zui';
 * 
 * @defineElement({ tagName: 'my-element', html: '<div></div>' })
 * class MyElement extends Zui(HTMLElement) {
 *   @property() accessor count = 0;
 *   @event() onClick!: EventEmitter<void>;
 *   @ref('.btn') button!: HTMLButtonElement;
 * }
 * ```
 */

export * from './utilities';
export * from './decorators';
export * from './dom';
export * from './html';

