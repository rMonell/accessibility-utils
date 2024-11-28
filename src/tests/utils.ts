export const render = (html: string) => {
  document.body.innerHTML = html
  return document
}

export const makeAssertion = (selector: string, html: string, expectedName: string) => {
  return { selector, html, expectedName }
}
