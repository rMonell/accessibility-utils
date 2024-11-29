import { controlRoles, nameFromAuthorOnly, prohibitedRoles } from './constants'

import type { ARIARoleDefinitionKey } from 'aria-query'

import { containKeys, isHtmlElement, hasCustomTagName } from '../utils'
import { GetAccessibleNameOptions } from './types'
import {
  getAuthorIds,
  getControlAccessibleText,
  getCustomElementAccessibleText,
  getLabelledByAccessibleText,
  getTextContent,
  isVisible,
  parseAccessibleName
} from './utils'
import { getElementMatchedRoles } from '../get-element-matched-roles'

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

  const matchedRoles = getElementMatchedRoles(element)

  if (matchedRoles.length === 0 || containKeys(prohibitedRoles, matchedRoles)) {
    return ''
  }

  const root = options?.window?.document || document

  if (getAuthorIds(element)) {
    return getLabelledByAccessibleText(element, root)
  }
  if (containKeys(controlRoles, matchedRoles)) {
    return getControlAccessibleText(element, root)
  }
  if (containKeys(nameFromAuthorOnly, matchedRoles)) {
    return authorTextFromRole[matchedRoles[0]]?.(element) || ''
  }

  return getTextContent(element)
}
