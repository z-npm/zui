export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const toKebabCase = (str: string) => str
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

export const isBrowser = typeof window !== 'undefined';

export const makeReactive = <T extends object>(target: T, onChange: () => void): T => {
  const handler: ProxyHandler<T> = {
    set(target, prop, value, receiver) {
      const result = Reflect.set(target, prop, value, receiver);
      onChange();
      return result;
    },
    deleteProperty(target, prop) {
      const result = Reflect.deleteProperty(target, prop);
      onChange();
      return result;
    }
  };
  return new Proxy(target, handler);
}
