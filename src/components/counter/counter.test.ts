import { describe, it, expect, beforeEach } from 'vitest'
import { Counter } from './counter'
import '../index' // Import to register the element

describe('Counter Component', () => {
  let el: Counter

  beforeEach(() => {
    // Create element using the "is" attribute syntax as defined in main.ts
    el = document.createElement('div', { is: 'my-counter' }) as Counter
    document.body.appendChild(el)
  })

  it('initializes with default props', () => {
    expect(el.count).toBe(0)
    // Access Shadow DOM to check rendering
    const display = el.shadowRoot?.querySelector('.counter')
    expect(display?.innerHTML).toBe('0')
  })

  it('updates DOM when property changes', async () => {
    el.count = 5
    // Wait for microtask queue (since your framework uses queueMicrotask)
    await Promise.resolve()

    const display = el.shadowRoot?.querySelector('.counter')
    expect(display?.innerHTML).toBe('5')
  })

  it('emits event on increment click', async () => {
    let eventDetail: any = null
    el.addEventListener('counter-click', (e: any) => {
      eventDetail = e.detail.value
    })

    const incBtn = el.shadowRoot?.querySelector('.increase') as HTMLButtonElement
    incBtn.click()

    expect(eventDetail).not.toBeNull()
    expect(eventDetail.count).toBe(1)
  })
})
