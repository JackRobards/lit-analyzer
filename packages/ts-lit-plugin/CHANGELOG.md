# @jackolope/ts-lit-plugin

## 3.1.1

### Patch Changes

- [#221](https://github.com/JackRobards/lit-analyzer/pull/221) [`cbad127`](https://github.com/JackRobards/lit-analyzer/commit/cbad1272bc0a77bd9e1c208eed872c843cce0b13) Thanks [@JackRobards](https://github.com/JackRobards)! - Updated dependency `@types/node` to `^22.13.14`.
  Updated dependency `esbuild` to `^0.25.1`.
- Updated dependencies [[`cbad127`](https://github.com/JackRobards/lit-analyzer/commit/cbad1272bc0a77bd9e1c208eed872c843cce0b13), [`cbad127`](https://github.com/JackRobards/lit-analyzer/commit/cbad1272bc0a77bd9e1c208eed872c843cce0b13), [`9fc7ff2`](https://github.com/JackRobards/lit-analyzer/commit/9fc7ff21d354df4d1f84ea325b5b63eb00e7e6de)]:
  - @jackolope/lit-analyzer@3.1.1
  - @jackolope/web-component-analyzer@4.0.1

## 3.1.0

### Minor Changes

- [#142](https://github.com/JackRobards/lit-analyzer/pull/142) [`d83e9fb`](https://github.com/JackRobards/lit-analyzer/commit/d83e9fb20d5285a8df21e5246a2e48b365b75bff) Thanks [@JackRobards](https://github.com/JackRobards)! - feat: Update no-property-visibility-mismatch rule to check for @state decorator instead of deprecated @internalProperty decorator

### Patch Changes

- [#207](https://github.com/JackRobards/lit-analyzer/pull/207) [`2250324`](https://github.com/JackRobards/lit-analyzer/commit/225032460b92f3f7652061fa7ea275231e69943c) Thanks [@JackRobards](https://github.com/JackRobards)! - fix: Make no-incompatible-type-binding rule ignore undefined when binding a property (with .) on union types

- [#207](https://github.com/JackRobards/lit-analyzer/pull/207) [`0061d9d`](https://github.com/JackRobards/lit-analyzer/commit/0061d9db945ff7310d6ec7c70cf2b4f7d46a3c1d) Thanks [@JackRobards](https://github.com/JackRobards)! - fix: Turn no-nullable-attribute-binding off by default as it is no longer relevant in newer Lit versions. It can still be turned on via configuration if so desired.

- [#207](https://github.com/JackRobards/lit-analyzer/pull/207) [`e869530`](https://github.com/JackRobards/lit-analyzer/commit/e869530d7b868a293f76ba8363f9a25f48475c06) Thanks [@JackRobards](https://github.com/JackRobards)! - fix: Make no-incompatible-property-type rule ignor e @property decorators with a `state: true` option in the same way as it ignores `attribute: false`

- [#207](https://github.com/JackRobards/lit-analyzer/pull/207) [`ca7deda`](https://github.com/JackRobards/lit-analyzer/commit/ca7deda7cfb6d422f2e4e75324e6e34c0229a787) Thanks [@JackRobards](https://github.com/JackRobards)! - chore: Support configuring in the tsconfig.json by the name ts-lit-plugin as well for compatibility with the original.

- Updated dependencies [[`e77eeb7`](https://github.com/JackRobards/lit-analyzer/commit/e77eeb79f78380671a1e6171d2d84d6d4e677512), [`2250324`](https://github.com/JackRobards/lit-analyzer/commit/225032460b92f3f7652061fa7ea275231e69943c), [`0061d9d`](https://github.com/JackRobards/lit-analyzer/commit/0061d9db945ff7310d6ec7c70cf2b4f7d46a3c1d), [`d83e9fb`](https://github.com/JackRobards/lit-analyzer/commit/d83e9fb20d5285a8df21e5246a2e48b365b75bff), [`e827ea1`](https://github.com/JackRobards/lit-analyzer/commit/e827ea1cbb36ce518b87033a08b9f7d2efac8f7a), [`e869530`](https://github.com/JackRobards/lit-analyzer/commit/e869530d7b868a293f76ba8363f9a25f48475c06)]:
  - @jackolope/lit-analyzer@3.1.0
  - @jackolope/web-component-analyzer@4.0.0

## 3.0.0

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

- Updated dependencies [[`e85bdaf`](https://github.com/JackRobards/lit-analyzer/commit/e85bdafe871bcac2d4a89da64fc2c1d4b8b78bd9), [`f84df34`](https://github.com/JackRobards/lit-analyzer/commit/f84df34e9da2a17565a30b1984fa3a546ff1b92f), [`01850fc`](https://github.com/JackRobards/lit-analyzer/commit/01850fc4af0b6ab2a1ded0e5468fdb7138f50991), [`4514067`](https://github.com/JackRobards/lit-analyzer/commit/4514067e6e7b959c479692aa97b24692bd313a24), [`e85bdaf`](https://github.com/JackRobards/lit-analyzer/commit/e85bdafe871bcac2d4a89da64fc2c1d4b8b78bd9), [`df2021e`](https://github.com/JackRobards/lit-analyzer/commit/df2021e19af5ff815ddcba3f6a324d05a67217b8), [`64ac2a1`](https://github.com/JackRobards/lit-analyzer/commit/64ac2a1a4cb81edb46833b8e60e6624a136e7074), [`01a6282`](https://github.com/JackRobards/lit-analyzer/commit/01a6282a797681a0146c7950f3d85113c80717d0)]:
  - @jackolope/lit-analyzer@3.0.0
  - @jackolope/web-component-analyzer@3.0.0
