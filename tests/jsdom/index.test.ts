import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { getAccessibleName } from '../../src'

const testsDir = path.join(__dirname, '../wpt/accname/name')

const runWptTestFile = (filePath: string) => {
  const html = fs.readFileSync(filePath, 'utf-8')

  document.body.innerHTML = html

  document.querySelectorAll('[data-expectedlabel]').forEach(element => {
    const expectedLabel = element.getAttribute('data-expectedlabel')
    const computedLabel = getAccessibleName(element, {})
    expect(computedLabel).toBe(expectedLabel)
  })
}

const getTestFiles = (dirPath: string) => fs.readdirSync(dirPath).filter(filePath => filePath.endsWith('.html'))

describe('WPT: accname tests', () => {
  // Since JSDOM doesn't implements pseudo element, E2E approach is necessary in order to validate the pseudo elements computed integration.
  const jsdomIgnored = ['comp_name_from_content.html']

  // TODO - Implement better WPT integration
  //
  // const shadowDomTestDir = path.join(testsDir, 'shadowdom')
  // const allTests = [
  //   ...getTestFiles(testsDir).reduce<string[]>((acc, filePath) => (jsdomIgnored.includes(filePath) ? acc : [...acc, path.join(testsDir, filePath)]), []),
  //   ...getTestFiles(shadowDomTestDir).map(filePath => path.join(shadowDomTestDir, filePath))
  // ].map(path => ({ name: path.split('/').at(-1)?.replace('.html', ''), path }))

  const allTests = getTestFiles(testsDir)
    .reduce<string[]>((acc, filePath) => (jsdomIgnored.includes(filePath) ? acc : [...acc, path.join(testsDir, filePath)]), [])
    .map(path => ({ name: path.split('/').at(-1)?.replace('.html', ''), path }))

  it.each(allTests)('should pass WPT file: $name', ({ path }) => runWptTestFile(path))
})
