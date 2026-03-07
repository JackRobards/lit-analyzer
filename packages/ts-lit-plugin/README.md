<h1 align="center">@jackolope/ts-lit-plugin</h1>
<p align="center">
  <b>Typescript plugin that adds type checking and code completion to lit-html. Fork of the original ts-lit-plugin.</b></br>
  <sub><sub>
</p>

<br />

<a href="https://npmcharts.com/compare/@jackolope/ts-lit-plugin?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@jackolope/ts-lit-plugin.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@jackolope/ts-lit-plugin"><img alt="NPM Version" src="https://img.shields.io/npm/v/@jackolope/ts-lit-plugin.svg" height="20"/></a>
[![Dependencies](https://img.shields.io/librariesio/release/npm/@jackolope/ts-lit-plugin)](https://libraries.io/npm/@jackolope/ts-lit-plugin)
<a href="https://github.com/JackRobards/lit-analyzer/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/JackRobards/lit-analyzer.svg" height="20"/></a>

<p align="center">
  <img src="https://user-images.githubusercontent.com/5372940/62078476-02c1ec00-b24d-11e9-8de5-1322012cbde2.gif" alt="Lit plugin GIF"/>
</p>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#installation)

## ➤ Installation

First, install the plugin:

<!-- prettier-ignore -->
```bash
npm install @jackolope/ts-lit-plugin -D
```

Then add a `plugins` section to your [`tsconfig.json`](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html):

<!-- prettier-ignore -->
```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@jackolope/ts-lit-plugin"
      }
    ]
  }
}
```

Finally, restart you Typescript Language Service, and you should start getting diagnostics from `@jackolope/ts-lit-plugin`.

**Note:**

- If you use Visual Studio Code you can also install the [lit-analyzer-plugin](https://marketplace.visualstudio.com/items?itemName=jackolope.lit-analyzer-plugin) extension.
- If you would rather use a CLI, you can install the [lit-analyzer](https://github.com/JackRobards/lit-analyzer/blob/main/packages/lit-analyzer).

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#configuration)

## ➤ Configuration

You can configure this plugin through your `tsconfig.json`.

### Example

<!-- prettier-ignore -->
```json
{
  "compilerOptions": {
    "plugins": [
      {
				// Also supports the name `ts-lit-plugin` for compatibility with the original version
        "name": "@jackolope/ts-lit-plugin",
        "strict": true,
        "rules": {
          "no-unknown-tag-name": "off",
          "no-unknown-event": "warn"
        }
      }
    ]
  }
}
```

### Available options

<!-- prettier-ignore -->
| Option | Description | Type | Default |
| :----- | ----------- | ---- | ------- |
| `strict` | Enabling strict mode will change which rules are applied as default (see list of [rules](https://github.com/JackRobards/lit-analyzer/blob/main/docs/rules.md)) | `boolean` | false |
| `rules` | Enable/disable individual rules or set their severity. Example: `{"no-unknown-tag-name": "off"}` | `{"rule-name": "off" \| "warn" \| "error"}` | The default rules enabled depend on the `strict` option |
| `disable` | Completely disable this plugin. | `boolean` | false |
| `dontShowSuggestions` | Disable code suggestions and quick fixes. | `boolean` | false |
| `htmlTemplateTags` | List of template tags to enable html support in. | `string[]` | ["html", "raw"] | |
| `cssTemplateTags` | List of template tags to enable CSS support in. | `string[]` | ["css"] |
| `globalTags` |  List of html tag names that you expect to be present at all times. | `string[]` | |
| `globalAttributes` | List of html attributes names that you expect to be present at all times. | `string[]` | |
| `globalEvents` | List of event names that you expect to be present at all times | `string[]` | |
| `customHtmlData` | This plugin supports the [custom vscode html data format](https://code.visualstudio.com/updates/v1_31#_html-and-css-custom-data-support) through this setting. | [Vscode Custom HTML Data Format](https://github.com/microsoft/vscode-html-languageservice/blob/main/docs/customData.md). Supports arrays, objects and relative file paths | |
| `maxProjectImportDepth` | Determines how many modules deep dependencies are followed to determine whether a custom element is available in the current file. When `-1` is used, dependencies will be followed infinitely deep. | `number` | `-1` |
| `maxNodeModuleImportDepth` | Determines how many modules deep dependencies in __npm packages__ are followed to determine whether a custom element is available in the current file. When `-1` is used, dependencies in __npm packages__ will be followed infinitely deep.| `number` | `1` |

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#rules)

## ➤ Rules

The default severity of each rule depend on the `strict` [configuration option](#-configuration). Strict mode is disabled as default.

Each rule can have severity of `off`, `warning` or `error`. You can toggle rules as you like.

**Validating custom elements**

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
| [no-nullable-attribute-binding](#-no-nullable-attribute-binding) | Disallow attribute bindings with nullable types such as "null" or "undefined". This is not needed in newer versions of Lit, but can still be configured if desired.  | off | off |
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
