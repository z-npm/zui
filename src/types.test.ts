// src/types/test.ts
import { describe, it, expectTypeOf, beforeEach } from 'vitest';
import { Counter } from './components';

describe('Type Safety', () => {
  let counter!: Counter;

  beforeEach(() => {
    counter = document.createElement('div', { is: 'my-counter' }) as Counter
    document.body.appendChild(counter)
  })

  it('should have typed properties', () => {
    // const counter = new Counter();

    expectTypeOf(counter.count).toEqualTypeOf<number>();
    expectTypeOf(counter.zName).toEqualTypeOf<string>();
    expectTypeOf(counter.isGood).toEqualTypeOf<boolean>();

    // @ts-expect-error - should be number
    counter.count = 'string';

    // @ts-expect-error - should be string
    counter.zName = 123;
  });

  it('should have typed events', () => {
    // const counter = new Counter();

    counter.addEventListener('counter-click', (e) => {
      expectTypeOf(e.detail.value).toEqualTypeOf<{ count: number; e?: MouseEvent }>();
    });
  });
});
