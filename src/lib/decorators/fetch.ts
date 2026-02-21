import { ZuiComponent } from "./types";
import { FETCH_CONSTRUCTOR_KEY } from "./_constants";
import { fetcher, FetcherOptions, toPascalCase } from "@o.z/utils";

export interface FetchOptions extends FetcherOptions {
  autoFetch?: boolean
}

export const fetch = <Data = unknown>({ autoFetch = true, ...options }: FetchOptions) => {
  return <T extends HTMLElement, V extends HTMLElement>(_target: undefined, context: ClassFieldDecoratorContext<T, V>) => {
    context.addInitializer(function () {
      const zuiThis = this as unknown as ZuiComponent

      const refetchFnName = `refetch${toPascalCase(context.name.toString())}`
      zuiThis[refetchFnName] = () => {
        fetcher<Data>(options).then(result => {
          zuiThis[context.name.toString()] = result
        }).catch(_error => { })
      }

      const fetchInit = zuiThis?.[FETCH_CONSTRUCTOR_KEY as any]

      zuiThis[FETCH_CONSTRUCTOR_KEY as any] = async function (this: any) {
        if (typeof fetchInit === "function") fetchInit.call(this);
        if (autoFetch) zuiThis[refetchFnName]?.()
      }
    })
  }
}

