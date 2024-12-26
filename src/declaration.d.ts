import { TagName } from '@/types'

declare global {
  interface HTMLElement {
    readonly tagName: TagName
  }
}
