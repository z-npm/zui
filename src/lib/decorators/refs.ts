import { ZuiComponent } from "./types";
import { REFS_KEY } from "./_constants";

export const ref = (selector: string) => {
  return <T extends HTMLElement, V extends HTMLElement>(_target: undefined, context: ClassFieldDecoratorContext<T, V>) => {
    context.metadata![REFS_KEY] ??= [];
    const refs = context.metadata![REFS_KEY] as string[]
    refs.push(selector)

    context.addInitializer(function () {
      queueMicrotask(() => {
        const zuiThis = this as unknown as ZuiComponent
        zuiThis[context.name.toString()] = zuiThis.shadowRoot!.querySelector(selector)!
      })
    })
  }
}

