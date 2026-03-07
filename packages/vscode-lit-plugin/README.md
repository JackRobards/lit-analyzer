<div align="center" markdown="1">

<p align="center">
  <img src="https://user-images.githubusercontent.com/5372940/62078619-4d436880-b24d-11e9-92e0-5fcc43635b7c.png" alt="Logo" width="200" height="auto" />
</p>

<p align="center">
  <b>Syntax highlighting, type checking and code completion for lit-html</b></br>
  <sub><sub>
</p>

<br />

[![](https://vsmarketplacebadges.dev/version-short/jackolope.lit-analyzer-plugin.svg)](https://marketplace.visualstudio.com/items?itemName=jackolope.lit-analyzer-plugin)
[![](https://vsmarketplacebadges.dev/downloads-short/jackolope.lit-analyzer-plugin.svg)](https://marketplace.visualstudio.com/items?itemName=jackolope.lit-analyzer-plugin)
[![](https://vsmarketplacebadges.dev/rating-short/jackolope.lit-analyzer-plugin.svg)](https://marketplace.visualstudio.com/items?itemName=jackolope.lit-analyzer-plugin)
<a href="https://opensource.org/licenses/MIT"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-green.svg" height="20"></img></a>
[![Dependencies](https://img.shields.io/librariesio/release/npm/@jackolope/lit-analyzer)](https://libraries.io/npm/@jackolope/lit-analyzer)
<a href="https://github.com/JackRobards/lit-analyzer/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/JackRobards/lit-analyzer.svg" height="20"/></a>

  <img src="https://user-images.githubusercontent.com/5372940/62078476-02c1ec00-b24d-11e9-8de5-1322012cbde2.gif" alt="Lit plugin GIF"/>

</div>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#installation)

## ➤ Installation

Simply search for [lit-analyzer-plugin](https://marketplace.visualstudio.com/items?itemName=jackolope.lit-analyzer-plugin) in the vscode marketplace and install the extension.

**Note**: You can also run `code --install-extension jackolope.lit-analyzer-plugin` to install it.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#this-version)

## ➤ This Version

Fork of the original runem.lit-plugin.

This VSCode extension functions very similarly in concept to the original runem.lit-plugin but should receive more consistent updates. The vscode extension and related packages have all been forked and updated. If you would like to see the full list of changes, then refer to the Github release notes.

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

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#configuration)

## ➤ Configuration

You can configure this plugin by going to `VS Code Settings` > `Extension` > `lit-analyzer-plugin`.

**Note:** You can also configure the plugin using a `tsconfig.json` file (see [@jackolope/ts-lit-plugin](https://github.com/JackRobards/lit-analyzer/blob/main/packages/ts-lit-plugin)).

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
| `enableTaggedTemplateFolding` | Enables folding (code collapse) inside html, css, and svg tagged template literals. | `boolean` | true if `editor.foldingStrategy !== "indentation"`. false if it is |
| `globalTags` |  List of html tag names that you expect to be present at all times. | `string[]` | |
| `globalAttributes` | List of html attributes names that you expect to be present at all times. | `string[]` | |
| `globalEvents` | List of event names that you expect to be present at all times | `string[]` | |
| `customHtmlData` | This plugin supports the [custom vscode html data format](https://code.visualstudio.com/updates/v1_31#_html-and-css-custom-data-support) through this setting. | [Vscode Custom HTML Data Format](https://github.com/microsoft/vscode-html-languageservice/blob/main/docs/customData.md). Supports arrays, objects and relative file paths | |
| `maxProjectImportDepth` | Determines how many modules deep dependencies are followed to determine whether a custom element is available in the current file. When `-1` is used, dependencies will be followed infinitely deep. | `number` | `-1` |
| `maxNodeModuleImportDepth` | Determines how many modules deep dependencies in __npm packages__ are followed to determine whether a custom element is available in the current file. When `-1` is used, dependencies in __npm packages__ will be followed infinitely deep.| `number` | `1` |

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#other-features)

## ➤ Other features

[Rules](#-rules) as described before, gives you diagnostics directly in your code. Features described in this section will give you super powers by making your lit-html templates come to life.

### 🚶Goto definition

`Cmd+Click (Mac)` / `Ctrl+Click (Windows)` on a tag, attribute, property or event name and goto the definition.

### ✏️ Code completions for css and html

<img src="https://user-images.githubusercontent.com/5372940/53271979-4f2e5c00-36f0-11e9-98a6-f9b7996d841c.gif" width="500" />

Press `Ctrl+Space` in an html or css context and to get code completions.

### 📖 Quick info on hover for html tags and attributes

Hover above a tag, attribute, property or event and see more information about the identifier such as type and jsdoc.

### 🚪 Auto close tags

When typing html inside a template tag `lit-analyzer-plugin` auto-closes tags as you would expect.

### 🔍 Automatically finds custom elements

If you define a custom element somewhere in your code `lit-analyzer-plugin` will automatically find it. Then it will provide auto-import functionality, type checking and code completion out of the box by analyzing the element. [web-component-analyzer](https://github.com/JackRobards/lit-analyzer/tree/main/packages/web-component-analyzer) is the tool that takes care of analyzing components.

### 🌎 Support for dependencies that extend the global HTMLElementTagNameMap

<img src="https://user-images.githubusercontent.com/5372940/53271293-4fc5f300-36ee-11e9-9ed9-31f1e50f898c.gif" width="500" />

If a dependency with Typescript definitions extends the global `HTMLElementTagNameMap` this plugin will pick up on the map between the tag name and the class. Below you will see an example of what to add to your library typescript definition files if you want type checking support for a given html tag.

<!-- prettier-ignore -->
```typescript
declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
```

**Two limitations using this approach as of now**

- By using this approach the plugin wont see detailed information about a given element as (e.g @property decorators and initializers) because it can only read public fields and their corresponding types. Therefore all properties on custom elements imported from libraries are optional and wont respect meta information in @property decorators.
- `lit-analyzer-plugin` will only be able two find your elements if you somewhere in the code imports the file. Before your import the file it will complain that the element is unknown not that it can be imported. This due to the constraint that Typescript only adds library files to the array of program files once the file has been imported.

This plugin already supports [custom vscode html data format](https://code.visualstudio.com/updates/v1_31#_html-and-css-custom-data-support) (see the configuration section) and I will of course work on supporting more ways of shipping metadata alongside custom elements.

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

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#feature-comparison)

## ➤ Feature comparison

This plugin is similar to [vscode-lit-html](https://github.com/mjbvz/vscode-lit-html) on many points. The power of `vscode-lit-html` is that it covers all the basic functionality of HTML in tagged templates, so it's a plugin that can be easily used with other libraries than `lit-html`. However `vscode-lit-plugin` (this one) aims to be a specialized plugin for working with `lit-element / lit-html`, so for example it supports `css` and discovers web components out of the box.

Below is a comparison table of the two plugins:

<!-- prettier-ignore -->
| Feature                 | [vscode-lit-html](https://github.com/mjbvz/vscode-lit-html)   | [vscode-lit-plugin](https://github.com/JackRobards/lit-analyzer/tree/main/packages/vscode-lit-plugin) |
|-------------------------|------------|------------|
| CSS support             | ❌         | ✅         |
| Goto definition         | ❌         | ✅         |
| Check missing imports   | ❌         | ✅         |
| Auto discover web components | ❌    | ✅         |
| Template type checking  | ❌         | ✅         |
| Report unknown tag names | ❌        | ✅         |
| Report unknown attrs    | ❌         | ✅         |
| Report unknown props    | ❌         | ✅         |
| Report unknown events   | ❌         | ✅         |
| Report unknown slots    | ❌         | ✅         |
| Support for vscode custom data format | ❌| ✅    |
| Refactor tag names      | ❌         | ✅         |
| Refactor attr names     | ❌         | ❌         |
| Auto close tags         | ✅         | ✅         |
| Syntax Highlighting     | ✅         | ✅         |
| Completions             | ✅         | ✅         |
| Quick info on hover     | ✅         | ✅         |
| Code folding            | ✅         | ⚠️ (disabled until problem with calling 'program.getSourceFile' is fixed) |
| Formatting              | ✅         | ⚠️ (disabled until problem with nested templates is fixed) |

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#how-does-this-plugin-work)

## ➤ How does this plugin work?

All features are provided by these three libraries:

- **[@jackolope/ts-lit-plugin](https://github.com/JackRobards/lit-analyzer)**: The typescript plugin that powers the logic through the typescript language service (code completion, type checking, eg.).
- **[vscode-lit-html](https://github.com/mjbvz/vscode-lit-html)**: Provides highlighting for the html template tag.
- **[vscode-styled-components](https://github.com/styled-components/vscode-styled-components)**: Provides highlighting for the css template tag.

This library couples it all together and synchronizes relevant settings between vscode and `@jackolope/ts-lit-plugin`.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#contributors)

## ➤ Contributors

| [<img alt="Rune Mehlsen" src="https://avatars2.githubusercontent.com/u/5372940?s=460&v=4" width="100">](https://twitter.com/runemehlsen) | [<img alt="Andreas Mehlsen" src="https://avatars1.githubusercontent.com/u/6267397?s=460&v=4" width="100">](https://twitter.com/andreasmehlsen) | [<img alt="You?" src="https://ui-avatars.com/api/?name=You&background=random&size=100" width="100">](https://github.com/JackRobards/lit-analyzer/blob/main/CONTRIBUTING.md) |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                             [Rune Mehlsen](https://twitter.com/runemehlsen)                                              |                                             [Andreas Mehlsen](https://twitter.com/andreasmehlsen)                                              |                                                [You?](https://github.com/JackRobards/lit-analyzer/blob/main/CONTRIBUTING.md)                                                |

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#license)

## ➤ License

Licensed under [MIT](https://opensource.org/licenses/MIT).
