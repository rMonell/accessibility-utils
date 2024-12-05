import { describe, it, expect } from 'vitest'
import { ElementRole } from '@/types'

import { render } from '@/tests/utils'

import { resolveElementRole } from '@/resolve-element-role'

const makeAssertion = (html: string, expectedRole: ElementRole) => {
  return { html, expectedRole }
}

describe('resolveElementRole', () => {
  it.each([
    /**
     * Button & controls
     */
    makeAssertion('<button>Name</button>', 'button'),
    makeAssertion('<div role="button">Name</div>', 'button'),
    makeAssertion('<input />', 'textbox'),
    makeAssertion('<input type="text" />', 'textbox'),
    makeAssertion('<input type="search" />', 'searchbox'),
    makeAssertion('<input type="radio" />', 'radio'),
    makeAssertion('<select><option value="option-1">Option 1</option></select>', 'select'),
    makeAssertion('<input type="checkbox" />', 'checkbox'),
    /**
     * Generics
     */
    makeAssertion('<input />', 'generic'),
    makeAssertion('<div><app-button>Name</custom-element></div>', 'generic'),
    /**
     * Table
     */
    makeAssertion('<table></table>', 'table'),
    /**
     * Lists
     */
    makeAssertion('<ul><li>List item</li></ul>', 'list'),
    makeAssertion('<li>List item</li>', 'listitem'),
    /**
     * Others
     */
    makeAssertion('<div role="tab">Tab 1</div>', 'tab'),
    makeAssertion('<hr />', 'separator')
  ])('should have $expectedRole role', ({ html, expectedRole }) => {
    expect(render(html).body.firstChild).toHaveRole(expectedRole)
  })

  it.each(['Raw text', '<custom-element />'])('should not have resolved role', html => {
    expect(resolveElementRole(render(html).body.firstChild as Element)).toBeUndefined()
  })
})
