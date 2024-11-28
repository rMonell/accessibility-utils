import { elementRoles as _elementRoles, ARIARoleDefinitionKey, roleElements } from 'aria-query'
import { isUndefined } from '.'

const roleBySelectors = Array.from(roleElements.entries() || []).reduce(
  (acc, [role, roleRelationConcept]) => {
    const selectors = Array.from(roleRelationConcept).reduce((acc, { name, attributes }) => {
      const attrSelectors = (attributes || [])?.reduce<string[]>((acc, attr) => {
        if (attr.constraints?.some(c => (c as string) === 'undefined')) {
          return acc
        }
        return [
          ...acc,
          isUndefined(attr.value)
            ? `[${attr.name}]`
            : `[${attr.name}=${JSON.stringify(attr.value)}]`
        ]
      }, [])

      if (acc) {
        acc += ','
      }

      return `${acc} ${name}${attrSelectors.join('')}`.trim()
    }, '')

    return { ...acc, [selectors]: role }
  },
  {} as Record<string, ARIARoleDefinitionKey>
)

export const getElementRoles = (element: HTMLElement) => {
  const explicitRole = element.getAttribute('role')

  if (explicitRole) {
    return [explicitRole as ARIARoleDefinitionKey]
  }

  return Object.keys(roleBySelectors).reduce<ARIARoleDefinitionKey[]>(
    (acc, selectors) => (element.matches(selectors) ? [...acc, roleBySelectors[selectors]] : acc),
    []
  )
}
