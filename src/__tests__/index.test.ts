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
    makeTestAssert(
      'input',
      `
      <label class="label-class" for="field">
        Field label
        <input id="field" name="field-name" type="text" />
      </label>
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
    ),
    /**
     * Tab
     */
    makeTestAssert(
      '[aria-labelledby="tab-2"]',
      `
      <div>
        <div>
          <button id="tab-1" role="tab">Tab 1</button>
          <button id="tab-2" role="tab">Tab 2</button>
        </div>
        <div>
          <div aria-labelledby="tab-1" role="tabpanel">Tab panel 1</div>
          <div aria-labelledby="tab-2" role="tabpanel">Tab panel 2</div>
        </div>
        <label for="field">Field label</label>
        <input id="field" />
      </div>
      `,
      'Tab 2'
    ),
    /**
     * Table
     */
    makeTestAssert(
      'table',
      `
      <table>
        <caption>
          Front-end web developer course 2021
        </caption>
        <thead>
          <tr>
            <th scope="col">Person</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Chris</th>
          </tr>
        </tbody>
      </table>
      `,
      'Front-end web developer course 2021'
    ),
    makeTestAssert(
      '[aria-labelledby="age"]',
      `
      <table>
        <caption>
          Front-end web developer course 2021
        </caption>
        <thead>
          <tr>
            <th scope="col" id="person">Person</th>
            <th scope="col" id="most-interest-in">Most interest in</th>
            <th scope="col" id="age">Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th aria-labelledby="person">Chris</th>
            <td aria-labelledby="most-interest-in">HTML tables</td>
            <td aria-labelledby="age">22</td>
          </tr>
        </tbody>
      </table>
      `,
      'Age'
    ),
    /**
     * Image & figure
     */
    makeTestAssert(
      'figure',
      `
      <figure>
        <img src="/media/cc0-images/elephant-660-480.jpg" alt="Elephant at sunset" />
        <figcaption>An elephant at sunset</figcaption>
      </figure>
      `,
      'An elephant at sunset'
    )
  ])(`should have $expectedName as accessible name`, ({ selector, html, expectedName }) => {
    const root = render(html)
    const target = root.querySelector(selector)

    if (!target) {
      throw 'Error'
    }
    expect(getAccessibleName(target)).toBe(expectedName)
  })
})
