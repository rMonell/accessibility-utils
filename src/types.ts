import { ARIAAbstractRole, ARIARole } from 'aria-query'

export type ElementRole = ARIAAbstractRole | ARIARole

export type TagName = Uppercase<keyof HTMLElementTagNameMap> | (string & {})
