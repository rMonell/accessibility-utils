import { elementRoles as _elementRoles, ARIARoleDefinitionKey, roleElements } from 'aria-query'
import { isUndefined, joinBy } from '../utils'

const roleBySelectors = Array.from(roleElements.entries() || []).reduce(
  (acc, [role, roleRelationConcept]) => {
    const selectors = joinBy(Array.from(roleRelationConcept), ', ', ({ name, attributes }) => {
      const attrSelectors = joinBy(attributes || [], '', attr => {
        if (attr.constraints?.some(c => (c as string) === 'undefined')) {
          return false
        }
        return isUndefined(attr.value) ? `[${attr.name}]` : `[${attr.name}=${JSON.stringify(attr.value)}]`
      })

      return `${name}${attrSelectors}`
    })

    return { ...acc, [selectors]: role }
  },
  {} as Record<string, ARIARoleDefinitionKey>
)

const allRoleSelectors = Object.keys(roleBySelectors)

export const getElementMatchedRoles = (element: HTMLElement) => {
  const explicitRole = element.getAttribute('role')
  if (explicitRole) {
    return [explicitRole as ARIARoleDefinitionKey]
  }
  return allRoleSelectors.reduce<ARIARoleDefinitionKey[]>((acc, selectors) => (element.matches(selectors) ? [...acc, roleBySelectors[selectors]] : acc), [])
}
