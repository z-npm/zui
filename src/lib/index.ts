import { EventEmitter } from "./types.ts";

export * from "./utilities"
export * from "./decorators"
export * from "./dom"
export * from "./types.ts"
export * from "./html.ts"

type InferEventDetail<T, K extends keyof T> = T[K] extends EventEmitter<infer P> ? P : never;

export function Zui<TBase extends new (...args: any[]) => HTMLElement>(Base: TBase) {
  return class extends Base {
    addEventListener<K extends string>(
      type: K,
      // @ts-ignore: Unreachable code error
      listener: (ev: CustomEvent<{ value: InferEventDetail<this, any> }>) => void,
      options?: boolean | AddEventListenerOptions
    ): void;

    addEventListener<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
      options?: boolean | AddEventListenerOptions
    ): void;

    addEventListener(type: string, listener: any, options?: any): void {
      super.addEventListener(type, listener, options);
    }
  };
} 
