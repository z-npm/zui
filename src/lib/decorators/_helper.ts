import { PropertyOptions } from "./property";
import { ZuiComponent } from "./types";


export const callFun = (attribute: PropertyOptions | undefined, oldValue: unknown, newValue: unknown, zuiThis: ZuiComponent) => {
  if (attribute) {
    const funName = attribute.callbackName!
    if (funName in zuiThis) {
      if (attribute.type === "string") {
        zuiThis[funName](oldValue, newValue);
      } else if (attribute.type === "number") {
        zuiThis[funName](+(oldValue as string), +(newValue as string));
      } else if (attribute.type === "boolean") {
        zuiThis[funName](
          typeof oldValue === "string" ? oldValue === "" || String(oldValue).toLowerCase() === "true" : Boolean(oldValue),
          typeof newValue === "string" ? newValue === "" || String(newValue).toLowerCase() === "true" : Boolean(newValue)
        );
      }
    }
  }
}

export const getConvertor = ({ type, name }: PropertyOptions, zuiThis: ZuiComponent): number | string | boolean | undefined => {
  const value = zuiThis.getAttribute(name!)
  if (value !== undefined && value !== null) {
    if (type === "number")
      return (value === null || value === undefined) ? 0 : Number(value);
    else if (type === "string")
      return value
    else if (type === "boolean") {
      return (value === "" || value?.toLowerCase() === "true")
    }
    else throw `Only accept type of "string", "number", "boolean"`
  }
}

