# Accessibility Utils

A lightweight Typescript library providing utilities to handle web accessibility, with a focus on computing accessible names and roles of HTML elements according to [W3C standards](https://www.w3.org/).

## Features

  - **Accessible name computing**: Retrieve accurate, standards-based accessible names for HTML elements.
  - **Element role resolution**: Identify ARIA roles of elements based on their semantics and attributes.
  - **Standards-Compliant**: Follows the latest W3C guidelines and ARIA specifications.
  
## Upcoming features

  - Accessible descriptions computing.
  - Additional utilities for ARIA roles and semantic checks.

## Installation

Add the library to your project using a package manager like npm or yarn:

```shell
npm install accessibility-utils
```

## API

### `getAccessibleName(element, options)`

#### Description

Computes the accessible name of an HTML element, strictly following [W3C guidelines](https://www.w3.org/TR/accname-1.2/) to ensure accurate results.

#### Parameters

  - `element` : HTML element for which to compute the accessible name.
  - `options` (optional) :
    - `targetHidden` _(boolean)_: Allows accessible name compute of hidden elements.
    - `window` _(Window)_: Allows using a custom window instance.

#### Returns

The accessible name of the element based on [W3C guidelines](https://www.w3.org/TR/accname-1.2/). If the accessible cannot be determined, an empty string is returned.

#### Sources

  - https://www.w3.org/TR/accname-1.2/
  - https://www.w3.org/TR/wai-aria-1.2/

### `resolveElementRole(element)`

#### Description

Identifies the applicable ARIA role for a given element based on its attributes, structure, and semantics.

#### Returns

The first matched ARIA role, or `undefined` if no role matches the given element

## Contribution

Contributions are welcome! If you'd like to improve the library, add new features, or fix issues, please follow these steps:

 1. Fork the repository.
 2. Create a branch for your feature or bug fix.
 3. Submit a pull request with a detailed description of your changes.

For any suggestions, feedback, or questions, feel free to [open an issue](https://github.com/rMonell/accessibility-utils/issues/new).

## License

This project is licensed under the MIT License. See the LICENSE file for more details.