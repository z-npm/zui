export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const toKebabCase = (str: string) => str
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

export const isBrowser = typeof window !== 'undefined';

export const makeReactive = <T extends object>(target: T, onChange: () => void, proxyCache = new WeakMap<object, any>()): T => {
  if (proxyCache.has(target)) return proxyCache.get(target) as T

  const handler: ProxyHandler<T> = {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver)
      if (typeof value === 'object' && value !== null) {
        return makeReactive(value, onChange, proxyCache)
      }
      return value
    },
    set(target, prop, value, receiver) {
      const oldValue = Reflect.get(target, prop, receiver)
      if (oldValue === value) return true

      const result = Reflect.set(target, prop, value, receiver)
      onChange()
      return result
    },
    deleteProperty(target, prop) {
      const result = Reflect.deleteProperty(target, prop)
      onChange()
      return result
    }
  }

  const proxy = new Proxy(target, handler)
  proxyCache.set(target, proxy)
  return proxy
}
