import { EventEmitter, CustomEventDetail } from './decorators';

export * from './utilities';
export * from './decorators';
export * from './dom';
export * from './html';

type KebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
  ? `${Uncapitalize<T>}${KebabCase<U>}`
  : `${Uncapitalize<T>}-${KebabCase<U>}`
  : S;

export type InferEventDetail<T> = T extends EventEmitter<infer U>
  ? CustomEventDetail<U>
  : never;

type ZuiEventMap<T> = {
  [K in keyof T as T[K] extends EventEmitter<any>
  ? KebabCase<string & K>
  : never]: InferEventDetail<T[K]>
}

export function Zui<TBase extends new (...args: any[]) => HTMLElement>(Base: TBase) {
  return class ZuiElement extends Base {
    addEventListener<K extends keyof ZuiEventMap<this>>(
      type: K,
      listener: (ev: CustomEvent<ZuiEventMap<this>[K]>) => void,
      options?: boolean | AddEventListenerOptions
    ): void;

    addEventListener<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
      options?: boolean | AddEventListenerOptions
    ): void;

    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ): void;

    addEventListener(type: string, listener: any, options?: any): void {
      super.addEventListener(type, listener, options);
    }
  };
}

