import { makeAssertion } from '@/get-accessible-name/__tests__/utils'

export default [
  makeAssertion('button', '<button>Label</button>', 'Label'),
  makeAssertion('button', '<button aria-label="Custom label">Label</button>', 'Custom label'),
  makeAssertion('div', '<div role="button">Label</div>', 'Label')
]
