import { makeAssertion } from '../utils'

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
  makeAssertion(
    'div',
    `
     <div role="banner">Welcome</div>
    `,
    'Welcome'
  )
]
