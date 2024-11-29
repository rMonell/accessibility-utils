import { describe, it, expect, beforeAll } from 'vitest'

import accessibleNameAssertions from './assertions'
import { makeAssertion, render } from '@/tests/utils'

describe('getAccessibleName', () => {
  beforeAll(() => {
    const { getComputedStyle } = window
    window.getComputedStyle = elt => getComputedStyle(elt)
  })

  describe('Default DOM', () => {
    it.each(accessibleNameAssertions)(`should have $expectedName as accessible name`, ({ selector, html, expectedName }) => {
      const root = render(html)
      expect(root.querySelector(selector)).toHaveAccessibleName(expectedName)
    })
  })

  describe('Custom elements', () => {
    beforeAll(() => {
      customElements.define(
        'app-button',
        class extends HTMLElement {
          constructor() {
            super()
            const shadowRoot = this.attachShadow({ mode: 'open' })
            shadowRoot.innerHTML = `<button data-test><slot>Default content</slot></button>`
          }
        }
      )
    })

    it.each([
      makeAssertion('_', '<app-button data-root>Name</custom-element>', 'Name'),
      makeAssertion('_', '<app-button data-root></custom-element>', 'Default content'),
      makeAssertion('_', '<app-button data-root aria-label="Label"></custom-element>', 'Label'),
      makeAssertion('_', '<app-button data-root aria-label="Label">Name</custom-element>', 'Label')
    ])('should have $expectedName as accessible name', ({ html, expectedName }) => {
      const container = render(html)
      expect(container.querySelector('[data-root]')).toHaveAccessibleName(expectedName)
    })
  })
})
