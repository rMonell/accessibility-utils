import { controlRoles, nameFromAuthorOnly, prohibitedRoles } from '@/get-accessible-name/constants'

import type { ARIARoleDefinitionKey } from 'aria-query'

import { isHtmlElement, hasCustomTagName } from '@/utils'
import { GetAccessibleNameOptions } from '@/get-accessible-name/types'
import {
  getAuthorIds,
  getControlAccessibleText,
  getCustomElementAccessibleText,
  getLabelledByAccessibleText,
  getTextContent,
  isVisible,
  parseAccessibleName
} from '@/get-accessible-name/utils'
import { resolveElementRole } from '@/resolve-element-role'

const resolveTextContent = (element: HTMLElement | null) => (element ? getTextContent(element) : '')

const authorTextFromRole: { [role in ARIARoleDefinitionKey]?: (element: HTMLElement) => string } = {
  group: el => {
    if (el.tagName === 'FIELDSET') {
      return resolveTextContent(el.querySelector('legend'))
    }
    if (el.tagName === 'DETAILS') {
      return resolveTextContent(el.querySelector('summary'))
    }
    if (el.tagName === 'OPTGROUP') {
      return parseAccessibleName(el.getAttribute('label') || '')
    }
    return ''
  },
  img: el => parseAccessibleName(el.getAttribute('alt') || ''),
  table: el => resolveTextContent(el.querySelector('caption')),
  figure: el => resolveTextContent(el.querySelector('figcaption'))
}

/**
 *
 * Implementation of [W3C](https://www.w3.org/) accessible name computation.
 *
 *
 * Sources :
 *
 * @see {@link https://www.w3.org/TR/accname-1.2/}
 * @see {@link https://www.w3.org/TR/wai-aria-1.2/}
 * @see {@link https://www.w3.org/TR/html-aam/}
 */
export const getAccessibleName = (element: Node, options?: GetAccessibleNameOptions): string => {
  if (!isHtmlElement(element) || (!options?.targetHidden && !isVisible(element))) {
    return ''
  }

  if (hasCustomTagName(element.tagName)) {
    return getCustomElementAccessibleText(element)
  }

  const resolvedRole = resolveElementRole(element)

  if (!resolvedRole || prohibitedRoles.has(resolvedRole)) {
    return ''
  }

  const root = options?.window?.document || document

  if (getAuthorIds(element)) {
    return getLabelledByAccessibleText(element, root)
  }
  if (controlRoles.has(resolvedRole)) {
    return getControlAccessibleText(element, root)
  }
  if (nameFromAuthorOnly.has(resolvedRole)) {
    return authorTextFromRole[resolvedRole]?.(element) || ''
  }
  return getTextContent(element)
}
