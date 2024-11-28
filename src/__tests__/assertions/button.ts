import { makeAssertion } from '../utils'

export default [
  makeAssertion('button', '<button>Label</button>', 'Label'),
  makeAssertion('button', '<button aria-label="Custom label">Label</button>', 'Custom label')
]
