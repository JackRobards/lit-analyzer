<!-- ⚠️ This README has been generated from the file(s) "readme.blueprint.md" ⚠️--><h1 align="center">@jackolope/lit-analyzer</h1>
<p align="center">
  <b>Monorepo for tools that analyze lit-html templates. Updated fork of the original lit-analyzer.</b></br>
  <sub><sub>
</p>

<br />

<p align="center">
		<a href="https://marketplace.visualstudio.com/items?itemName=jackolope.lit-analyzer-plugin"><img alt="Downloads per Month" src="https://vsmarketplacebadges.dev/downloads-short/jackolope.lit-analyzer-plugin.svg?label=vscode-lit-plugin" height="20"/></a>
<a href="https://www.npmjs.com/package/@jackolope/lit-analyzer"><img alt="Downloads per Month" src="https://img.shields.io/npm/dm/@jackolope/lit-analyzer.svg?label=@jackolope/lit-analyzer" height="20"/></a>
<a href="https://www.npmjs.com/package/@jackolope/ts-lit-plugin"><img alt="Downloads per Month" src="https://img.shields.io/npm/dm/@jackolope/ts-lit-plugin.svg?label=@jackolope/ts-lit-plugin" height="20"/></a>
<a href="https://github.com/JackRobards/lit-analyzer/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/JackRobards/lit-analyzer.svg" height="20"/></a>
</p>

This mono-repository consists of the following tools:

- [**`vscode-lit-plugin`**](/packages/vscode-lit-plugin) VS Code plugin that adds syntax highlighting, type checking and code completion for lit-html.

- [**`ts-lit-plugin`**](/packages/ts-lit-plugin) Typescript plugin that adds type checking and code completion to lit-html templates.

- [**`lit-analyzer`**](/packages/lit-analyzer) CLI that analyzes lit-html templates in your code to validate html and type check bindings.

- [**`web-component-analyzer`**](/packages/web-component-analyzer) CLI to analyze web components. Used mainly for `lit-analyzer`, and I would recommend looking into the [@custom-elements-manifest/analyzer](https://www.npmjs.com/package/@custom-elements-manifest/analyzer) for a tool that complies with the standard Custom Element Manifest instead of using this directly.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#rules)

## ➤ Rules

You can find a list of all rules [here](https://github.com/JackRobards/lit-analyzer/blob/main/docs/readme/rules.md).

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#status)

## ➤ Status

If you are interested in the reasons for this fork and the status of the packages please read [`status.md`](/STATUS.md).

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#contributing)

## ➤ Contributing

If you are interested in contributing to this repository please read [`contributing.md`](/CONTRIBUTING.md)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#contributors)

## ➤ Contributors

| [<img alt="Rune Mehlsen" src="https://avatars2.githubusercontent.com/u/5372940?s=460&v=4" width="100">](https://twitter.com/runemehlsen) | [<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="Peter Burns" src="https://avatars3.githubusercontent.com/u/1659?s=460&v=4" width="100">](https://twitter.com/rictic) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/JackRobards/lit-analyzer/blob/master/CONTRIBUTING.md) |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [Rune Mehlsen](https://twitter.com/runemehlsen)                                              |                                             [Andreas Mehlsen](https://twitter.com/andreasmehlsen)                                              |                                            [Peter Burns](https://twitter.com/rictic)                                            |                                 [You?](https://github.com/JackRobards/lit-analyzer/blob/master/CONTRIBUTING.md)                                  |

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#license)

## ➤ License

Licensed under [MIT](https://opensource.org/licenses/MIT).
