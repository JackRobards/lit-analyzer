// @ts-check

import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
//import importPlugin from "eslint-plugin-import";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: [
			"**/node_modules",
			"**/out",
			"**/dist",
			"**/dev",
			"**/fixtures",
			"packages/*/lib",
			"packages/*/out",
			"packages/*/scripts",
			"packages/*/test",
			"packages/*/index.*",
			"packages/vscode-lit-plugin/built",
			"packages/web-component-analyzer/.rollup.cache",
			"!packages/web-component-analyzer/test",
			".nx/workspace-data"
		]
	},
	eslint.configs.recommended,
	tseslint.configs.recommended,
	// TODO: Consider enabling the import plugin. Currently there are a lot of errors this reports
	//importPlugin.flatConfigs.recommended,
	//{ files: ["**/*.{ts,tsx}"], extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript] },
	{
		languageOptions: {
			globals: {
				...globals.node
			},
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		rules: {
			"no-console": "error",
			"prefer-rest-params": "off",
			"@typescript-eslint/no-this-alias": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-use-before-define": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-object-literal-type-assertion": "off",
			"@typescript-eslint/explicit-member-accessibility": "off",
			"@typescript-eslint/no-parameter-properties": "off",
			"@typescript-eslint/no-var-requires": "off",
			"@typescript-eslint/interface-name-prefix": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/prefer-interface": "off",
			"@typescript-eslint/no-empty-interface": "off",

			// Until the packages are `type: module`, we will keep this rule disabled
			"@typescript-eslint/no-require-imports": "off",

			"@typescript-eslint/consistent-type-imports": 2,
			"no-dupe-class-members": "off",
			"import/extensions": "off"
			// TODO: Re-enable and fix the errors in the web-component-analyzer package
			//"import/extensions": ["error", "always"]
		}
	},
	eslintConfigPrettier
);
