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
  'cell',
  'columnheader',
  'definition',
  'directory',
  'document',
  'feed',
  'figure',
  'grid',
  'gridcell',
  'group',
  'heading',
  'img',
  'list',
  'listitem',
  'log',
  'main',
  'marquee',
  'math',
  'navigation',
  'note',
  'region',
  'row',
  'rowgroup',
  'rowheader',
  'separator',
  'status',
  'table',
  'tabpanel',
  'term',
  'textbox',
  'time',
  'timer',
  'toolbar',
  'tooltip',
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
