import { describe, it, expect } from 'vitest'

import accessibleNameAssertions from './assertions'
import { render } from '../tests/utils'

describe('getAccessibleName', () => {
  it.each(accessibleNameAssertions)(`should have $expectedName as accessible name`, ({ selector, html, expectedName }) => {
    const root = render(html)
    const { getComputedStyle } = window
    window.getComputedStyle = elt => getComputedStyle(elt)
    expect(root.querySelector(selector)).toHaveAccessibleName(expectedName)
  })
})
