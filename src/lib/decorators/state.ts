import { makeReactive } from "../utilities";
import { ZuiComponent } from "./types";


export interface StateOptions {
  callbackName?: string
}

/**
 * Decorator for internal reactive state.
 * Triggers component updates but does NOT reflect to DOM attributes.
 * Useful for Objects, Arrays, or private data.
 */
export const state = ({ callbackName }: StateOptions = {}) => {
  return <T extends HTMLElement, V>(
    accessor: { get: (this: T) => V, set: (this: T, value: V) => void },
    context: ClassAccessorDecoratorContext<T, V>
  ) => {
    const propName = context.name.toString();
    const updateMethodName = callbackName ?? `${propName}Update`;

    return {
      init(this: T, initialValue: V): V {
        const zuiThis = this as unknown as ZuiComponent;

        const triggerUpdate = () => {
          queueMicrotask(() => {
            if (typeof zuiThis[updateMethodName] === 'function') {
              zuiThis[updateMethodName](initialValue, initialValue);
            }
          });
        };

        let finalValue = initialValue;
        if (initialValue && typeof initialValue === 'object') {
          finalValue = makeReactive(initialValue as object, triggerUpdate) as V;
        }

        triggerUpdate();
        return finalValue;
      },
      get(this: T): V {
        return accessor.get.call(this);
      },
      set(this: T, newValue: V) {
        const zuiThis = this as unknown as ZuiComponent;

        const triggerUpdate = () => {
          queueMicrotask(() => {
            if (typeof zuiThis[updateMethodName] === 'function') {
              zuiThis[updateMethodName](newValue, newValue);
            }
          });
        };

        let finalValue = newValue;
        if (newValue && typeof newValue === 'object') {
          finalValue = makeReactive(newValue as object, triggerUpdate) as V;
        }

        accessor.set.call(this, finalValue);
        triggerUpdate();
      }
    };
  };
};

