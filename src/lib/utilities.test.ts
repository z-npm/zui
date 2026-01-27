import { describe, it, expect } from 'vitest'
import { toKebabCase, makeReactive } from './utilities'

describe('Utilities', () => {
  it('converts camelCase to kebab-case', () => {
    expect(toKebabCase('myVariableName')).toBe('my-variable-name')
    expect(toKebabCase('HtmlDivElement')).toBe('html-div-element')
  })

  it('makeReactive triggers callback on mutation', async () => {
    let triggered = false
    const data = { count: 0 }
    const reactiveData = makeReactive(data, () => { triggered = true })

    reactiveData.count = 1
    expect(triggered).toBe(true)
  })
})
