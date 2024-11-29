import { makeAssertion } from '../../tests/utils'

export default [
  makeAssertion(
    'fieldset',
    `
    <fieldset>
      <legend>Label</legend>
    </fieldset>
    `,
    'Label'
  ),
  makeAssertion(
    'details',
    `
    <details>
      <summary>Details</summary>
      Something small enough to escape casual notice.
    </details>
    `,
    'Details'
  ),
  makeAssertion('div', '<div role="banner">Welcome</div>', 'Welcome'),
  makeAssertion(
    'optgroup',
    `
    <optgroup label="Group name" disabled>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </optgroup>
    `,
    'Group name'
  )
]
