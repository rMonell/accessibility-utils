import { makeAssertion } from '@/tests/utils'

export default [
  makeAssertion(
    'input',
    `
    <div>
      <label for="field">Field label</label>
      <input id="field" />
    </div>
    `,
    'Field label'
  ),
  makeAssertion(
    'input',
    `
    <div>
      <label for="field">Field label</label>
      <input id="field" aria-label="Custom label" />
    </div>
    `,
    'Custom label'
  ),
  makeAssertion('input', '<input placeholder="Placeholder" />', 'Placeholder'),
  makeAssertion('input', '<input title="Title" placeholder="Placeholder" />', 'Title'),
  makeAssertion(
    'input',
    `
    <label class="label-class" for="field">
      Field label
      <input id="field" name="field-name" type="text" />
    </label>
    `,
    'Field label'
  ),
  makeAssertion(
    'input',
    `
    <div id="label">Username</div>
    <input type="text" aria-labelledby="label" aria-label="User" />
    `,
    'Username'
  ),
  makeAssertion(
    'input[type="file"]',
    `
    <input type="file" aria-label="Upload a file">
    `,
    'Upload a file'
  ),
  makeAssertion(
    'input[type="checkbox"]',
    `
    <input type="checkbox" aria-label="Accept terms and conditions">
    `,
    'Accept terms and conditions'
  ),
  makeAssertion(
    'input',
    `
    <label for="password">Password</label>
    <input type="password" id="password" />
    `,
    'Password'
  ),
  makeAssertion(
    'input[type="range"]',
    `
    <div id="slider-label">Volume control</div>
    <input type="range" aria-labelledby="slider-label">
    `,
    'Volume control'
  ),
  makeAssertion(
    'input[type="date"]',
    `
    <label for="birthdate">Date of Birth</label>
    <input type="date" id="birthdate">
    `,
    'Date of Birth'
  ),
  makeAssertion(
    'input[type="search"]',
    `
    <input type="search" aria-label="Search an item" placeholder="Search...">
    `,
    'Search an item'
  ),
  makeAssertion(
    'input',
    `
    <label for="input">Submit the form</label>
    <input type="submit" id="input">
    `,
    'Submit the form'
  )
]
