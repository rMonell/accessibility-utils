export const isUndefined = <TValue>(value?: TValue): value is undefined => {
  return typeof value === 'undefined'
}

export const isHtmlElement = (element: Node): element is HTMLElement => {
  return element instanceof HTMLElement
}

/**
 * Implements [step 2A](https://www.w3.org/TR/accname-1.2/#computation-steps) computation step.
 */
export const isVisible = (element: HTMLElement) => {
  const style = window.getComputedStyle(element)

  return (
    style.getPropertyValue('display') !== 'none' ||
    style.getPropertyValue('visibility') !== 'hidden' ||
    (!!element.getAttribute('aria-hidden') && element.getAttribute('aria-hidden') === 'true')
  )
}

/**
 * Check if at least one item match the of an iterable.
 */
export const containKeys = <TItem, TMapValue>(
  iterable: Set<TItem> | Map<TItem, TMapValue>,
  items: TItem[]
) => (items.length === 1 ? iterable.has(items[0]) : items.some(item => iterable.has(item)))

/**
 * Wrapper of `window.getComputedStyle` that throw explicit error instead of `console.error` log.
 */
export const getComputedStyle = (
  element: HTMLElement,
  pseudoElt?: string | null
): CSSStyleDeclaration => {
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

/**
 * Normalizes resolved text content by removing trailing/leading spaces and line breaks.
 */
export const parseAccessibleName = (textContent: string) => textContent.trim()

export const getAriaLabel = (el: HTMLElement) => el.getAttribute('aria-label')

export const getAuthorIds = (element: Element) => element.getAttribute('aria-labelledby')

export const getTextContent = (el: HTMLElement): string => {
  const elText = getAriaLabel(el) || el.textContent || el.getAttribute('title') || ''
  const before = getComputedStyle(el, ':before').getPropertyValue('content')
  const after = getComputedStyle(el, ':after').getPropertyValue('content')

  return parseAccessibleName([before, elText, after].join(''))
}

export const getControlAccessibleText = (element: HTMLElement, root: Element | Document) => {
  const label: HTMLLabelElement | null = root.querySelector(`label[for="${element.id}"]`)
  return getAriaLabel(element) || (label && getTextContent(label)) || ''
}

export * from './get-element-matched-roles'
export * from './get-labelled-by-accessible-text'
