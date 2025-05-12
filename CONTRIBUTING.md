# Contributing

Hi there, I really appreciate you considering contributing to this repository! This readme hopefully contains what you need to get started. If you have any questions please open an issue or PM me on twitter [@RuneMehlsen](https://twitter.com/RuneMehlsen).

1. Clone the monorepo: `git clone https://github.com/JackRobards/lit-analyzer.git`
2. Install dependencies: `npm ci`
3. Run tests: `npm test`
4. When you are ready to create a PR with any changes, please run `npx @changesets/cli` in order to generate a [changesets file](https://github.com/changesets/changesets) describing what it is you changed. This is only needed if you are updating the source code, not for things like documentation or tests.

## Contributing to readmes

Readme's are built because a lot of information is repeated in individual readmes. If you want to change something in a readme, please change files in [/docs/readme](/docs/readme), [/packages/lit-analyzer/readme](/packages/lit-analyzer/readme), [/packages/ts-lit-plugin/readme](/packages/ts-lit-plugin/readme), [/packages/vscode-lit-plugin/readme](/packages/vscode-lit-plugin/readme). Never change the README.md directly because it will be overwritten.

Please run `npm run readme` when you want to rebuild all readme files.

## Contributing to lit-analyzer or ts-lit-plugin

### Debugging the CLI

You can always try out the CLI by running `./cli.mjs path-to-a-file.js` from `packages/lit-analyzer`.

### Debugging the language service

You can try out changes to lit-analyzer and/or ts-lit-plugin directly from the Typescript Language Service in VS Code:

1. Run `npm run dev` from `/` to open a playground in VS Code (lit-plugin is disabled in that session to prevent interference).
2. Run `npm run dev:logs` from `/` to watch logs in real time.

### `npm run watch` / `npm run build`

You can run either `npm run watch` or `npm run build` from the repository root or from any subpackage.

## Contributing to vscode-lit-plugin

### Debugging

In order to debug `vscode-lit-plugin` you can open vscode from `packages/vscode-lit-plugin` and press the **start debugging** button in vscode.

### `npm run package`

You can use this script if you want to generate an installable package of vscode-lit-plugin. Afterwards, run `code --install-extension ./packages/vscode-lit-plugin/out/packaged.vsix` to install it.

### Syntaxes

All syntaxes originally came from [vscode-lit-html](https://github.com/mjbvz/vscode-lit-html) and [vscode-styled-components](https://github.com/styled-components/vscode-styled-components). They are copied here and bundled as part of the VSCode extension.

The `text.html.lit-template` syntax is based on the `text.html.ember-handlebars` one for [vsc-ember-syntax](https://github.com/lifeart/vsc-ember-syntax/tree/master/syntaxes), but modified and simplified to fit Lit.

Big thanks and credit to the original authors for these syntaxes!
