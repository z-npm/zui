/**
 * @fileoverview Unit tests for utility functions in the ZUI framework.
 * 
 * @module utilities.test
 */

import { describe, it, expect } from 'vitest'
import { toKebabCase, makeReactive } from '.'

/**
 * Test suite for utility functions.
 * 
 * @group utilities
 */
describe('Utilities', () => {
  /**
   * Tests for toKebabCase string conversion.
   * 
   * @group toKebabCase
   */
  describe('toKebabCase', () => {
    it('converts camelCase to kebab-case', () => {
      expect(toKebabCase('myVariableName')).toBe('my-variable-name')
      expect(toKebabCase('HtmlDivElement')).toBe('html-div-element')
    })

    it('handles PascalCase input', () => {
      expect(toKebabCase('PascalCaseExample')).toBe('pascal-case-example')
    })

    // it('handles acronyms in camelCase', () => {
    //   expect(toKebabCase('XMLHttpRequest')).toBe('xml-http-request')
    // })

    // it('handles numbers in strings', () => {
    //   expect(toKebabCase('item2Item')).toBe('item2-item')
    // })
  })

  /**
   * Tests for makeReactive reactive object creation.
   * 
   * @group makeReactive
   */
  describe('makeReactive', () => {
    it('triggers callback on mutation', async () => {
      let triggered = false
      const data = { d: { count: 0 } }
      const reactiveData = makeReactive(data, () => { triggered = true })

      reactiveData.d.count = 1
      expect(triggered).toBe(true)
    })

    it('does not trigger on unchanged values', () => {
      let triggerCount = 0
      const data = { count: 0 }
      const reactiveData = makeReactive(data, () => { triggerCount++ })

      reactiveData.count = 0 // Same value
      expect(triggerCount).toBe(0)

      reactiveData.count = 1 // Changed value
      expect(triggerCount).toBe(1)
    })

    it('supports nested object reactivity', () => {
      let triggered = false
      const data = { user: { profile: { name: 'John' } } }
      const reactiveData = makeReactive(data, () => { triggered = true })

      reactiveData.user.profile.name = 'Jane'
      expect(triggered).toBe(true)
    })

    it('caches proxies for same objects', () => {
      const obj = { value: 1 }
      const cache = new WeakMap<object, any>()
      const reactive1 = makeReactive(obj, () => { }, cache)
      const reactive2 = makeReactive(obj, () => { }, cache)

      expect(reactive1).toBe(reactive2) // Same proxy instance
    })
  })
})

