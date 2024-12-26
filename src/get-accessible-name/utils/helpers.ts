import { isHtmlElement, isStringEmpty, joinBy } from '@/utils'

export const isElementVisible = (element: HTMLElement) => {
  const style = getComputedStyle(element)
  return !(
    style.getPropertyValue('display') === 'none' ||
    ['collapse', 'hidden'].includes(style.getPropertyValue('visibility')) ||
    checkBooleanAttr(element, 'aria-hidden') ||
    checkBooleanAttr(element, 'hidden')
  )
}

export const isReferenceAccessible = (element: HTMLElement, root: Element) => {
  if (element.isSameNode(root)) {
    return true
  }
  if (!element.parentElement) {
    return isElementVisible(element)
  }

  const isParentElementVisible = isElementVisible(element.parentElement)

  if (element.parentElement.isEqualNode(root) && !isParentElementVisible) {
    return true
  }
  if (checkBooleanAttr(element, 'aria-hidden') || checkBooleanAttr(element, 'hidden') || element.style.display === 'none') {
    return false
  }
  if (element.style.visibility.length) {
    return !['collapse', 'hidden'].includes(element.style.visibility)
  }
  return isParentElementVisible
}

export const crawlVisibleText = (elements: NodeListOf<ChildNode> | HTMLCollection | Node[], root: Element): string => {
  return joinBy(Array.from(elements), '', child => {
    if (child.nodeType === Node.TEXT_NODE) {
      return child.textContent ? child.textContent : ''
    }
    if (!isHtmlElement(child)) {
      return ''
    }
    if (isReferenceAccessible(child, root)) {
      return child.textContent || ''
    }
    if (child.childElementCount > 0) {
      return crawlVisibleText(child.children, root)
    }
    return ''
  })
}

export const resolveElementText = (el: Element) => {
  if (el.childElementCount === 0) {
    return el.textContent || ''
  }
  return crawlVisibleText(el.childNodes, el)
}

/**
 * Normalizes resolved text content by removing trailing/leading spaces and line breaks.
 */
export const parseAccessibleName = (textContent: string) => {
  const parser = new DOMParser()
  const decodedContent = parser.parseFromString(textContent, 'text/html').body
  return decodedContent.innerHTML
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/&nbsp;/g, '\u00a0')
}

export const getTextContent = (el: Element): string => {
  const elText = getAriaLabel(el) || resolveElementText(el) || getTitle(el) || ''
  if (!isHtmlElement(el)) {
    return parseAccessibleName(elText)
  }
  try {
    const before = getComputedStyle(el, ':before').getPropertyValue('content')
    const after = getComputedStyle(el, ':after').getPropertyValue('content')
    return parseAccessibleName([before, elText, after].join(''))
  } catch {
    return parseAccessibleName(elText)
  }
}

export const getAriaLabel = (el: Element) => getStringAttr(el, 'aria-label')

export const getTitle = (el: Element) => getStringAttr(el, 'title')

/**
 * Wrapper of `window.getComputedStyle` that throw explicit error instead of `console.error` log.
 */
export const getComputedStyle = (element: HTMLElement, pseudoElt?: string | null): CSSStyleDeclaration => {
  const originalError = console.error
  let rejects
  let result: CSSStyleDeclaration

  console.error = (...args) => (rejects = args)

  try {
    result = window.getComputedStyle(element, pseudoElt)
  } finally {
    console.error = originalError
  }
  if (rejects) {
    throw rejects
  }
  return result
}

export const getStringAttr = (el: Element, attr: string) => {
  const value = el.getAttribute(attr)
  if (!value) {
    return undefined
  }
  return isStringEmpty(value) ? undefined : value
}

export const checkBooleanAttr = (el: Element, attr: string) => {
  const hasAttr = el.hasAttribute(attr)
  return hasAttr || (hasAttr && el.getAttribute(attr) === 'true')
}
