# Change Log

## 2.4.2

### Patch Changes

- [#389](https://github.com/JackRobards/lit-analyzer/pull/389) [`a70f235`](https://github.com/JackRobards/lit-analyzer/commit/a70f2350e412885abe3d7c0e3d309f9f2cdf3c7f) Thanks [@JackRobards](https://github.com/JackRobards)! - fix: Remove the cross-package dependency on the ts-lit-plugin/index.js file from the vscode-lit-plugin package. Required for a build fix in ts-lit-plugin but the vscode extension should continue to work the same as before this version.

## 2.4.1

### Patch Changes

- [#369](https://github.com/JackRobards/lit-analyzer/pull/369) [`1abcf43`](https://github.com/JackRobards/lit-analyzer/commit/1abcf43c0dfcb17e9a256d0468f047c62121ea6a) Thanks [@JackRobards](https://github.com/JackRobards)! - Fix: Update no-missing-import rule to avoid reporting on any listed globalTags

- [#371](https://github.com/JackRobards/lit-analyzer/pull/371) [`0dffbd9`](https://github.com/JackRobards/lit-analyzer/commit/0dffbd9b15b8f122c87adc26a867f204a9f7717e) Thanks [@JackRobards](https://github.com/JackRobards)! - Updated dependencies:
  Updated dependency `@vscode/vsce` to `^3.6.0`.
  Updated dependency `vscode-css-languageservice` to `6.3.7`.
  Updated dependency `vscode-html-languageservice` to `5.5.1`.

## 2.4.0

### Minor Changes

- [#333](https://github.com/JackRobards/lit-analyzer/pull/333) [`51ec2b8`](https://github.com/JackRobards/lit-analyzer/commit/51ec2b831783000e4c637693dba2b5f4bc7f406e) Thanks [@JackRobards](https://github.com/JackRobards)! - Updated dependencies:
  Updated dependency `@vscode/vsce` to `^3.5.0`.
  Updated dependency `vscode-css-languageservice` to `6.3.6`.
  Updated dependency `vscode-html-languageservice` to `5.5.0`.
  Updated devDependency `@types/node` to `^22.15.30`.
  Updated devDependency `esbuild` to `^0.25.5`.
  Updated devDependency `mocha` to `^11.6.0`.

### Patch Changes

- [#333](https://github.com/JackRobards/lit-analyzer/pull/333) [`007fde0`](https://github.com/JackRobards/lit-analyzer/commit/007fde0fcf1f17967d846e3fc144570b7d68b7a6) Thanks [@JackRobards](https://github.com/JackRobards)! - fix: Upgrade patch npm audit dependencies to fix vulnerabilities

## 2.3.0

### Minor Changes

- [#290](https://github.com/JackRobards/lit-analyzer/pull/290) [`822956b`](https://github.com/JackRobards/lit-analyzer/commit/822956b8c1817eb3e58a6a97a8c4c33ea16348d0) Thanks [@JackRobards](https://github.com/JackRobards)! - Update lit-html syntaxes for nicer styling inside tagged templates

### Patch Changes

- [#291](https://github.com/JackRobards/lit-analyzer/pull/291) [`ea9de0e`](https://github.com/JackRobards/lit-analyzer/commit/ea9de0e43d080572aea4ab088468ca6a6c8d19b0) Thanks [@JackRobards](https://github.com/JackRobards)! - Update minor vulnerable package versions using npm audit fix

## 2.2.1

### Patch Changes

- [#262](https://github.com/JackRobards/lit-analyzer/pull/262) [`0c72e78`](https://github.com/JackRobards/lit-analyzer/commit/0c72e78abcfdc249f7c34e26164a5a8dbe92e5a9) Thanks [@JackRobards](https://github.com/JackRobards)! - Add private `#property` support for web-component-analyzer

- [#234](https://github.com/JackRobards/lit-analyzer/pull/234) [`361442a`](https://github.com/JackRobards/lit-analyzer/commit/361442aa78a0a616b3ead06f67dba7fc42f01931) Thanks [@dependabot](https://github.com/apps/dependabot)! - chore: Add support for TypeScript 5.8

- [#276](https://github.com/JackRobards/lit-analyzer/pull/276) [`ef41a49`](https://github.com/JackRobards/lit-analyzer/commit/ef41a490eea17c9e084f6e32ad7242eb2681c275) Thanks [@JackRobards](https://github.com/JackRobards)! - Updated dependencies:
  Updated dependency `typescript` to `^5.8.3`.
  Updated devDependency `@types/node` to `^22.15.3`.
  Updated devDependency `@vscode/vsce` to `^3.3.2`.
  Updated devDependency `esbuild` to `^0.25.3`.
  Updated devDependency `@jackolope/lit-analyzer` to `^3.1.2`.
  Updated devDependency `mocha` to `^11.2.2`.
  Updated devDependency `vscode-css-languageservice` to `6.3.5`.
  Updated devDependency `vscode-html-languageservice` to `5.4.0`.
  Updated devDependency `wireit` to `^0.14.12`.

## 2.2.0

### Minor Changes

- [#236](https://github.com/JackRobards/lit-analyzer/pull/236) [`76e43ac`](https://github.com/JackRobards/lit-analyzer/commit/76e43ac516e1f6d6c7e07e1c7b993475f00730af) Thanks [@JackRobards](https://github.com/JackRobards)! - feat: Add ability to fold (collapse) code inside of html, css, and svg tempalte literals.

  This feature can be configured by a new "lit-analyzer-plugin.enableTaggedTemplateFolding" vscode setting. By default it is enabled, unless your editor.foldingStrategy setting is set to "indentation".

### Patch Changes

- [#236](https://github.com/JackRobards/lit-analyzer/pull/236) [`672a7c6`](https://github.com/JackRobards/lit-analyzer/commit/672a7c6aa9b449044cdbb384923219518bc24107) Thanks [@JackRobards](https://github.com/JackRobards)! - Updated dependencies:
  Updated devDependency `@types/node` to `^22.14.0`.
  Updated dependency `@vscode/vsce` to `^3.3.2`.
  Updated dependency `@jackolope/lit-analyzer` to new version.
  Updated dependency `vscode-css-languageservice` to `6.3.4`.

## 2.1.1

### Patch Changes

- [#221](https://github.com/JackRobards/lit-analyzer/pull/221) [`cbad127`](https://github.com/JackRobards/lit-analyzer/commit/cbad1272bc0a77bd9e1c208eed872c843cce0b13) Thanks [@JackRobards](https://github.com/JackRobards)! - Updated dependency `@types/node` to `^22.13.14`.
  Updated dependency `@vscode/vsce` to `^3.3.1`.
  Updated dependency `esbuild` to `^0.25.1`.

- [#218](https://github.com/JackRobards/lit-analyzer/pull/218) [`9fc7ff2`](https://github.com/JackRobards/lit-analyzer/commit/9fc7ff21d354df4d1f84ea325b5b63eb00e7e6de) Thanks [@JackRobards](https://github.com/JackRobards)! - fix: Revert Make no-incompatible-type-binding rule ignore undefined when binding a property (with .) on union types

## 2.1.0

### Minor Changes

- [#208](https://github.com/JackRobards/lit-analyzer/pull/208) [`e77eeb7`](https://github.com/JackRobards/lit-analyzer/commit/e77eeb79f78380671a1e6171d2d84d6d4e677512) Thanks [@JackRobards](https://github.com/JackRobards)! - feat: Add support for VSCode's html.customData setting to vscode plugin

- [#142](https://github.com/JackRobards/lit-analyzer/pull/142) [`d83e9fb`](https://github.com/JackRobards/lit-analyzer/commit/d83e9fb20d5285a8df21e5246a2e48b365b75bff) Thanks [@JackRobards](https://github.com/JackRobards)! - feat: Update no-property-visibility-mismatch rule to check for @state decorator instead of deprecated @internalProperty decorator

### Patch Changes

- [#207](https://github.com/JackRobards/lit-analyzer/pull/207) [`2250324`](https://github.com/JackRobards/lit-analyzer/commit/225032460b92f3f7652061fa7ea275231e69943c) Thanks [@JackRobards](https://github.com/JackRobards)! - fix: Make no-incompatible-type-binding rule ignore undefined when binding a property (with .) on union types

- [#207](https://github.com/JackRobards/lit-analyzer/pull/207) [`0061d9d`](https://github.com/JackRobards/lit-analyzer/commit/0061d9db945ff7310d6ec7c70cf2b4f7d46a3c1d) Thanks [@JackRobards](https://github.com/JackRobards)! - fix: Turn no-nullable-attribute-binding off by default as it is no longer relevant in newer Lit versions. It can still be turned on via configuration if so desired.

- [#207](https://github.com/JackRobards/lit-analyzer/pull/207) [`e869530`](https://github.com/JackRobards/lit-analyzer/commit/e869530d7b868a293f76ba8363f9a25f48475c06) Thanks [@JackRobards](https://github.com/JackRobards)! - fix: Make no-incompatible-property-type rule ignor e @property decorators with a `state: true` option in the same way as it ignores `attribute: false`

## 2.0.0

### Major Changes

- [#125](https://github.com/JackRobards/lit-analyzer/pull/125) [`e85bdaf`](https://github.com/JackRobards/lit-analyzer/commit/e85bdafe871bcac2d4a89da64fc2c1d4b8b78bd9) Thanks [@JackRobards](https://github.com/JackRobards)! - Major (Breaking) changes:
  - Upgrade Supported Node versions to 18, 20, and 22: https://github.com/JackRobards/lit-analyzer/pull/27.
  - Upgrade to the latest version of vsce, for building and publishing the VSCode Extension: https://github.com/JackRobards/lit-analyzer/pull/45 and https://github.com/JackRobards/lit-analyzer/pull/47.
  - Upgrade TypeScript Versions tested against to 5.4, 5.5, 5.6, 5.7 (previously it was 4.8 - 5.2): https://github.com/JackRobards/lit-analyzer/pull/75.
  - Upgrade tsconfig to target es2023 and the NodeNext module. Previously it was targeting es5 and commonjs: https://github.com/JackRobards/lit-analyzer/pull/95.
  - NPM Packages renamed to have be prefixed with @jackolope user scope: https://github.com/JackRobards/lit-analyzer/pull/114 and https://github.com/JackRobards/lit-analyzer/pull/94.

### Minor Changes

- [#125](https://github.com/JackRobards/lit-analyzer/pull/125) [`e85bdaf`](https://github.com/JackRobards/lit-analyzer/commit/e85bdafe871bcac2d4a89da64fc2c1d4b8b78bd9) Thanks [@JackRobards](https://github.com/JackRobards)! - Bulk Minor/Patch Changes
  - Upgrade the html and css language service packages, so that the plugin can detect the latest features.
  - Generally, all packages have been upgraded in (or uninstalled from) the repo. This includes a number of security fixes, and many of these PRs were handled by Dependabot.
  - fix: Exclude symbol when checking binding types: https://github.com/JackRobards/lit-analyzer/pull/107.

  Dev related (doesn't effect consumers):
  - Migrate to npm workspaces: https://github.com/JackRobards/lit-analyzer/pull/28.
  - The web-component-analyzer repo has also been forked, and is no included in this monorepo: https://github.com/JackRobards/lit-analyzer/pull/59.
  - Upgrade and fix the broken .github scripts to build on PRs: https://github.com/JackRobards/lit-analyzer/pull/4 and https://github.com/JackRobards/lit-analyzer/pull/5.
  - Migrate repository to new ESLint flat config: https://github.com/JackRobards/lit-analyzer/pull/99.
  - Upgrade ava testing package to the latest version (required some manual changes): https://github.com/JackRobards/lit-analyzer/pull/8.
  - Dependabot is now active in this repo, to help keep it up to date with new releases.
  - In future release notes, not all of these dev-related changes will be included in the changelog. For this initial release, they are included to help track what all has been updated with this fork.

### Patch Changes

- [#102](https://github.com/JackRobards/lit-analyzer/pull/102) [`64ac2a1`](https://github.com/JackRobards/lit-analyzer/commit/64ac2a1a4cb81edb46833b8e60e6624a136e7074) Thanks [@JackRobards](https://github.com/JackRobards)! - Uninstall Lerna package from repo

All notable changes to this project will be documented in this file.

<!-- ### Added -->
<!-- ### Changed -->
<!-- ### Removed -->
<!-- ### Fixed -->

## [1.4.1] - 11/12/2023

- Fix a number of issues when the tsconfig `moduleResolution` option is set. See [#313](https://github.com/runem/lit-analyzer/issues/313)

## [1.4.0] - 25/10/2023

- Support TypeScript 5.1 and 5.2
- Drop support for TypeScript versions <4.8.0

## [1.3.0] - 14/6/2023

- Support TypeScript 5.0
- Drop support for TypeScript versions <4.4.4

## [1.2.4] - 19/4/2022

- Fixed a bug where the TS plugin would interfere with automatic import
  insertion.
- Improved compatibility with recent and future versions of TypeScript.
- Updated deps

## [1.2.1] - 25/7/2020

### Fixed

- Markdown output is no properly escaped ([#119](https://github.com/runem/lit-analyzer/issues/119))
- Code fixes now works again in Webstorm (rule ids now start at 2300) ([#124](https://github.com/runem/lit-analyzer/issues/124))
- Fixed CSS auto completion ([#120](https://github.com/runem/lit-analyzer/issues/120))

## [1.2.0] - 15/7/2020

### Added

- Added new rule `no-property-visibility-mismatch`. This rule will ensure public properties use `@property` and non-public properties use `@internalProperty` ([#100](https://github.com/runem/lit-analyzer/pull/100))
- Added new rule `no-missing-element-type-definition` This rule will ensure that custom elements are registered on the
  `HTMLElementTagNameMap` Typescript interface ([#73](https://github.com/runem/lit-analyzer/issues/73))
- It's now possible to configure how many modules deep dependencies are followed to determine whether a custom element is available in the current file. When `-1` is used, dependencies will be followed infinitely deep. This can be configured for both external dependencies and project dependencies with `maxNodeModuleImportDepth` & `maxProjectImportDepth` ([#116](https://github.com/runem/lit-analyzer/pull/116))
- In addition to extending `HTMLElementTagNameMap` it's now also possible extend the `HTMLElementEventMap` interface and the `HTMLElement` interface ([#53](https://github.com/runem/lit-analyzer/issues/53))

**Example:**

```
declare global {
  interface HTMLElementTagNameMap {
    "my-element": HTMLElement;
  }
  interface HTMLElementEventMap {
    "my-event": Event;
  }
}

/**
 * @attr my-attr
 */
interface HTMLElement {
  myProperty: string;
}
```

- Added autocompletion for CSS shadow parts and CSS custom properties in CSS. It's possible to document those using JSDoc ([dd1ffc78](https://github.com/runem/lit-analyzer/pull/112/commits/dd1ffc78d4fb6ccbe49b7cf91c11ba02d8b0dfa5))
- The [role](https://www.w3.org/TR/role-attribute/) and [controlslist](https://wicg.github.io/controls-list/html-output/multipage/embedded-content.html#attr-media-controlslist) attributes are now correctly type checked ([#89](https://github.com/runem/lit-analyzer/issues/89))

**Example:**

```
/**
 * @cssprop {Color} --border-color - Sets the color of the border
 * @csspart content - The content of my element
 */
class MyElement extends HTMLElement {
}
```

### Fixed and changed

- Quick fix for missing imports now generates correct path on Windows ([#110](https://github.com/runem/lit-analyzer/pull/110))
- **Type checking is now up to 15 times faster**
- `is-assignable-in-boolean-binding` now also accepts "null" and "undefined" types in boolean bindings. Example: `<input ?required="${undefined}" />`
- "Fix message" is now included in the output for the CLI -`no-unknown-property-converter` has been removed and `no-incompatible-property-type` can be used instead.
- Improved JSDoc support
- Improved mixin support
- Private and protected members are now also analyzed
- All diagnostics in vscode are now reported as `lit-plugin([RULE_ID])` and have unique diagnostic codes ([#108](https://github.com/runem/lit-analyzer/issues/108))
- When resolving imports for a given module, facade modules are always followed and do not increase depth ([#114](https://github.com/runem/lit-analyzer/pull/114))
- Improve codefix for 'no-missing-import' rule ([#117](https://github.com/runem/lit-analyzer/pull/117))

### Project

- Refactoring of rule modules
- Added more tests
- `lit-analyzer` now uses data from `vscode-web-custom-data`
- `cancellationToken` is now supported to prevent long running operations

## [1.1.11] - 21/5/2020

### Added

- New rule: `no-legacy-attribute` which is disabled as default. A common mistake when dealing with Lit in particular is to use the legacy Polymer syntax as seen in earlier versions of Polymer (the predecessor of Lit). This rule catches this mistake (see [#95](https://github.com/runem/lit-analyzer/pull/95))
- Added closure security safe type for `<source src>` (see [#88](https://github.com/runem/lit-analyzer/pull/88))
- Fixed typo about event type detection (see [#86](https://github.com/runem/lit-analyzer/pull/86))

### Fixed

- Better performance when using the `no-missing-imports` rule. `lit-analyzer` will still check imported modules in your project as usual, however, it will only follow imports 2 levels deep into any imported module from an external dependency (see [#93](https://github.com/runem/lit-analyzer/pull/93))
- The CLI-option `maxWarnings` defaults to `-1` to avoid failing when the analysis found only warnings (see [#96](https://github.com/runem/lit-analyzer/pull/96))

## [1.1.10] - 2/3/2020

### Added

- Added basic support for type checking code with Safe Types sanitization in place ([#62](https://github.com/runem/lit-analyzer/pull/62))
- VSCode parameter hints for html/css tagged template literal are now hidden ([#61](https://github.com/runem/lit-analyzer/issues/61))

### Fixed

- Fixed css list substitution bug ([#76](https://github.com/runem/lit-analyzer/pull/76))
- Fixed problem where when input type is date, min and max should accept date string ([#77](https://github.com/runem/lit-analyzer/issues/77))
- Fixed `no-boolean-in-attribute-binding` to allow assigning booleans that are coerced to string to 'true'|'false' where appropriate ([#dc6cdc6db](https://github.com/runem/lit-analyzer/commit/dc6cdc6dbf5388e55d2d0b93fce21074deceeaad))

## [1.1.9] - 17/10/2019

### Added

- New rule `no-unintended-mixed-binding` to prevent bugs like `<input value=${"foo"}} />` ([#44](https://github.com/runem/lit-analyzer/issues/44))
- Hex colors within html/css templates are now highlighted in the vscode plugin ([#30](https://github.com/runem/lit-analyzer/issues/30))

### Fixed

- Big internal refactor, including adding a lot of tests ([#49](https://github.com/runem/lit-analyzer/pull/49))
- Fixed problem where closing tags weren't auto-completed properly ([#37cba351](https://github.com/runem/lit-analyzer/commit/37cba3519762a1b8c6f6522baa40842e1b5ac504))
- Fixed problem where lit-analyzer would crash when running with a newer version of Typescript ([#58](https://github.com/runem/lit-analyzer/issues/58))

## [1.1.8] - 13/8/2019

### Added

- Export Bazel plugin ([#39](https://github.com/runem/lit-analyzer/issues/39))
- Support css snippets and % units ([#40](https://github.com/runem/lit-analyzer/issues/40))

### Fixed

- Fix problem where the value of attributes on the form attr='val' could get parsed incorrectly. ([#36](https://github.com/runem/lit-analyzer/issues/36))

## [1.1.4] - 5/8/2019

### Added

- Some rules are disabled as default to give users a smoother on-boarding experience. To re-enable the stricter rules please set "strict: true". Consult the documentation for more information.
- Functionality has been refactored into "rules" which can be enabled and disabled individually. It should now be much clearer how to enabled or disable individual functionality. Consult the documentation for more information.

- When using the @property decorator from "lit-element" the type of "{type: ...}" is checked against the actual property type.
- Support for using components built with mixins
- Warning when using boolean type expression in attribute binding ([#15](https://github.com/runem/lit-analyzer/issues/15))
- Allow "null" and "undefined" as values always when using "?" attr binding ([#16](https://github.com/runem/lit-analyzer/issues/16))
- Suggested code fix: Please use the `ifDefined` directive. ([#17](https://github.com/runem/lit-analyzer/issues/17))
- The usage of built-in directives is now checked to make sure that they are used correctly.
- Experimental: It's now possible to refactor custom element tag names.

- The analyzer has been updated and should now be much more robust (see [web-component-analyzer](https://github.com/runem/web-component-analyzer)).
- The type checker has been updated and should now be much more robust (see [ts-simple-type](https://github.com/runem/ts-simple-type)).

## [1.0.0] - 1/4/2019

### Added

- Added support for `observedAttributes`, `properties` and `jsdoc comments` as well as web component libraries built with stencil.
- Autocompletion and type checking for properties. Properties on built in elements are supported.
- Autocompletion and name checking for **slots**. Add slots to your component using `@slot myslot` jsdoc.
- Autocompletion and name checking for **events**. `new CustomEvent("myevent")` in the component is found automatically or you can choose to add events to your component using `@fires myevent` jsdoc.
- Added check for using the property modifier without an expression as this is not support by lit-html to catch errors like `.myProp="hello"`.
- Added support for code folding
- Added support for vscode custom html data format.
- Support for declaring attributes and properties using `@attr myattr` and `@prop myprop` jsdoc.
- CSS autocompletion now includes all custom element tag names available.

### Fixed

- The web component analyzer is now much more stable and won't crash on strange inputs.

### Removed

- Temporarily disabled code formatting until issues with nested templates are solved.

## [0.1.0] - 22/2/2019

### Added

- Added code completions and diagnostics for the `CSS` tagged template and`<style>` tag.
- Added check for non-callable types given to event listeners in order to catch errors like `@click="myHandler()"`.
- More reliable type checking across all assignments.
- Better support for built in tag names and global attributes. These now directly use data from the vscode html language service.
- Values are now auto completed for attribute assignments where possible. For example an attribute with a string union type `"large" | "small"` will suggest these values.
- Inline documentation is now shown when listing completions.

### Fixed

- Fixed issue where components from libraries would be imported as `import "../../node_modules/my-component"` and not `import "my-component"`
- Added various missing global built in elements.
- Added various missing global built in attributes like 'aria-\*' attributes.

## [0.0.24] - 8/2/2019

### Added

- Added support for `@ts-ignore` comments ([#2](https://github.com/runem/lit-analyzer/pull/2))
- Added reformat support
- Added support for libraries that extend the global `HTMLElementTagNameMap`

### Fixed

- Fixed broken auto-close tag functionality
