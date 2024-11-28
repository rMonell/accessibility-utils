import { mapFromArray } from './utils'

import type { ARIARoleDefinitionKey } from 'aria-query'

export const prohibitedRoles = mapFromArray<ARIARoleDefinitionKey>([
  'caption',
  'code',
  'deletion',
  'emphasis',
  'generic',
  'insertion',
  'none',
  'paragraph',
  'presentation',
  'strong',
  'subscript',
  'superscript'
])

export const nameFromAuthorOnly = mapFromArray<ARIARoleDefinitionKey>([
  'alert',
  'application',
  'article',
  'blockquote',
  'definition',
  'directory',
  'document',
  'feed',
  'figure',
  'grid',
  'group',
  'img',
  'list',
  'log',
  'main',
  'marquee',
  'math',
  'navigation',
  'note',
  'region',
  'rowgroup',
  'separator',
  'status',
  'table',
  'tabpanel',
  'term',
  'textbox',
  'time',
  'timer',
  'toolbar',
  'tree',
  'treegrid'
])

export const controlRoles = mapFromArray<ARIARoleDefinitionKey>([
  'checkbox',
  'combobox',
  'listbox',
  'radio',
  'range',
  'switch',
  'textbox'
])
