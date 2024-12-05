import { elementRoles as _elementRoles, ARIARoleDefinitionKey, roleElements } from 'aria-query'
import { isUndefined, joinBy, keysOf } from '@/utils'

const selectorFromRole = Array.from(roleElements.entries() || []).reduce(
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

    return { ...acc, [role]: selectors }
  },
  {} as Record<ARIARoleDefinitionKey, string>
)

const allRoles = keysOf(selectorFromRole)

export const resolveElementRole = (element: Element): ARIARoleDefinitionKey | undefined => {
  if (!(element instanceof HTMLElement)) {
    return undefined
  }
  return (element.getAttribute('role') as ARIARoleDefinitionKey) || allRoles.find(role => element.matches(selectorFromRole[role]))
}
