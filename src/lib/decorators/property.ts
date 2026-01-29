import { toKebabCase } from "../utilities";
import { callFun, getConvertor } from "./_helper";
import { OBSERVED_ATTRS_KEY } from "./_constants";
import { ZuiComponent } from "./types";


export type PropertyType = "string" | "number" | "boolean";
export type PropertyCallback = "Update" | "Changed";

export interface PropertyOptions {
  type?: PropertyType;
  name?: string;
  callbackName?: `${string}${PropertyCallback}`;
}

export const property = ({ type, name, callbackName }: PropertyOptions = {}) => {
  return <T extends HTMLElement, V extends number | string | boolean>(
    _accessor: { get: (this: T) => V, set: (this: T, value: V) => void },
    context: ClassAccessorDecoratorContext<T, V>) => {
    const attributName = name ?? toKebabCase(context.name.toString())
    const attributCallbackName = callbackName ?? `${context.name.toString()}Update`
    let attribute: PropertyOptions = { type, name: attributName, callbackName: attributCallbackName }

    context.metadata![OBSERVED_ATTRS_KEY] ??= [];
    const attributes = context.metadata![OBSERVED_ATTRS_KEY] as PropertyOptions[];
    attributes.push(attribute)

    return {
      init(this: T, initialValue: V): V {
        attribute.type = type ?? typeof initialValue as any

        const zuiThis = this as unknown as ZuiComponent
        zuiThis.setAttribute(attribute.name!, String(initialValue));

        queueMicrotask(() => {
          callFun(
            attribute,
            initialValue,
            initialValue,
            zuiThis)
        });

        return initialValue;
      },
      get: function (this: T): V {
        const zuiThis = this as unknown as ZuiComponent
        return getConvertor(attribute, zuiThis) as V
      },
      set: function (this: T, value: V) {
        queueMicrotask(() => {
          const zuiThis = this as unknown as ZuiComponent
          const oldValue = getConvertor(attribute, zuiThis)
          if (attribute.type === "string" || attribute.type === "number") {
            zuiThis.setAttribute(attributName, String(value))
          } else if (attribute.type === "boolean") {
            zuiThis.setAttribute(attributName, value ? "true" : "false")
          }
          else throw `Only accept type of "string", "number", "boolean"`
          if (oldValue !== value)
            callFun(
              attribute,
              oldValue,
              value,
              zuiThis)
        })
      }
    }
  };
}

