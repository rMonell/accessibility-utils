import { expect } from 'vitest'
import { getAccessibleName } from '../get-accessible-name'
import { resolveElementRole } from '../resolve-element-role'
import { ARIARoleDefinitionKey } from 'aria-query'

interface CustomMatchers<TResult = unknown> {
  toHaveAccessibleName: (expectedName: string) => TResult
  toHaveRole: (role: ARIARoleDefinitionKey) => TResult
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toHaveRole: (output: Element | null, expectedRole) => {
    if (!(output instanceof HTMLElement)) {
      return {
        message: () => 'No matching selectors',
        pass: false
      }
    }
    const resolvedRole = resolveElementRole(output)
    const passed = !!resolvedRole
    return {
      message: () => (passed ? `expected ${resolvedRole} accessible name.` : `expected ${resolvedRole} accessible name but got ${resolvedRole}.`),
      pass: passed,
      expected: expectedRole,
      actual: resolvedRole
    }
  },
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
