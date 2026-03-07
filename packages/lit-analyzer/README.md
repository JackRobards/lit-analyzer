<h1 align="center">@jackolope/lit-analyzer</h1>
<p align="center">
  <b>CLI that type checks bindings in lit-html templates</b></br>
  <sub><sub>
</p>

<br />

<a href="https://npmcharts.com/compare/@jackolope/lit-analyzer?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@jackolope/lit-analyzer.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@jackolope/lit-analyzer"><img alt="NPM Version" src="https://img.shields.io/npm/v/@jackolope/lit-analyzer.svg" height="20"/></a>
[![Dependencies](https://img.shields.io/librariesio/release/npm/@jackolope/lit-analyzer)](https://libraries.io/npm/@jackolope/lit-analyzer)
<a href="https://github.com/JackRobards/lit-analyzer/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/JackRobards/lit-analyzer.svg" height="20"/></a>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#installation)

## ➤ Installation

<!-- prettier-ignore -->
```bash
npm install @jackolope/lit-analyzer -g
```

**Note:**

- If you use Visual Studio Code you can also install the [lit-analyzer-plugin](https://marketplace.visualstudio.com/items?itemName=jackolope.lit-analyzer-plugin) extension.
- If you use Typescript you can also install [@jackolope/ts-lit-plugin](https://github.com/JackRobards/lit-analyzer/blob/main/packages/ts-lit-plugin).

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#usage)

## ➤ Usage

`lit-analyzer` analyzes an optional `input glob` and emits the output to the console as default. When the `input glob` is omitted it will analyze all components in `src`.

<!-- prettier-ignore -->
```bash
lit-analyzer src
lit-analyzer "src/**/*.{js,ts}"
lit-analyzer my-element.js
lit-analyzer --format markdown --outFile result.md 
```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#configuration)

## ➤ Configuration

You can configure the CLI with arguments:

<!-- prettier-ignore -->
```bash
lit-analyzer --strict --rules.no-unknown-tag-name off --format markdown
```

**Note:** You can also configure the CLI using a `tsconfig.json` file (see [@jackolope/ts-lit-plugin](https://github.com/JackRobards/lit-analyzer/blob/main/packages/ts-lit-plugin)).

### Available arguments

<!-- prettier-ignore -->
| Option | Description | Type | Default |
| :----- | ----------- | ---- | ------- |
| `--help` | Print help message | `boolean` | |
| `--rules.rule-name` | Enable or disable rules (example: --rules.no-unknown-tag-name off). Severity can be "off" \| "warn" \| "error". See a list of rules [here](https://github.com/JackRobards/lit-analyzer/blob/main/docs/rules.md). | `{"rule-name": "off" \| "warn" \| "error"}` |  |
| `--strict` | Enable strict mode. This changes the default ruleset | `boolean` | |
| `--format` | Change the format of how diagnostics are reported | `code` \| `list` \| `markdown` | code |
| `--maxWarnings` | Fail only when the number of warnings is larger than this number | `number` | -1 |
| `--outFile` | Emit all output to a single file  | `filePath` |  |
| `--quiet` | Report only errors and not warnings | `boolean` |  |
| `--failFast` | Exit the process right after the first problem has been found | `boolean` | |
| `--debug` | Enable CLI debug mode | `boolean` |  |

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#rules)

## ➤ Rules

The default severity of each rule depends on the `strict` [configuration option](#-configuration). Strict mode is disabled by default.

Each rule can have severity of `off`, `warning` or `error`. You can toggle rules as you like.

For a complete list of all rules with examples, see the **[Rules Documentation](https://github.com/JackRobards/lit-analyzer/blob/main/docs/rules.md)**.

**Quick reference - Validating custom elements**

<!-- prettier-ignore -->
| Rule    | Description | Severity normal | Severity strict |
| :------ | ----------- | --------------- | --------------- |
| [no-unknown-tag-name](#-no-unknown-tag-name) | The existence of tag names are checked. Be aware that not all custom elements from libraries will be found out of the box. | off | warning |
| [no-missing-import](#-no-missing-import)     | When using custom elements in HTML it is checked if the element has been imported and is available in the current context. | off | warning |
| [no-unclosed-tag](#-no-unclosed-tag)         | Unclosed tags, and invalid self closing tags like custom elements tags, are checked. | warning | error |
| [no-missing-element-type-definition](#no-missing-element-type-definition) | This rule will ensure that custom elements are registered on the `HTMLElementTagNameMap` Typescript interface. | off | off |

**Validating binding names**

<!-- prettier-ignore -->
| Rule    | Description | Severity normal | Severity strict |
| :------ | ----------- | --------------- | --------------- |
| [no-unknown-attribute](#-no-unknown-attribute-no-unknown-property)<br> [no-unknown-property](#-no-unknown-attribute-no-unknown-property) | You will get a warning whenever you use an unknown attribute or property within your `lit-html` template. | off | warning |
| [no-unknown-event](#-no-unknown-event)       | When using event bindings it's checked that the event names are fired. | off | off |
| [no-unknown-slot](#-no-unknown-slot)         | Using the "@slot" jsdoc tag on your custom element class, you can tell which slots are accepted for a particular element. | off | warning |
| [no-legacy-attribute](#no-legacy-attribute)         | Disallows use of legacy Polymer binding syntax (e.g. `foo$=`). | off | warning |

**Validating binding types**

<!-- prettier-ignore -->
| Rule    | Description | Severity normal | Severity strict |
| :------ | ----------- | --------------- | --------------- |
| [no-invalid-boolean-binding](#-no-invalid-boolean-binding)       | Disallow boolean attribute bindings on non-boolean types. | error | error |
| [no-expressionless-property-binding](#-no-expressionless-property-binding) | Disallow property bindings without an expression. | error | error |
| [no-noncallable-event-binding](#-no-noncallable-event-binding)   | Disallow event listener bindings with a noncallable type. | error | error |
| [no-boolean-in-attribute-binding](#-no-boolean-in-attribute-binding) | Disallow attribute bindings with a boolean type. | error | error |
| [no-complex-attribute-binding](#-no-complex-attribute-binding)   | Disallow attribute bindings with a complex type. | error | error |
| [no-nullable-attribute-binding](#-no-nullable-attribute-binding) | Disallow attribute bindings with nullable types such as "null" or "undefined". This is not needed in newer versions of Lit, but can still be configured if desired.   | off | off |
| [no-incompatible-type-binding](#-no-incompatible-type-binding)   | Disallow incompatible type in bindings.  | error | error |
| [no-invalid-directive-binding](#-no-invalid-directive-binding)   | Disallow using built-in directives in unsupported bindings. | error | error |
| [no-unintended-mixed-binding](#-no-unintended-mixed-binding)   | Disallow mixed value bindings where a character `'`, `"`, `}` or `/` is unintentionally included in the binding. | warning | warning |

**Validating LitElement**

<!-- prettier-ignore -->
| Rule    | Description | Severity normal | Severity strict |
| :------ | ----------- | --------------- | --------------- |
| [no-incompatible-property-type](#-no-incompatible-property-type) | When using the @property decorator in Typescript, the property option `type` is checked against the declared property Typescript type | warn | error |
| [no-invalid-attribute-name](#-no-invalid-attribute-name)         | When using the property option `attribute`, the value is checked to make sure it's a valid attribute name. | error | error |
| [no-invalid-tag-name](#-no-invalid-tag-name)                     | When defining a custom element the tag name is checked to make sure it's valid. | error | error |
| [no-property-visibility-mismatch](#no-property-visibility-mismatch) | This rule will ensure public properties use `@property` and non-public properties use `@state`. | off | warn |

**Validating CSS**

<!-- prettier-ignore -->
| Rule    | Description | Severity normal | Severity strict |
| :------ | ----------- | --------------- | --------------- |
| [no-invalid-css](https://github.com/JackRobards/lit-analyzer/blob/main/docs/rules.md#no-invalid-css) | CSS within the tagged template literal `css` will be validated. | warning | error |

See the **[Rules Documentation](https://github.com/JackRobards/lit-analyzer/blob/main/docs/rules.md)** for detailed explanations and examples of each rule.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#documenting-slots-events-attributes-and-properties)

## ➤ Documenting slots, events, attributes and properties

Code is analyzed using [web-component-analyzer](https://github.com/JackRobards/lit-analyzer/tree/main/packages/web-component-analyzer) in order to find properties, attributes and events. Unfortunately, sometimes it's not possible to analyze these things by looking at the code, and you will have to document how your component looks using `jsdoc` like this:

<!-- prettier-ignore -->
```js
/**
 * This is my element
 * @attr size
 * @attr {red|blue} color - The color of my element
 * @prop {String} value
 * @prop {Boolean} myProp - This is my property
 * @fires change
 * @fires my-event - This is my own event
 * @slot - This is a comment for the unnamed slot
 * @slot right - Right content
 * @slot left
 * @cssprop {Color} --border-color
 * @csspart header
 */
class MyElement extends HTMLElement { 
}

customElements.define("my-element", MyElement);
```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#contributors)

## ➤ Contributors

| [<img alt="Rune Mehlsen" src="https://avatars2.githubusercontent.com/u/5372940?s=460&v=4" width="100">](https://twitter.com/runemehlsen) | [<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://joeschmoe.io/api/v1/random" width="100">](https://github.com/JackRobards/lit-analyzer/blob/main/CONTRIBUTING.md) |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [Rune Mehlsen](https://twitter.com/runemehlsen)                                              |                                             [Andreas Mehlsen](https://twitter.com/andreasmehlsen)                                              |                                 [You?](https://github.com/JackRobards/lit-analyzer/blob/main/CONTRIBUTING.md)                                  |

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#license)

## ➤ License

Licensed under [MIT](https://opensource.org/licenses/MIT).
