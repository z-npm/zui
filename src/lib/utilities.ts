export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const toKebabCase = (str: string) => str
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

export class EventEmitter<T> {
  constructor(private target: HTMLElement, private eventName: string) {}

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
