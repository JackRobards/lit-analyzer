{{ template:title }}
{{ template:description }}

{{ template:badges }}

This mono-repository consists of the following tools:

- [**`vscode-lit-plugin`**](/packages/vscode-lit-plugin) VS Code plugin that adds syntax highlighting, type checking and code completion for lit-html.

- [**`ts-lit-plugin`**](/packages/ts-lit-plugin) Typescript plugin that adds type checking and code completion to lit-html templates.

- [**`lit-analyzer`**](/packages/lit-analyzer) CLI that analyzes lit-html templates in your code to validate html and type check bindings.

- [**`web-component-analyzer`**](/packages/web-component-analyzer) CLI to analyze web components. Used mainly for `lit-analyzer`, and I would recommend looking into the [@custom-elements-manifest/analyzer](https://www.npmjs.com/package/@custom-elements-manifest/analyzer) for a tool that complies with the standard Custom Element Manifest instead of using this directly.

## Rules

You can find a list of all rules [here](https://github.com/JackRobards/lit-analyzer/blob/main/docs/readme/rules.md).

## Status

If you are interested in the reasons for this fork and the status of the packages please read [`status.md`](/STATUS.md).

## Contributing

If you are interested in contributing to this repository please read [`contributing.md`](/CONTRIBUTING.md)

{{ template:contributors }}
{{ template:license }}
