import { controlRoles, prohibitedRoles } from '@/get-accessible-name/constants'
import { ElementRole, TagName } from '@/types'

import { isHtmlElement, hasCustomTagName } from '@/utils'
import { GetAccessibleNameOptions } from '@/get-accessible-name/types'
import {
  getAriaLabel,
  getControlAccessibleText,
  getCustomElementAccessibleText,
  getStringAttr,
  getTextContent,
  getTitle,
  isElementVisible,
  parseAccessibleName,
  resolveLabelledByAccessibleText
} from '@/get-accessible-name/utils'
import { resolveElementRole } from '@/resolve-element-role'

const resolveTextContent = (element: HTMLElement | null, root: HTMLElement) => (element ? getTextContent(element) : getTextContent(root))

const accessibleTextFallbackFromRole: { [role in ElementRole]?: (element: HTMLElement) => string } = {
  group: el => {
    if (el.tagName === 'FIELDSET') {
      return resolveTextContent(el.querySelector('legend'), el)
    }
    if (el.tagName === 'DETAILS') {
      return resolveTextContent(el.querySelector('summary'), el)
    }
    if (el.tagName === 'OPTGROUP') {
      return parseAccessibleName(el.getAttribute('label') || '')
    }
    return getTitle(el) || getTextContent(el)
  },
  img: el => {
    const ariaLabel = getAriaLabel(el)
    if (ariaLabel) {
      return parseAccessibleName(ariaLabel)
    }
    if (el.hasAttribute('alt') && !getStringAttr(el, 'alt')) {
      return ''
    }
    return parseAccessibleName(getStringAttr(el, 'alt') || getTitle(el) || '')
  },
  table: el => resolveTextContent(el.querySelector('caption'), el),
  figure: el => resolveTextContent(el.querySelector('figcaption'), el)
}

const accessibleTextFromTagName: { [tagName in TagName]?: (element: HTMLElement) => string } = {
  ABBR: el => getTitle(el) || getTextContent(el)
}

/**
 *
 * Computes the accessible name of an HTML element, strictly following [W3C guidelines](https://www.w3.org/TR/accname-1.2/) to ensure accurate results.
 *
 * @see {@link https://www.w3.org/TR/accname-1.2/}
 * @see {@link https://www.w3.org/TR/wai-aria-1.2/}
 * @see {@link https://www.w3.org/TR/html-aam/}
 */
export const getAccessibleName = (element: Element, options?: GetAccessibleNameOptions): string => {
  if (!isHtmlElement(element)) {
    return getTextContent(element)
  }
  if (!options?.ignoreHiddenElements && !isElementVisible(element)) {
    return ''
  }
  if (hasCustomTagName(element.tagName)) {
    return getCustomElementAccessibleText(element)
  }
  const resolvedRole = resolveElementRole(element)
  if (!resolvedRole) {
    return accessibleTextFromTagName[element.tagName]?.(element) || getTextContent(element)
  }
  if (prohibitedRoles.has(resolvedRole)) {
    return ''
  }
  const labelledBy = getStringAttr(element, 'aria-labelledby')
  if (labelledBy) {
    return resolveLabelledByAccessibleText(labelledBy, element)
  }
  if (controlRoles.has(resolvedRole) && (resolvedRole === 'button' ? element.tagName === 'INPUT' : true)) {
    return getControlAccessibleText(element)
  }
  if (resolvedRole in accessibleTextFallbackFromRole) {
    return accessibleTextFallbackFromRole[resolvedRole]?.(element) || ''
  }
  return getTextContent(element)
}
