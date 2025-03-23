import ts from "@rollup/plugin-typescript";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const input = "src/index.ts";
const watch = {
	include: "src/**"
};

export default [
	{
		input,
		output: [
			{
				file: pkg.main,
				format: "cjs"
			}
		],
		plugins: [
			ts({
				tsconfig: "./tsconfig.prod.json"
			})
		],
		watch
	}
];
