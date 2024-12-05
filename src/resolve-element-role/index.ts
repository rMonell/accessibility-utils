import { elementRoles as _elementRoles, roleElements } from 'aria-query'
import { isUndefined, joinBy, keysOf } from '@/utils'

import { ElementRole } from '@/types'

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
  {} as Record<ElementRole, string>
)

const allRoles = keysOf(selectorFromRole)

export const resolveElementRole = (element: Element): ElementRole | undefined => {
  if (!(element instanceof HTMLElement)) {
    return undefined
  }
  return (element.getAttribute('role') as ElementRole) || allRoles.find(role => element.matches(selectorFromRole[role]))
}
