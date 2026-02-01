import { ZuiEventMap } from "./types";


export function Zui<TBase extends new (...args: any[]) => HTMLElement>(Base: TBase) {
  abstract class ZuiElement extends Base {
    abstract connected?(): void;
    abstract disconnected?(): void;
    abstract attributeChanged?(attributeName: string, oldValue: string, newValue: string): void;

    addEventListener<K extends keyof ZuiEventMap<this>>(
      type: K,
      listener: (ev: CustomEvent<ZuiEventMap<this>[K]>) => void,
      options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
      type: string,
      listener: any,
      options?: boolean | AddEventListenerOptions
    ): void {
      super.addEventListener(type, listener, options);
    }
  }

  return ZuiElement
}

