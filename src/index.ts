import { controlRoles, nameFromAuthorOnly, prohibitedRoles } from './constants'

import type { ARIARoleDefinitionKey } from 'aria-query'

import {
  getAuthorIds,
  getElementRoles,
  getTextContent,
  hasRole,
  isHtmlElement,
  isVisible,
  parseAccessibleName
} from './utils'
import { GetAccessibleNameOptions } from './types'
import { getLabelledByAccessibleText } from './utils/get-labelled-by-accessible-text'

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

  const elementRoles = getElementRoles(element)

  if (elementRoles.length === 0 || hasRole(elementRoles, prohibitedRoles)) {
    return ''
  }

  const root = options?.root || document

  if (hasRole(elementRoles, controlRoles)) {
    return resolveTextContent(root.querySelector(`label[for="${element.id}"]`))
  }

  if (hasRole(elementRoles, nameFromAuthorOnly) || !!getAuthorIds(element)) {
    return (
      authorTextFromRole[elementRoles[0]]?.(element) || getLabelledByAccessibleText(element, root)
    )
  }

  return getTextContent(element)
}
