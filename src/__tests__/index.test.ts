import { describe, it, expect } from 'vitest'
import { getAccessibleName } from '..'

const render = (html: string) => {
  document.body.innerHTML = html
  return document
}

const makeTestAssert = (selector: string, html: string, expectedName: string) => ({
  selector,
  html,
  expectedName
})

describe('getAccessibleName', () => {
  it.only('__', () => {
    const root = render('<button>Label</button>')
    const target = root.querySelector('button')
    if (!target) {
      throw 'Error'
    }
    getAccessibleName(target)
  })
  it.each([
    /**
     * Button
     */
    makeTestAssert('button', '<button>Label</button>', 'Label'),
    makeTestAssert('button', '<button aria-label="Custom label">Label</button>', 'Custom label'),
    /**
     * Input & controls
     */
    makeTestAssert(
      'input',
      `
      <div>
        <label for="field">Field label</label>
        <input id="field" />
      </div>
      `,
      'Field label'
    ),
    /**
     * Group
     */
    makeTestAssert(
      'fieldset',
      `
      <fieldset>
        <legend>Label</legend>
      </fieldset>
      `,
      'Label'
    )
  ])(`should have $expectedName accessible name`, ({ selector, html, expectedName }) => {
    const root = render(html)
    const target = root.querySelector(selector)

    if (!target) {
      throw 'Error'
    }
    expect(getAccessibleName(target)).toBe(expectedName)
  })
})
