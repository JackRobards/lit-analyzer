# @jackolope/lit-analyzer

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

- [#108](https://github.com/JackRobards/lit-analyzer/pull/108) [`f84df34`](https://github.com/JackRobards/lit-analyzer/commit/f84df34e9da2a17565a30b1984fa3a546ff1b92f) Thanks [@JackRobards](https://github.com/JackRobards)! - Support tag names which are static class properties or variables with no-missing-element-type-definition rule"

- [#120](https://github.com/JackRobards/lit-analyzer/pull/120) [`df2021e`](https://github.com/JackRobards/lit-analyzer/commit/df2021e19af5ff815ddcba3f6a324d05a67217b8) Thanks [@JackRobards](https://github.com/JackRobards)! - Convert lit-analyzer CLI to ESM

### Patch Changes

- [#106](https://github.com/JackRobards/lit-analyzer/pull/106) [`01850fc`](https://github.com/JackRobards/lit-analyzer/commit/01850fc4af0b6ab2a1ded0e5468fdb7138f50991) Thanks [@JackRobards](https://github.com/JackRobards)! - Return type hint information if it is available for html-tag

- [#112](https://github.com/JackRobards/lit-analyzer/pull/112) [`4514067`](https://github.com/JackRobards/lit-analyzer/commit/4514067e6e7b959c479692aa97b24692bd313a24) Thanks [@JackRobards](https://github.com/JackRobards)! - Fix ifDefined logic to exclude null from the return type, instead of just undefined

- [#102](https://github.com/JackRobards/lit-analyzer/pull/102) [`64ac2a1`](https://github.com/JackRobards/lit-analyzer/commit/64ac2a1a4cb81edb46833b8e60e6624a136e7074) Thanks [@JackRobards](https://github.com/JackRobards)! - Uninstall Lerna package from repo

- [#109](https://github.com/JackRobards/lit-analyzer/pull/109) [`01a6282`](https://github.com/JackRobards/lit-analyzer/commit/01a6282a797681a0146c7950f3d85113c80717d0) Thanks [@JackRobards](https://github.com/JackRobards)! - Rework no-unclosed-tag rule to improve to cleanly check for begining and ending tags

- Updated dependencies [[`e85bdaf`](https://github.com/JackRobards/lit-analyzer/commit/e85bdafe871bcac2d4a89da64fc2c1d4b8b78bd9), [`f84df34`](https://github.com/JackRobards/lit-analyzer/commit/f84df34e9da2a17565a30b1984fa3a546ff1b92f), [`e85bdaf`](https://github.com/JackRobards/lit-analyzer/commit/e85bdafe871bcac2d4a89da64fc2c1d4b8b78bd9), [`64ac2a1`](https://github.com/JackRobards/lit-analyzer/commit/64ac2a1a4cb81edb46833b8e60e6624a136e7074)]:
  - @jackolope/web-component-analyzer@3.0.0
