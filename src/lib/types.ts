export interface ZuiComponent extends HTMLElement {
  connected?(): void;
  disconnected?(): void;
  attributeChanged(
    attributeName: string,
    oldValue: string,
    newValue: string,
  ): void;
  [key: string]: any;
}

export class EventEmitter<T> {
  constructor(private target: HTMLElement, private eventName: string) { }

  emit(value: T, options?: Omit<CustomEventInit, 'detail'>) {
    this.target.dispatchEvent(
      new CustomEvent(this.eventName, {
        detail: { value },
        bubbles: true,
        composed: true,
        ...options,
      })
    );
  }
}

