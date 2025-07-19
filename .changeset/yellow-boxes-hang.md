---
"lit-analyzer-plugin": patch
---

fix: Remove the cross-package dependency on the ts-lit-plugin/index.js file from the vscode-lit-plugin package. Required for a build fix in ts-lit-plugin but the vscode extension should continue to work the same as before this version.
