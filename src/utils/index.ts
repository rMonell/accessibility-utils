import type { ARIARoleDefinitionKey } from 'aria-query'

export const isUndefined = <TValue>(value?: TValue): value is undefined => {
  return typeof value === 'undefined'
}

export const mapFromArray = <TArray>(arr: TArray[]): Map<TArray, number> => {
  return new Map(arr.map((e, i) => [e, i]))
}

export const hasRole = (
  elementRoles: ARIARoleDefinitionKey[],
  list: Map<ARIARoleDefinitionKey, number>
) => {
  if (elementRoles.length === 1) {
    return list.has(elementRoles[0])
  }
  return elementRoles.some(role => list.has(role))
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

export const isHtmlElement = (element: Node): element is HTMLElement => {
  return element instanceof HTMLElement
}

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

export const getTextContent = (el: HTMLElement): string => {
  const elText = el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || ''
  const before = getComputedStyle(el, ':before').getPropertyValue('content')
  const after = getComputedStyle(el, ':after').getPropertyValue('content')

  return parseAccessibleName([before, elText, after].join(''))
}

export const getAuthorIds = (element: Element) => element.getAttribute('aria-labelledby')

export * from './get-element-roles'
