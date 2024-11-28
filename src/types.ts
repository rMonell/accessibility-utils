declare global {
  interface HTMLElement {
    readonly tagName: Uppercase<keyof HTMLElementTagNameMap> | (string & {})
  }
}

interface ConfigurableWindowOptions {
  /**
   * Custom window document.
   */
  window?: Window
}

export interface GetAccessibleNameOptions extends ConfigurableWindowOptions {
  /**
   * Ignore hidden element.
   */
  targetHidden?: boolean
}
