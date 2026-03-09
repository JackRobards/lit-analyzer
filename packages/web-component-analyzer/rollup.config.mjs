import ts from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";
import { dirname } from "path";
import pkg from "./package.json" with { type: "json" };

const watch = { include: "src/**" };
const external = ["typescript", "path", "fs", "ts-simple-type"];
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
				chunkFileNames: "chunk-[name]-[hash].js",
				sourcemap: true
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
				chunkFileNames: "chunk-[name]-[hash].js",
				sourcemap: true
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
