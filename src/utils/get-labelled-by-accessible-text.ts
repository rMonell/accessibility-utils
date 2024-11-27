import { getAuthorIds, getTextContent, isHtmlElement, isVisible } from '.'
import { GetAccessibleNameOptions } from '../types'

export const getLabelledByAccessibleText = (
  element: HTMLElement,
  options?: GetAccessibleNameOptions
) => {
  const authorIds = getAuthorIds(element)

  if (!authorIds) {
    return ''
  }

  const root = options?.root || element.ownerDocument
  const authorElements = authorIds.split(' ').reduce<HTMLElement[]>((acc, id) => {
    const el = root.querySelector(`#${id}`)
    if (!el || !isHtmlElement(el)) {
      return acc
    }

    const lastChild = el.querySelector(':nth-last-child(1)')
    const isAccessible =
      el.childElementCount === 0
        ? true
        : !!lastChild && isHtmlElement(lastChild) && isVisible(lastChild)

    return isAccessible ? [...acc, el] : acc
  }, [])

  return authorElements.length > 0 ? authorElements.map(el => getTextContent(el)).join(' ') : ''
}
