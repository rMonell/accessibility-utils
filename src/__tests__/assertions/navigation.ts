import { makeAssertion } from '../../tests/utils'

export default [
  makeAssertion(
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
  )
]
