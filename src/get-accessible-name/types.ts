export interface ConfigurableWindowOptions {
  /**
   * Allows using a custom window instance.
   */
  window?: Window
}

export interface GetAccessibleNameOptions extends ConfigurableWindowOptions {
  /**
   * Allows accessible name compute of hidden elements.
   *
   * Please note that this option ignores section 2A of step [4.3.2](https://www.w3.org/TR/accname-1.2/#computation-steps) when calculating the accessible name.
   *
   * It should therefore be used for specific needs.
   *
   */
  targetHidden?: boolean
}
