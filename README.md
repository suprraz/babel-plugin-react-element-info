# babel-plugin-react-element-info

> Babel plugin for exposing React element name and filename in DOM nodes

[![npm version](https://img.shields.io/npm/v/babel-plugin-react-element-info.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-react-element-info)
[![npm downloads](https://img.shields.io/npm/dm/babel-plugin-react-element-info.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-react-element-info)
[![Build Status](https://travis-ci.org/suprraz/babel-plugin-react-element-info.svg?branch=master)](https://travis-ci.org/suprraz/babel-plugin-react-element-info)

[![Dependencies](https://img.shields.io/david/suprraz/babel-plugin-react-element-info.svg?style=flat-square)](https://david-dm.org/suprraz/babel-plugin-react-element-info)
[![DevDependencies](https://img.shields.io/david/dev/suprraz/babel-plugin-react-element-info.svg?style=flat-square)](https://david-dm.org/suprraz/babel-plugin-react-element-info#info=devDependencies&view=list)

## Installation

```sh
npm install --save-dev babel-plugin-react-element-info
```

## The problem solved

This is useful for auto-generating selectors to run selenium tests.

## Example

**In**

```myInputFile.js```
```js
class Foo extends React.Component {
  render() {
    return (
      <MyReactComponent>
        My component contents
      </MyReactComponent>
    );
  }
}
```

**Out**
```js
class Foo extends React.Component {
  render() {
    return (
      <MyReactComponent data-qa-node="MyReactComponent" data-qa-file="myInputFile">
        My component contents
      </MyReactComponent>
    );
  }
}
```

## Usage

#### Via `.babelrc` (Recommended)

**.babelrc**

without options:
```json
{
  "env": {
    "development": {
      "plugins": [
        "react-element-info"
      ]
    }
  }
}
```

with options. Prefix is the attribute prefix, defaulting to `qa` (`data-qa-*`). To get `data-test-prefix-*` attributes,  set prefix to `test-prefix`:
```json
{
  "env": {
    "development": {
      "plugins": [
        ["react-element-info", {"prefix": "test-prefix"}]
      ]
    }
  }
}
```

#### Via CLI

```sh
babel --plugins react-element-info script.js
```

#### Via Node API

without options:
```js
require('babel-core').transform('code', {
  plugins: [
    'react-element-info',
  ],
});
```

with options:
```js
require('babel-core').transform('code', {
  plugins: [
    ['react-element-info', {prefix: 'text-prefix'}],
  ],
});
```

## License

MIT
