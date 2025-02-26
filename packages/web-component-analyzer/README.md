<h1 align="center">web-component-analyzer</h1>

<p align="center">
	<a href="https://npmcharts.com/compare/@jackolope/web-component-analyzer?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@jackolope/web-component-analyzer.svg" height="20"/></a>
	<a href="https://www.npmjs.com/package/@jackolope/web-component-analyzer"><img alt="NPM Version" src="https://img.shields.io/npm/v/@jackolope/web-component-analyzer.svg" height="20"/></a>
	<a href="https://david-dm.org/JackRobards/lit-analyzer"><img alt="Dependencies" src="https://img.shields.io/david/JackRobards/lit-analyzer.svg" height="20"/></a>
	<a href="https://github.com/JackRobards/lit-analyzer/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/JackRobards/lit-analyzer.svg" height="20"/></a>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/5372940/68087781-1044ce80-fe59-11e9-969c-4234f9287f1b.gif" alt="Web component analyzer GIF"/>
</p>

`@jackolope/web-component-analyzer` is a package that makes it possible to easily analyze web components. It analyzes your code and jsdoc in order to extract `properties`, `attributes`, `methods`, `events`, `slots`, `css shadow parts` and `css custom properties`. Works with both javascript and typescript.

Used internally for `lit-analyzer`, and I would recommend looking into the [@custom-elements-manifest/analyzer](https://www.npmjs.com/package/@custom-elements-manifest/analyzer) (or something similar) for a CLI tool that complies with the standard Custom Element Manifest instead of using this directly. The CLI functionality has been removed from this tool, and it is now focused on analyzing and generating types for web components.

Try the online playground [here](https://runem.github.io/web-component-analyzer/)

In addition to [vanilla web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) this tool supports web components built with the following libraries:

- [lit-element](https://github.com/Polymer/lit-element)
- [polymer](https://github.com/Polymer/polymer)
- [stencil](https://github.com/ionic-team/stencil) (partial)
- [lwc](https://github.com/salesforce/lwc)
- [open an issue for library requests](https://github.com/JackRobards/lit-analyzer/issues)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#installation)

## ➤ Installation

<!-- prettier-ignore -->
```bash
$ npm install -g @jackolope/web-component-analyzer
```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ How to document your components using JSDoc

In addition to analyzing the code of your components, this library also use JSDoc to construct the documentation. It's especially a good idea to use JSDoc for documenting `slots`, `events`, `css custom properties` and `css shadow parts` as these not analyzed statically by this tool as of now (except when constructing a CustomEvent within your component).

Here's an example including all supported JSDoc tags. All JSDoc tags are on the the form `@tag {type} name - comment` and `@tag {type} [name=default] - comment`.

<!-- prettier-ignore -->
```javascript
/**
 * Here is a description of my web component.
 * 
 * @element my-element
 * 
 * @fires change - This jsdoc tag makes it possible to document events.
 * @fires submit
 * 
 * @attr {Boolean} disabled - This jsdoc tag documents an attribute.
 * @attr {on|off} switch - Here is an attribute with either the "on" or "off" value.
 * @attr [my-attr=default value]
 * 
 * @prop {String} myProp - You can use this jsdoc tag to document properties.
 * @prop value
 * 
 * @slot - This is an unnamed slot (the default slot)
 * @slot start - This is a slot named "start".
 * @slot end
 * 
 * @cssprop --main-bg-color - This jsdoc tag can be used to document css custom properties.
 * @cssprop [--main-color=red]

 * @csspart container 
 */
class MyElement extends HTMLElement {

 /**
  * This is a description of a property with an attribute with exactly the same name: "color".
  * @type {"red"|"green"|"blue"}
  * @attr
  */
  color = "red";

  /**
   * This is a description of a property with an attribute called "my-prop".
   * @type {number}
   * @deprecated
   * @attr my-prop
   */
  myProp = 10

  static get observedAttributes () {
    return [
      /**
       * The header text of this element
       */
      "header"
    ];
  }

}
```

### Overview of supported JSDoc tags

<!-- prettier-ignore -->
| JSDoc Tag                    | Description                                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `@element`                   | Gives your component a tag name. This JSDoc tag is useful if your 'customElements.define` is called dynamically eg. using a custom function. |
| `@fires`                     | Documents events.                                                                                                                            |
| `@slot`                      | Documents slots. Using an empty name here documents the unnamed (default) slot.                                                              |
| `@attr` or `@attribute`      | Documents an attribute on your component.                                                                                                    |
| `@prop` or `@property`       | Documents a property on your component.                                                                                                      |
| `@cssprop` or `@cssproperty` | Documents a css custom property on your component.                                                                                           |
| `@csspart`                   | Documents a css shadow part on your component.                                                                                               |

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ How does this tool analyze my components?

This tool extract information about your components by looking at your code directly and by looking at your JSDoc comments.

**Code**: Web Component Analyzer supports multiple libraries. [Click here](https://github.com/JackRobards/web-component-analyzer/blob/main/ANALYZE.md) for an overview of how each library is analyzed.

**JSDoc**: Read next section to learn more about how JSDoc is analyzed.

## ➤ API

Web Component Analyzer analyzes Typescript source files, so you will have to include the Typescript parser. Here are some examples of how to use the API.

### Analyze Typescript source file

<!-- prettier-ignore -->
```typescript
import { analyzeSourceFile } from "@jackolope/web-component-analyzer";

const result = analyzeSourceFile(sourceFile, { checker });
```

### Analyze text

<!-- prettier-ignore -->
```javascript
import { analyzeText } from "@jackolope/web-component-analyzer";

const code = `class MyElement extends HTMLElement {

}

customElements.define("my-element", MyElement);
`;


const { results, program } = analyzeText(code);
// or
const { results, program } = analyzeText([
  { fileName: "file1.js", text: code },
  { fileName: "file2.js", text: "..." }, // these files can depend on each other
  { fileName: "file3.js", text: "...", analyze: false }
]);
// each result in "results" is the result of analyzing the corresponding text where "analyze" is not false
```

### Transform the result

<!-- prettier-ignore -->
```javascript
import { transformAnalyzerResult } from "@jackolope/web-component-analyzer";

const result = // the result of analyzing the component using one of the above functions

const format = "markdown"; // or "json"

const output = transformAnalyzerResult(format, result, program);

// "output" is now a string containing the result of the "markdown" transformer
```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#how-does-this-tool-analyze-my-components)

## ➤ Contributors

| [<img alt="Rune Mehlsen" src="https://avatars0.githubusercontent.com/u/5372940?s=400&u=43d97899257af3c47715679512919eadb07eab26&v=4" width="100">](https://github.com/runem) |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                   [Rune Mehlsen](https://github.com/runem)                                                                   |

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License

Licensed under [MIT](https://opensource.org/licenses/MIT).
