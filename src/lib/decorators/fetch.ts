/**
 * @fileoverview Fetch decorator for declarative data fetching in ZUI components.
 * Provides a reactive data fetcher with built-in loading, error, and success states.
 * 
 * @module fetch
 */

import { ZuiComponent } from "./types"
import { FETCH_CONSTRUCTOR_KEY } from "./_constants"
import { Fetcher, FetcherOptions } from "@o.z/utils"

/**
 * Configuration options for the @fetch decorator.
 * Extends {@link FetcherOptions} from `@o.z/utils`.
 * 
 * @interface FetchOptions
 * @template Data - The expected shape of the fetched data.
 * 
 * @example
 * ```typescript
 * const options: FetchOptions<User[]> = {
 *   url: 'https://api.example.com/users',
 *   autoRefetch: false,
 *   onSuccess: (users) => console.log('Users loaded:', users),
 *   onError: (error) => console.error('Failed to load users', error),
 *   onLoadingChange: (isLoading) => console.log('Loading:', isLoading)
 * }
 * ```
 */
export interface FetchOptions extends FetcherOptions { }

/**
 * Field decorator that creates a {@link Fetcher} instance for declarative data fetching.
 * 
 * Features:
 * - Automatic instantiation after component connection
 * - Built-in loading, error, and success state management
 * - Configurable via {@link FetchOptions}
 * - Supports auto-refetch and manual refetching
 * - Lifecycle hooks for loading state changes, success, and error
 * 
 * @template Data - The expected data type returned by the fetch operation.
 * @param {FetchOptions} options - Configuration options for the fetcher.
 * @returns {ClassFieldDecorator} A field decorator function.
 * 
 * @example
 * ```typescript
 * import { defineElement, fetch } from '@o.z/zui'
 * import { Fetcher } from '@o.z/utils'
 * 
 * @defineElement({ tagName: 'user-list', html: '<div></div>' })
 * class UserList extends Zui(HTMLElement) {
 *   @fetch({
 *     url: 'https://jsonplaceholder.typicode.com/users',
 *     onLoadingChange: (loading) => console.log('Loading:', loading),
 *     onSuccess: (users) => console.log('Users loaded:', users),
 *     onError: (err) => console.error('Error:', err)
 *   })
 *   users!: Fetcher<User[]>
 * 
 *   connected() {
 *     // The fetcher is ready you can access its data, loading, error properties
 *     console.log(this.users.value)
 *   }
 * 
 *   refreshUsers() {
 *     this.users.reFetch() // Manual refetch
 *   }
 * }
 * ```
 * 
 * @remarks
 * - The fetcher instance is created asynchronously after the component's `connectedCallback`.
 * - Use `Fetcher`'s properties (`data`, `loading`, `error`) in your template or logic.
 * - The `autoRefetch` option (from `FetcherOptions`) controls whether a fetch is triggered immediately.
 * 
 * @see {@link https://github.com/z-npm/utils | @o.z/utils} for `Fetcher` API details.
 */
export const fetch = <Data = unknown>(options: FetchOptions) => {
  return <T extends HTMLElement, V extends Fetcher<Data>>(_target: undefined, context: ClassFieldDecoratorContext<T, V>) => {
    context.addInitializer(function () {
      const zuiThis = this as unknown as ZuiComponent

      const fetchInit = zuiThis?.[FETCH_CONSTRUCTOR_KEY as any]
      zuiThis[FETCH_CONSTRUCTOR_KEY as any] = async function (this: any) {
        if (typeof fetchInit === "function") fetchInit.call(this)
        zuiThis[context.name.toString()] = new Fetcher<Data>(options)
      }
    })
  }
}

