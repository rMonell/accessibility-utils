import { makeAssertion } from '../../tests/utils'

export default [
  makeAssertion(
    'figure',
    `
    <figure>
      <img src="/media/cc0-images/elephant-660-480.jpg" alt="Elephant at sunset" />
      <figcaption>An elephant at sunset</figcaption>
    </figure>
    `,
    'An elephant at sunset'
  ),
  makeAssertion(
    'img',
    `
    <div>
      <img src="/media/cc0-images/elephant-660-480.jpg" alt="Elephant at sunset" />
    </div>
    `,
    'Elephant at sunset'
  ),
  makeAssertion(
    'img',
    `
    <img id="decorative" role="presentation" alt="Image">
    `,
    ''
  )
]
