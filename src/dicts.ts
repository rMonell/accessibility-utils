import { mapFromArray } from './utils'

import type { ARIARoleDefinitionKey } from 'aria-query'

export const prohibitedRoles = mapFromArray<ARIARoleDefinitionKey>([
  'none',
  'presentation',
  'generic'
])

export const nameFromContentsOnly = mapFromArray<ARIARoleDefinitionKey>([
  'alert',
  'blockquote',
  'caption',
  'code',
  'deletion',
  'emphasis',
  'figure',
  'generic',
  'insertion',
  'paragraph',
  'presentation',
  'strong',
  'subscript',
  'superscript',
  'time'
])

export const nameFromAuthorOnly = mapFromArray<ARIARoleDefinitionKey>([
  'application',
  'article',
  'cell',
  'columnheader',
  'definition',
  'directory',
  'document',
  'feed',
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
  'timer',
  'toolbar',
  'tooltip',
  'tree',
  'treegrid'
])

export const controlRoles = mapFromArray<ARIARoleDefinitionKey>([
  'textbox',
  'combobox',
  'checkbox',
  'radio',
  'switch',
  'listbox',
  'range'
])
