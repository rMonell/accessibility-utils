declare global {
  interface HTMLElement {
    readonly tagName: Uppercase<keyof HTMLElementTagNameMap> | (string & {})
  }
}
