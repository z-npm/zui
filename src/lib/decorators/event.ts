import { toKebabCase } from "../utilities";
import { EventEmitter, ZuiComponent } from "./types";

export interface EventOptions {
  name?: string
}

export const event = (options: EventOptions = {}) => {
  return <T extends HTMLElement, V>(
    _target: undefined,
    context: ClassFieldDecoratorContext<T, EventEmitter<V>>
  ) => {
    const eventName = options.name ?? toKebabCase(context.name.toString());

    context.addInitializer(function (this: T) {
      queueMicrotask(() => {
        const zuiThis = this as unknown as ZuiComponent
        zuiThis[context.name.toString()] = new EventEmitter<V>(zuiThis, eventName);
      })
    });
  };
};

