import { resolveElementRole } from '@/resolve-element-role'
import { ElementRole } from '@/types'
import { isHtmlElement, joinBy } from '@/utils'

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
 * Implements [step 2A](https://www.w3.org/TR/accname-1.2/#computation-steps) computation step.
 */
export const isVisible = (element: HTMLElement, options?: { ignoreInheritedParentVisibility?: boolean }) => {
  const style = getComputedStyle(element)
  const display = style.getPropertyValue('display')
  const ariaHidden = element.getAttribute('aria-hidden')
  const visibility = options?.ignoreInheritedParentVisibility ? element.style.visibility : style.getPropertyValue('visibility')

  if ((!!display && display === 'none') || (!!visibility && ['collapse', 'hidden'].includes(visibility)) || (!!ariaHidden && ariaHidden === 'true')) {
    return false
  }
  return true
}

/**
 * Normalizes resolved text content by removing trailing/leading spaces and line breaks.
 */
export const parseAccessibleName = (textContent: string) => {
  return textContent
    .trim()
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s+/g, ' ')
}

export const getAriaLabel = (el: HTMLElement) => el.getAttribute('aria-label')

export const getTitle = (el: HTMLElement) => el.getAttribute('title')

export const getAuthorIds = (element: Element) => element.getAttribute('aria-labelledby')

export const getTextContent = (el: HTMLElement): string => {
  const elText = getAriaLabel(el) || el.textContent || getTitle(el) || ''
  try {
    const before = getComputedStyle(el, ':before').getPropertyValue('content')
    const after = getComputedStyle(el, ':after').getPropertyValue('content')
    return parseAccessibleName([before, elText, after].join(''))
  } catch {
    return parseAccessibleName(elText)
  }
}

export const getLabelledByAccessibleText = (element: HTMLElement) => {
  const authorIds = getAuthorIds(element)

  if (!authorIds) {
    return ''
  }

  return joinBy(authorIds.split(' '), ' ', id => {
    const el = document.querySelector(`#${id}`)
    if (!el || !isHtmlElement(el)) {
      return false
    }
    const overrideAttrs = getAriaLabel(el) || getTitle(el)

    if (overrideAttrs) {
      return overrideAttrs
    }
    if (el.childElementCount === 0) {
      return getTextContent(el)
    }

    return parseAccessibleName(
      joinBy(Array.from(el.childNodes), ' ', children => {
        if (children.nodeType === Node.TEXT_NODE) {
          return children.textContent ? parseAccessibleName(children.textContent) : ''
        }
        return isHtmlElement(children) && isVisible(children, { ignoreInheritedParentVisibility: true }) ? getTextContent(children) || '' : false
      })
    )
  })
}

const textContentGetterByControlRole: Partial<Record<ElementRole, (el: HTMLInputElement) => string | null | undefined>> = {
  textbox: el => el.value,
  combobox: el => el.value || el.textContent,
  listbox: el => el.value || el.querySelector('[aria-selected]')?.textContent,
  slider: el => el.value || el.getAttribute('aria-valuetext') || el.getAttribute('aria-valuenow'),
  spinbutton: el => el.value || el.getAttribute('aria-valuetext') || el.getAttribute('aria-valuenow')
}

export const getControlAccessibleText = (element: HTMLElement) => {
  const label: HTMLLabelElement | null = document.querySelector(`label[for="${element.id}"]`)
  const specificLabel = getAriaLabel(element) || (label && getTextContent(label)) || getTitle(element) || element.getAttribute('placeholder') || ''

  if (specificLabel) {
    return specificLabel
  }

  const parentLabel = element.parentElement?.tagName === 'LABEL' ? element.parentElement : null

  if (!parentLabel) {
    return ''
  }

  return parseAccessibleName(
    joinBy(Array.from(parentLabel.childNodes), ' ', child => {
      if (child.nodeType === Node.TEXT_NODE) {
        return child.textContent ? parseAccessibleName(child.textContent) : ''
      }
      if (!isHtmlElement(child)) {
        return ''
      }
      const childRole = resolveElementRole(child)
      if (!childRole) {
        return ''
      }
      return textContentGetterByControlRole[childRole]?.(child as HTMLInputElement) || ''
    })
  )
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
