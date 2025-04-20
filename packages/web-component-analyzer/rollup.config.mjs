import ts from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";
// create a require
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { dirname } = require("path");
const pkg = require("./package.json");
const watch = { include: "src/**" };
const external = ["typescript", "path", "fs", "@jackolope/ts-simple-type"];
const replaceVersionConfig = {
	VERSION: pkg.version,
	delimiters: ["<@", "@>"],
	preventAssignment: true
};

export default [
	// Standard module config
	{
		input: {
			api: "src/api.ts"
		},
		output: [
			{
				dir: dirname(pkg.module),
				format: "esm",
				chunkFileNames: "chunk-[name]-[hash].js"
			}
		],
		plugins: [
			replace(replaceVersionConfig),
			ts({
				module: "es2022"
			}),
			resolve(),
			copy({
				targets: [{ src: "package-esm.json", dest: "lib/esm", rename: "package.json" }]
			})
		],
		external,
		watch
	},
	// CommonJS config
	{
		input: {
			api: "src/api.ts"
		},
		output: [
			{
				dir: dirname(pkg.main),
				format: "cjs",
				chunkFileNames: "chunk-[name]-[hash].js"
			}
		],
		plugins: [
			replace(replaceVersionConfig),
			ts({
				module: "es2022",
				outDir: "./lib/cjs"
			}),
			resolve()
		],
		external,
		watch
	}
];
