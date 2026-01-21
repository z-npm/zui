export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const toKebabCase = (str: string) => str
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase();
