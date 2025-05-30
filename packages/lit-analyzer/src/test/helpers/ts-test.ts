import type { ImplementationFn } from "ava";
import test from "ava";
import { dirname } from "path";
import type * as tsModule from "typescript";
import { setTypescriptModule } from "../../lib/analyze/ts-module.js";

// Based on the `ava` types for test.only and test.skip. This matches the format of the tests in this repo
type TestFunction = (title: string, implementation: ImplementationFn<unknown[]>) => void;

const TS_MODULES_ALL = ["current", "5.4", "5.5", "5.6", "5.7"] as const;

type TsModuleKind = (typeof TS_MODULES_ALL)[number];

const TS_MODULES_DEFAULT: TsModuleKind[] = ["current", "5.4", "5.5", "5.6", "5.7"];

/**
 * Returns the name of the module to require for a specific ts module kind
 * @param kind
 */
function getTsModuleNameWithKind(kind: TsModuleKind | undefined): string {
	// Return the corresponding ts module
	switch (kind) {
		case "5.4":
		case "5.5":
		case "5.6":
		case "5.7":
			return `typescript-${kind}`;
		case "current":
		case undefined:
		case null:
			// Fall back to "default"
			return "typescript";
		default: {
			const never: never = kind;
			throw new Error(`Unknown ts module "${never}"`);
		}
	}
}

/**
 * Returns a ts module based on a ts module kind
 * @param kind
 */
function getTsModuleWithKind(kind: TsModuleKind | undefined): typeof tsModule {
	return require(getTsModuleNameWithKind(kind));
}

function setCurrentTsModuleKind(kind: TsModuleKind | undefined) {
	if (kind == null) {
		delete process.env.TS_MODULE;
	} else {
		process.env.TS_MODULE = kind;
	}
}

/**
 * Returns the current ts module kind based on environment vars
 */
function getCurrentTsModuleKind(): TsModuleKind | undefined {
	const kind = process.env.TS_MODULE as TsModuleKind | undefined;

	// Validate the value
	if (kind != null && !TS_MODULES_ALL.includes(kind)) {
		throw new Error(`Unknown ts module "${kind}"`);
	}

	return kind;
}

/**
 * Returns the current ts module based based on environment vars
 */
export function getCurrentTsModule(): typeof tsModule {
	return getTsModuleWithKind(getCurrentTsModuleKind());
}

/**
 * Returns the directory of the current ts module
 */
export function getCurrentTsModuleDirectory(): string {
	const moduleName = getTsModuleNameWithKind(getCurrentTsModuleKind());
	return dirname(require.resolve(moduleName));
}

/**
 * Sets up an ava test with specified ts module kind
 * @param testFunction
 * @param tsModuleKind
 * @param title
 * @param cb
 */
function setupTest(testFunction: TestFunction, tsModuleKind: TsModuleKind | undefined, title: string, cb: ImplementationFn<unknown[]>) {
	// Generate title based on the ts module
	const version = getTsModuleWithKind(tsModuleKind).version;
	const titleWithModule = `[ts${version}] ${title}`;

	// Setup up the ava test
	testFunction(titleWithModule, (...args: Parameters<ImplementationFn<unknown[]>>) => {
		// Set the ts module as environment variable before running the test
		setCurrentTsModuleKind(tsModuleKind);

		// Temporarily set the "typescript" module for helper functions to use
		// Remove this line after refactoring away the global "tsModule.ts"
		setTypescriptModule(getCurrentTsModule());

		const [t, ...restArgs] = args;

		const res = cb(t, ...restArgs);

		// Reset the selected TS_MODULE
		setCurrentTsModuleKind(undefined);
		setTypescriptModule(getTsModuleWithKind("current"));

		return res;
	});
}

/**
 * Sets up an ava test that runs multiple times with different ts modules
 * @param testFunction
 * @param title
 * @param cb
 */
function setupTests(testFunction: TestFunction, title: string, cb: ImplementationFn<unknown[]>) {
	// Find the user specified TS_MODULE at setup time
	const moduleKinds: TsModuleKind[] = (() => {
		const currentTsModuleKind = getCurrentTsModuleKind();

		// Default to running all ts modules if TS_MODULE is not set
		return currentTsModuleKind != null ? [currentTsModuleKind] : TS_MODULES_DEFAULT;
	})();

	// Set up tests for each ts module
	for (const tsModuleKind of moduleKinds) {
		setupTest(testFunction, tsModuleKind, title, cb);
	}
}

/**
 * Wraps an ava test and runs it multiple times with different ts modules
 * @param testFunction
 */
function wrapAvaTest(testFunction: TestFunction): TestFunction {
	return (title, implementation) => {
		return setupTests(testFunction, title, implementation);
	};
}

/**
 * Wrap the ava test module in these helper functions
 */
export const tsTest = Object.assign(wrapAvaTest(test), {
	only: wrapAvaTest(test.only),
	skip: wrapAvaTest(test.skip)
});
