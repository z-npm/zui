export interface ZuiComponent extends HTMLElement {
  connected?(): void;
  disconnected?(): void;
  attributeChanged?(attributeName: string, oldValue: string, newValue: string): void;
  [key: string]: any;
}

export interface CustomEventDetail<T> {
  value: T;
}

export class EventEmitter<T> {
  constructor(private target: HTMLElement, private eventName: string) { }

  emit(value: T, options?: Omit<CustomEventInit, 'detail'>) {
    this.target.dispatchEvent(
      new CustomEvent<CustomEventDetail<T>>(this.eventName, {
        detail: { value },
        bubbles: true,
        composed: true,
        ...options,
      })
    );
  }
}

export type EventDetail<T> = T extends EventEmitter<infer U> ? U : never;
