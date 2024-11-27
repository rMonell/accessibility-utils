import { controlRoles, nameFromAuthorOnly, prohibitedRoles } from './constants'

import type { ARIARoleDefinitionKey } from 'aria-query'

import {
  getAuthorIds,
  getElementRoles,
  getTextContent,
  hasRole,
  isHtmlElement,
  isVisible
} from './utils'
import { GetAccessibleNameOptions } from './types'
import { getLabelledByAccessibleText } from './utils/get-labelled-by-accessible-text'

const authorTextFromRole: { [role in ARIARoleDefinitionKey]?: (element: HTMLElement) => string } = {
  group: el => {
    if (el.tagName === 'FIELDSET') {
      const legendEl = el.querySelector('legend')
      return legendEl ? getTextContent(legendEl) : ''
    }
    if (el.tagName === 'DETAILS') {
      const legendEl = el.querySelector('summary')
      return legendEl ? getTextContent(legendEl) : ''
    }
    return getTextContent(el)
  },
  img: el => getTextContent(el, el.getAttribute('alt')),
  table: el => {
    const captionEl = el.querySelector('caption')
    return captionEl ? getTextContent(captionEl) : ''
  },
  figure: el => {
    const captionEl = el.querySelector('figcaption')
    return captionEl ? getTextContent(captionEl) : ''
  }
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
    const label: HTMLLabelElement | null = root.querySelector(`label[for="${element.id}"]`)
    return label ? getTextContent(label) : ''
  }

  if (hasRole(elementRoles, nameFromAuthorOnly) || !!getAuthorIds(element)) {
    return (
      authorTextFromRole[elementRoles[0]]?.(element) || getLabelledByAccessibleText(element, root)
    )
  }

  return getTextContent(element)
}
