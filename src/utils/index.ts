import type { ARIARoleDefinitionKey } from 'aria-query'

export * from './get-element-roles'

export const mapFromArray = <TArray>(arr: TArray[]): Map<TArray, number> => {
  return new Map(arr.map((e, i) => [e, i]))
}

export const hasRole = (
  elementRoles: ARIARoleDefinitionKey[],
  list: Map<ARIARoleDefinitionKey, number>
) => elementRoles.some(role => list.has(role))

export const getTextContent = (element: HTMLElement, defaultValue?: string | null): string => {
  const textContent =
    (element.getAttribute('aria-label') || element.textContent)?.trim() ||
    defaultValue ||
    element.getAttribute('title') ||
    ''

  // if (options.computedStyle) {
  //   const before = window
  //     .getComputedStyle(element, ":before")
  //     .getPropertyValue("content");
  //   const after = window
  //     .getComputedStyle(element, ":before")
  //     .getPropertyValue("content");
  //   return [before, textContent, after].join("");
  // }

  return textContent
}

export const isVisible = (element: HTMLElement) => {
  const style = window.getComputedStyle(element)
  return (
    style.getPropertyValue('display') !== 'none' ||
    style.getPropertyValue('visibility') !== 'hidden' ||
    (!!element.getAttribute('aria-hidden') && element.getAttribute('aria-hidden') === 'true')
  )
}

export const getAuthorIds = (element: Element) => element.getAttribute('aria-labelledby')

export const isHtmlElement = (element: Node): element is HTMLElement => {
  return element instanceof HTMLElement
}
