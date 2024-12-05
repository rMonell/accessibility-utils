# Accessibility Utils

A Typescript library providing utilities to handle accessibility, specifically calculating the accessible names of HTML elements based on established W3C standards.

## Installation
Add the library to your project using a package manager like npm or yarn:

```shell
npm install accessibility-utils
```

## API

### `getAccessibleName(element, options)`

#### Description

This function computes the accessible name of an HTML element, strictly following (W3C guidelines)[https://www.w3.org/TR/accname-1.2/] to ensure accurate results.

##### Parameters

  - `element`: An HTML element for which to calculate the accessible name.
  - `options` (optional) :
    - `targetHidden` _(boolean)_: Whether to include hidden elements. Default: true.
    - `window` _(Window object)_: Allows using a custom document context.

##### Returns

A string representing the accessible name of the element.

### `resolveElementRole(element)`

#### Description

This function determines which ARIA roles apply to a given HTML element based on its attributes, structure, and semantics.

##### Parameters:

  - `element`: An HTML element.

##### Returns

An array of strings representing the matched ARIA roles.

## Compatibility

  - Browsers: Compatible with modern browsers supporting DOM APIs.
  - Dependencies: The library relies on `aria-query` for ARIA role definitions.

## Contribution

Contributions are welcome! To report an issue or suggest an enhancement, open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.