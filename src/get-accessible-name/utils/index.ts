import { isHtmlElement, joinBy } from '@/utils'

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

/**
 * Normalizes resolved text content by removing trailing/leading spaces and line breaks.
 */
export const parseAccessibleName = (textContent: string) => textContent.trim()

export const getAriaLabel = (el: HTMLElement) => el.getAttribute('aria-label')

export const getTitle = (el: HTMLElement) => el.getAttribute('title')

export const getAuthorIds = (element: Element) => element.getAttribute('aria-labelledby')

export const getTextContent = (el: HTMLElement): string => {
  const elText = getAriaLabel(el) || el.textContent || getTitle(el) || ''
  const before = getComputedStyle(el, ':before').getPropertyValue('content')
  const after = getComputedStyle(el, ':after').getPropertyValue('content')
  return parseAccessibleName([before, elText, after].join(''))
}

export const getLabelledByAccessibleText = (element: HTMLElement, root: Element | Document) => {
  const authorIds = getAuthorIds(element)

  if (!authorIds) {
    return ''
  }

  const authorElements = authorIds.split(' ').reduce<HTMLElement[]>((acc, id) => {
    const el = root.querySelector(`#${id}`)
    if (!el || !isHtmlElement(el)) {
      return acc
    }

    const lastChild = el.querySelector(':nth-last-child(1)')
    const isAccessible = el.childElementCount === 0 ? true : !!lastChild && isHtmlElement(lastChild) && isVisible(lastChild)

    return isAccessible ? [...acc, el] : acc
  }, [])

  return authorElements.length > 0 ? authorElements.map(el => getTextContent(el)).join(' ') : ''
}

export const getControlAccessibleText = (element: HTMLElement, root: Element | Document) => {
  const label: HTMLLabelElement | null = root.querySelector(`label[for="${element.id}"]`)
  return getAriaLabel(element) || (label && getTextContent(label)) || getTitle(element) || element.getAttribute('placeholder') || ''
}

export const getCustomElementAccessibleText = (element: HTMLElement) => {
  const ariaLabel = getAriaLabel(element)
  if (ariaLabel) {
    return ariaLabel
  }

  const slots = element.shadowRoot?.querySelectorAll('slot')

  if (!slots || slots.length === 0) {
    return ''
  }
  return parseAccessibleName(
    joinBy(Array.from(slots), ' ', slot => {
      const assignedNodes = slot.assignedNodes()
      if (assignedNodes.length === 0) {
        return slot.textContent || ''
      }
      return joinBy(assignedNodes, ' ', node => node.textContent || '')
    })
  )
}
