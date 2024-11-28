declare global {
  interface HTMLElement {
    readonly tagName: Uppercase<keyof HTMLElementTagNameMap> | (string & {})
  }
}

export interface GetAccessibleNameOptions {
  /**
   * Ignore hidden element.
   */
  targetHidden?: boolean
  /**
   * Custom root document.
   */
  root?: Element
}
