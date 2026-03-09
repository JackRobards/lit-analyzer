# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Build

```bash
pnpm run build          # Build all packages (wireit, incremental)
```

### Test

```bash
pnpm run test:headless  # Run lit-analyzer + web-component-analyzer tests (no VS Code)
pnpm run test           # Run all tests including vscode-lit-plugin (requires display)

# Run tests for a single package (must build first):
cd packages/lit-analyzer && pnpm run test
cd packages/web-component-analyzer && pnpm run test

# Run a single test file (ava runs compiled JS, not the TS source):
cd packages/lit-analyzer && pnpm exec ava test/rules/no-unknown-tag-name.js

# Limit to one TypeScript version (faster during development):
cd packages/lit-analyzer && TS_MODULE=current pnpm exec ava test/rules/no-unknown-tag-name.js

# Watch mode (in a package directory):
pnpm run test:watch     # ava --watch
```

Tests are **authored** in `src/test/` (TypeScript) and **compiled** to `test/` (JavaScript). Always edit `src/test/` sources — never the compiled `test/` output. Use `tsTest.only` (instead of `test.only`) to focus a single test; each `tsTest` runs against TS 5.4, 5.5, 5.6, 5.7, and `current`.

### Lint

```bash
pnpm run lint           # eslint + prettier:check
pnpm run eslint         # ESLint only
pnpm run prettier:write # Auto-fix formatting
```

### VS Code Extension

```bash
pnpm run package        # Build and package the .vsix file
# Output: packages/vscode-lit-plugin/out/packaged.vsix
```

### Releases

```bash
pnpm run build && pnpm changeset publish   # Publish all packages
```

Wireit caches build outputs — if builds seem stale, delete `.wireit/` cache directories.

## Architecture

This is a 4-package pnpm workspace monorepo. The dependency graph flows one direction:

```
web-component-analyzer  (standalone)
        ↓
   lit-analyzer         (depends on web-component-analyzer)
        ↓
  ts-lit-plugin         (depends on lit-analyzer)
        ↓
vscode-lit-plugin       (depends on ts-lit-plugin, bundled via esbuild)
```

### `packages/web-component-analyzer`

Analyzes TypeScript source files to extract web component metadata (properties, events, slots, CSS parts, etc.). Uses a **flavor system** (`src/analyze/flavors/`) where each flavor (`LitElementFlavor`, `CustomElementFlavor`, `JsDocFlavor`, `LwcFlavor`, `JsxFlavor`) implements the `AnalyzerFlavor` interface to discover and refine component features from different authoring styles. Built with Rollup, outputs both CJS and ESM.

### `packages/lit-analyzer`

The core analysis engine. Key abstractions:

- **`LitAnalyzer`** (`src/lib/analyze/lit-analyzer.ts`) — main entry point, dispatches to document analyzers
- **`LitAnalyzerContext`** (`src/lib/analyze/lit-analyzer-context.ts`) — shared context holding config, stores (html, document, definition, dependency), TypeScript program, and rules
- **Four stores**: `htmlStore` (HTML tag/attribute data), `documentStore` (parsed template documents), `definitionStore` (custom element definitions), `dependencyStore` (import graph)
- **Document analyzers**: `LitHtmlDocumentAnalyzer` and `LitCssDocumentAnalyzer` handle completions, diagnostics, definitions, quick info, etc. inside tagged templates
- **Rules** (`src/lib/rules/`): Each rule implements `RuleModule` with visitor methods (`visitHtmlNode`, `visitHtmlAttribute`, `visitHtmlAssignment`, `visitComponentDefinition`, etc.). All rules are registered in `all-rules.ts`.
- Built with `tsc`, outputs CommonJS.

### `packages/ts-lit-plugin`

A TypeScript language service plugin. `TsLitPlugin` (`src/ts-lit-plugin/ts-lit-plugin.ts`) wraps a `LitAnalyzer` instance and overrides TS language service methods (`getSemanticDiagnostics`, `getCompletionsAtPosition`, etc.). `decorateLanguageService` patches the TS language service with the plugin's methods and adds try/catch + logging wrappers. The `translate/` directory converts `lit-analyzer`'s internal types to TypeScript API types.

### `packages/vscode-lit-plugin`

The VS Code extension. Uses esbuild (`esbuild.script.mjs`) to bundle `ts-lit-plugin` and its dependencies into `built/bundle.js`. The `copy-to-built.js` script assembles the final `built/` directory (copying `node_modules/typescript`, schemas, syntaxes, docs). Packaged as a `.vsix` via `@vscode/vsce`.

## Adding a New Rule

1. Create `packages/lit-analyzer/src/lib/rules/no-<rule-name>.ts` implementing `RuleModule`
2. Add the rule ID to `LitAnalyzerRuleId` in `lit-analyzer-config.ts` and set its default severity tuple `[non-strict, strict]` in `DEFAULT_RULES_SEVERITY`
3. Register it in `packages/lit-analyzer/src/lib/rules/all-rules.ts`
4. Add a test file at `packages/lit-analyzer/src/test/rules/no-<rule-name>.ts` using the `tsTest` / `getDiagnostics` helpers
5. Add corresponding VS Code config in `packages/vscode-lit-plugin/package.json` under `contributes.configuration`

**Note:** Rule diagnostic codes (starting at 2300) are auto-assigned based on alphabetical order of rule IDs. Adding a new rule shifts the codes of all rules that come after it alphabetically.

## Build System

All tasks use **wireit** for incremental builds with caching. Task dependencies are declared in each `package.json`'s `"wireit"` field. Cross-package wireit dependencies use `"../other-package:task"` syntax.

Tests use **ava** (both `lit-analyzer` and `web-component-analyzer` test against multiple TypeScript versions installed as aliased devDependencies: `typescript-5.4` through `typescript-5.8`).

Versions are managed with **changesets** (`.changeset/` directory).
