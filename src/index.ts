import { controlRoles, nameFromAuthorOnly, nameFromContentsOnly, prohibitedRoles } from './dicts'

import type { ARIARoleDefinitionKey } from 'aria-query'

import { getElementRoles, getTextContent, hasRole, isHtmlElement, isVisible } from './utils'
import { GetAccessibleNameOptions } from './types'
import { getLabelledByAccessibleText } from './utils/get-labelled-by-accessible-text'

const authorTextFromRole: Map<ARIARoleDefinitionKey, (element: HTMLElement) => string> = new Map([
  [
    'group',
    el => {
      const legendEl = el.querySelector('legend')
      return legendEl ? getTextContent(legendEl) : ''
    }
  ],
  ['img', el => getTextContent(el, el.getAttribute('alt'))]
])

const isDefinedByAuthor = (element: Element) => !!element.getAttribute('aria-labelledby')

export const getAccessibleName = (element: Node, options?: GetAccessibleNameOptions): string => {
  if (!isHtmlElement(element) || (!options?.targetHidden && !isVisible(element))) {
    return ''
  }

  const elementRoles = getElementRoles(element)

  if (elementRoles.length === 0 || hasRole(elementRoles, prohibitedRoles)) {
    return ''
  }

  if (hasRole(elementRoles, controlRoles)) {
    const label: HTMLLabelElement | null = (options?.root || document).querySelector(
      `label[for="${element.id}"]`
    )
    return label ? getTextContent(label) : ''
  }

  if (hasRole(elementRoles, nameFromContentsOnly)) {
    return getTextContent(element)
  }

  if (hasRole(elementRoles, nameFromAuthorOnly) || isDefinedByAuthor(element)) {
    return (
      authorTextFromRole.get(elementRoles[0])?.(element) ||
      getLabelledByAccessibleText(element, options)
    )
  }

  return getTextContent(element)
}
