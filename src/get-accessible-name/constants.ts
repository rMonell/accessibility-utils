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
