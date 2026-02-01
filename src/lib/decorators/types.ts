export type PropertyUpdateMethod<T> =
  T extends number ? (oldValue: number, newValue: number) => void :
  T extends string ? (oldValue: string, newValue: string) => void :
  T extends boolean ? (oldValue: boolean, newValue: boolean) => void :
  (oldValue: T, newValue: T) => void;

export type UpdateMethods<T> = {
  [K in keyof T as `${string & K}Update`]?:
  K extends keyof T
  ? PropertyUpdateMethod<T[K]>
  : never;
};

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

export type KebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
  ? `${Uncapitalize<T>}${KebabCase<U>}`
  : `${Uncapitalize<T>}-${KebabCase<U>}`
  : S;

export type InferEventDetail<T> = T extends EventEmitter<infer U>
  ? CustomEventDetail<U>
  : never;

export type ZuiEventMap<T> = {
  [K in keyof T as T[K] extends EventEmitter<any>
  ? KebabCase<string & K>
  : never]: InferEventDetail<T[K]>
}

