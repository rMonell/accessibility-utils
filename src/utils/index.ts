export const isUndefined = <TValue>(value?: TValue): value is undefined => {
  return typeof value === 'undefined'
}

export const isHtmlElement = (element: Node): element is HTMLElement => {
  return element instanceof HTMLElement
}

export const hasCustomTagName = (tagName: string) => !!window.customElements.get(tagName.toLowerCase())
/**
 * Check if at least one item match the of an iterable.
 */
export const containKeys = <TItem, TMapValue>(iterable: Set<TItem> | Map<TItem, TMapValue>, items: TItem[]) => {
  return items.length === 1 ? iterable.has(items[0]) : items.some(item => iterable.has(item))
}

/**
 * Join an array from a given item transformer / filter.
 *
 * @param arr - Items array
 * @param separator - Result separator
 * @param transformer - Transforms item or exclude item from join in case of falsy result.
 */
export const joinBy = <TItem>(arr: TItem[], separator: string, transformer: (item: TItem) => string | boolean) => {
  return arr.reduce((acc, item, index) => {
    const value = transformer(item)
    if (typeof value === 'boolean' && !value) {
      return acc
    }
    if (index > 0) {
      acc += separator
    }
    return `${acc}${value}`
  }, '')
}
