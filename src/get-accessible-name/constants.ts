import type { ARIARoleDefinitionKey } from 'aria-query'

export const prohibitedRoles = new Set([
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

export const nameFromAuthorOnly = new Set<ARIARoleDefinitionKey>([
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

export const controlRoles = new Set<ARIARoleDefinitionKey>([
  'button',
  'checkbox',
  'combobox',
  'listbox',
  'radio',
  'searchbox',
  'slider',
  'spinbutton',
  'switch',
  'textbox'
])
