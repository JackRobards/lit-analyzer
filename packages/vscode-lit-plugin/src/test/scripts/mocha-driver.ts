import * as path from "path";
import Mocha from "mocha";
import fastGlob from "fast-glob";

/**
 * Runs all tests in src/test that are named like *-test.ts with Mocha.
 *
 * Called by @vscode/test-electron's runTests function in ./test-runner
 *
 * Should resolve if the tests pass, reject if any fail.
 */
export async function run(): Promise<void> {
	const mocha = new Mocha({
		ui: "tdd",
		color: true,
		timeout: 60_000
	});

	const testsRoot = path.join(__dirname, "..");
	const files = fastGlob.sync("**/*-test.js", { cwd: testsRoot });
	for (const file of files) {
		mocha.addFile(path.resolve(testsRoot, file));
	}
	const failures = await new Promise<number>(resolve => {
		mocha.run(num => resolve(num));
	});
	if (failures > 0) {
		throw new Error(`${failures} tests failed.`);
	}
}
