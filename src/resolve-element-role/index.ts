import { elementRoles as _elementRoles, ARIARoleDefinitionKey, roleElements } from 'aria-query'
import { isUndefined, joinBy, keysOf } from '@/utils'

import { ElementRole } from '@/types'

const roleElementsArray = Array.from(roleElements.entries() || [])

const lastOrderedRoles: ARIARoleDefinitionKey[] = ['generic']

roleElementsArray.sort(([roleLeft], [roleRight]) => {
  const indexLeft = lastOrderedRoles.indexOf(roleLeft)
  const indexRight = lastOrderedRoles.indexOf(roleRight)

  if (indexLeft !== -1 && indexRight !== -1) {
    return indexLeft - indexRight
  }
  if (indexLeft !== -1) {
    return 1
  }
  if (indexRight !== -1) {
    return -1
  }
  return 0
})

const selectorFromRole = roleElementsArray.reduce(
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

/**
 * Determines which ARIA roles apply to a given HTML element based on its attributes, structure, and semantics.
 */
export const resolveElementRole = (element: Node): ElementRole | undefined => {
  if (!(element instanceof HTMLElement)) {
    return undefined
  }
  return (element.getAttribute('role') as ElementRole) || allRoles.find(role => element.matches(selectorFromRole[role]))
}
