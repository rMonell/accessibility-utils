import { describe, it, expect } from 'vitest'
import { getAccessibleName } from '..'

import accessibleNameAssertions from './assertions'
import { render } from './utils'

interface CustomMatchers<TResult = unknown> {
  toHaveAccessibleName: (expectedName: string) => TResult
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toHaveAccessibleName: (output, expected) => {
    const accessibleName = getAccessibleName(output)
    const isEqual = accessibleName === expected

    return {
      message: () =>
        isEqual
          ? `expected ${expected} accessible name.`
          : `expected ${expected} accessible name but got ${accessibleName}.`,
      pass: isEqual,
      expected: expected,
      actual: accessibleName
    }
  }
})

describe('getAccessibleName', () => {
  it.each(accessibleNameAssertions)(
    `should have $expectedName as accessible name`,
    ({ selector, html, expectedName }) => {
      const root = render(html)
      const target = root.querySelector(selector)

      const { getComputedStyle } = window
      window.getComputedStyle = elt => getComputedStyle(elt)

      if (!target) {
        throw `No matching selectors ${selector}`
      }
      expect(root.querySelector(selector)).toHaveAccessibleName(expectedName)
    }
  )
})
