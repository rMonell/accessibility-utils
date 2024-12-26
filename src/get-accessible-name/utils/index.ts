import { getAriaLabel, getTextContent, getTitle, parseAccessibleName, resolveElementText } from '@/get-accessible-name/utils/helpers'
import { resolveElementRole } from '@/resolve-element-role'
import { ElementRole } from '@/types'
import { isStringEmpty, joinBy } from '@/utils'

export * from './helpers'

export const resolveLabelledByAccessibleText = (labelledBy: string, root: HTMLElement) => {
  const referencedText = joinBy(labelledBy.split(' '), ' ', id => {
    const el = document.querySelector(`#${id}`)
    return el ? getAriaLabel(el) || resolveElementText(el) : false
  })
  return isStringEmpty(referencedText) ? parseAccessibleName(getAriaLabel(root) || getTitle(root) || '') : parseAccessibleName(referencedText)
}

const textContentByRole: Partial<Record<ElementRole, (el: HTMLInputElement) => string | null | undefined>> = {
  textbox: el => el.value,
  button: el => (el.type === 'image' ? el.getAttribute('alt') : el.value),
  img: el => el.getAttribute('alt'),
  combobox: el => el.value || el.textContent,
  listbox: el => el.value || el.querySelector('[aria-selected]')?.textContent,
  slider: el => el.value || el.getAttribute('aria-valuetext') || el.getAttribute('aria-valuenow'),
  spinbutton: el => el.value || el.getAttribute('aria-valuetext') || el.getAttribute('aria-valuenow')
}

export const getControlAccessibleText = (element: HTMLElement) => {
  const ariaLabel = getAriaLabel(element)
  if (ariaLabel) {
    return parseAccessibleName(ariaLabel)
  }

  const labelEls: NodeListOf<HTMLLabelElement> = document.querySelectorAll(`label[for="${element.id}"]`)
  if (labelEls.length > 0) {
    return joinBy(Array.from(labelEls), ' ', getTextContent)
  }

  const fallbackLabel = getTitle(element) || element.getAttribute('placeholder') || ''
  if (fallbackLabel) {
    return parseAccessibleName(fallbackLabel)
  }

  const wrapperLabel = element.parentElement?.tagName === 'LABEL' ? element.parentElement : null

  if (!wrapperLabel) {
    return textContentByRole[resolveElementRole(element) as ElementRole]?.(element as HTMLInputElement) || ''
  }

  return parseAccessibleName(
    joinBy(Array.from(wrapperLabel.childNodes), ' ', child => {
      if (child.nodeType === Node.TEXT_NODE) {
        return child.textContent || ''
      }
      const childRole = resolveElementRole(child)
      if (!childRole || wrapperLabel.firstElementChild?.isEqualNode(child)) {
        return ''
      }
      return textContentByRole[childRole]?.(child as HTMLInputElement) || ''
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
