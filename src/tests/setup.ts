import { expect } from 'vitest'
import { getAccessibleName } from '../get-accessible-name'

interface CustomMatchers<TResult = unknown> {
  toHaveAccessibleName: (expectedName: string) => TResult
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toHaveAccessibleName: (output: Element | null, expected) => {
    if (!output) {
      return {
        message: () => 'No matching selectors',
        pass: false
      }
    }

    const accessibleName = getAccessibleName(output)
    const isEqual = accessibleName === expected
    return {
      message: () => (isEqual ? `expected ${expected} accessible name.` : `expected ${expected} accessible name but got ${accessibleName}.`),
      pass: isEqual,
      expected: expected,
      actual: accessibleName
    }
  }
})
