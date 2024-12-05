import { ElementRole } from '@/types'

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

export const nameFromAuthorOnly = new Set<ElementRole>([
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

export const controlRoles = new Set<ElementRole>([
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
