# Bytecode React CLI

> Currently in alpha phase, the CLI API is not yet stable

A command-line tool to generate React components in Typescript following the conventions at Bytecode.

## Installation

Run `yarn add -D bytecode-react-cli`.

## Usage

You can use the CLI by adding the command to your `package.json` script section: `"bcr": "./node_modules/bytecode-react-cli/bin/cli.js"`.

Before you can use the CLI tool, add a `.bcr-config.js` file, f.e.:

Web:

```js
module.exports = {
    options: {
        Component: { path: "src/components", template: "reactWebNoRedux" },
        Container: { path: "src/containers", template: "reactWebWithRedux" },
        Section: { path: "src/sections", template: "reactWebWithRedux" },
        Page: { path: "src/pages", template: "reactWebNoRedux" },
        ReduxDomain: {
            path: "src/store",
            template: "reduxDomain",
            additionalInstructions:
                "Don't forget to add your domain to the `src/store/rootReducer.ts` file and the StoreState type",
        },
    },
};
```

Or for native:

```js
module.exports = {
    options: {
        Component: { path: "src/components", template: "reactNativeNoRedux" },
        Container: { path: "src/containers", template: "reactNativeWithRedux" },
        Section: { path: "src/sections", template: "reactNativeWithRedux" },
        Page: { path: "src/pages", template: "reactNativeNoRedux" },
        ReduxDomain: {
            path: "src/store",
            template: "reduxDomain",
            additionalInstructions:
                "Don't forget to add your domain to the `src/store/rootReducer.ts` file and the StoreState type",
        },
    },
};
```

## Available templates

* `reactWebNoRedux`
* `reactWebWithRedux`
* `reactNativeNoRedux`
* `reactNativeWithRedux`
* `reduxDomain`

## License

GPL-3.0-only
