---
"@jackolope/lit-analyzer": major
"@jackolope/ts-lit-plugin": major
"lit-plugin": major
"@jackolope/web-component-analyzer": major
---

Major (Breaking) changes:

- Upgrade Supported Node versions to 18, 20, and 22: https://github.com/JackRobards/lit-analyzer/pull/27.
- Upgrade to the latest version of vsce, for building and publishing the VSCode Extension: https://github.com/JackRobards/lit-analyzer/pull/45 and https://github.com/JackRobards/lit-analyzer/pull/47.
- Upgrade TypeScript Versions tested against to 5.4, 5.5, 5.6, 5.7 (previously it was 4.8 - 5.2): https://github.com/JackRobards/lit-analyzer/pull/75.
- Upgrade tsconfig to target es2023 and the NodeNext module. Previously it was targeting es5 and commonjs: https://github.com/JackRobards/lit-analyzer/pull/95.
- NPM Packages renamed to have be prefixed with @jackolope user scope: https://github.com/JackRobards/lit-analyzer/pull/114 and https://github.com/JackRobards/lit-analyzer/pull/94.
