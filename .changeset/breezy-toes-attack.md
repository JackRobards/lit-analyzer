---
"@jackolope/lit-analyzer": minor
"@jackolope/ts-lit-plugin": minor
"lit-plugin": minor
"@jackolope/web-component-analyzer": minor
---

Bulk Minor/Patch Changes

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
