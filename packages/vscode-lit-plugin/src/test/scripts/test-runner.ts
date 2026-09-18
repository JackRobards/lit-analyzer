#!/usr/bin/env node

// A script that launches vscode with our extension installed and
// executes ./mocha-driver

import * as path from "path";
import { mkdtemp, mkdir, writeFile, readdir, readFile, rm } from "fs/promises";
import { tmpdir } from "os";
import { version as typescriptVersion } from "typescript";

import { runTests } from "@vscode/test-electron";

async function main() {
	try {
		if (process.argv.length !== 3) {
			throw new Error(`Usage: node ${process.argv[1]} <path to extension>`);
		}
		// When testing the packaged-and-then-unzipped extension, we'll be handed the path to it.
		const extensionPath = path.resolve(process.argv[2]);
		const extensionTestsPath = path.resolve(__dirname, "./mocha-driver");

		const fixturesDir = path.join(__dirname, "..", "..", "..", "src", "test", "fixtures");
		// Download VS Code, unzip it and run the integration test
		const userDataDir = await mkdtemp(path.join(tmpdir(), "lit-plugin-ts6-"));
		try {
			const userDir = path.join(userDataDir, "User");
			await mkdir(userDir);
			await writeFile(
				path.join(userDir, "settings.json"),
				JSON.stringify({
					"typescript.tsdk": path.dirname(require.resolve("typescript")),
					"typescript.tsserver.log": "verbose",
					"typescript.disableAutomaticTypeAcquisition": true
				})
			);
			await runTests({
				vscodeExecutablePath: process.env.VSCODE_EXECUTABLE_PATH,
				extensionDevelopmentPath: extensionPath,
				extensionTestsPath,
				launchArgs: [fixturesDir, "--user-data-dir", userDataDir, "--disable-extensions", "--skip-welcome", "--skip-release-notes"]
			});
			const logs = await readdir(path.join(userDataDir, "logs"), { recursive: true });
			const serverLogs = await Promise.all(
				logs.filter(file => file.endsWith("tsserver.log")).map(file => readFile(path.join(userDataDir, "logs", file), "utf8"))
			);
			if (!serverLogs.some(log => log.includes(`Version: ${typescriptVersion}`))) {
				throw new Error(`No server log confirmed TypeScript ${typescriptVersion} in ${userDataDir}`);
			}
			// eslint-disable-next-line no-console
			console.log(`Confirmed active TypeScript server ${typescriptVersion}`);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(`VS Code test profile retained at ${userDataDir}`);
			throw error;
		}
		await rm(userDataDir, { recursive: true, force: true });

		const inCI = !!process.env.CI;
		// For reasons unknown, the test runner sometimes fails to free some
		// resource after testing is done when running locally.
		// Note that at this point, the test has completed successfully.
		if (!inCI) {
			setTimeout(function () {
				// eslint-disable-next-line no-console
				console.log(`[tests completed successfully, but some resource leak is preventing the test runner from exiting, so manually exiting]`);
				process.exit(0);
			}, 1_000).unref();
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
		process.exit(1);
	}
}

main();
