import ts from "@rollup/plugin-typescript";

// create a require
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { dirname } = require("path");
const pkg = require("./package.json");

const input = "src/index.ts";
const watch = {
	include: "src/**"
};

export default [
	// Standard module config
	{
		input,
		output: [
			{
				dir: dirname(pkg.module),
				format: "esm",
				chunkFileNames: "chunk-[name]-[hash].js"
			}
		],
		plugins: [
			ts({
				tsconfig: "./tsconfig.prod.json",
				outDir: "./lib/esm"
			})
		],
		watch
	},
	// CommonJS config
	{
		input,
		output: [
			{
				dir: dirname(pkg.main),
				format: "cjs",
				chunkFileNames: "chunk-[name]-[hash].js"
			}
		],
		plugins: [
			ts({
				tsconfig: "./tsconfig.prod.json",
				outDir: "./lib/cjs"
			})
		],
		watch
	}
];
