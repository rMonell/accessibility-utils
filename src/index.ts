import { controlRoles, nameFromAuthorOnly, prohibitedRoles } from './constants'

import type { ARIARoleDefinitionKey } from 'aria-query'

import {
  getAuthorIds,
  getControlAccessibleText,
  getElementMatchedRoles,
  getLabelledByAccessibleText,
  getTextContent,
  containKeys,
  isHtmlElement,
  isVisible,
  parseAccessibleName
} from './utils'
import { GetAccessibleNameOptions } from './types'

const resolveTextContent = (element: HTMLElement | null) => (element ? getTextContent(element) : '')

const authorTextFromRole: { [role in ARIARoleDefinitionKey]?: (element: HTMLElement) => string } = {
  group: el => {
    if (el.tagName === 'FIELDSET') {
      return resolveTextContent(el.querySelector('legend'))
    }
    if (el.tagName === 'DETAILS') {
      return resolveTextContent(el.querySelector('summary'))
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

  const matchedRoles = getElementMatchedRoles(element)

  if (matchedRoles.length === 0 || containKeys(prohibitedRoles, matchedRoles)) {
    return ''
  }

  const root = options?.root || document

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
