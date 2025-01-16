import type * as tsModule from "typescript";
import type { Program } from "typescript";
import type { AnalyzerFlavor } from "../flavors/analyzer-flavor";
import type { AnalyzerConfig } from "./analyzer-config";

/**
 * Options to give when analyzing components
 */
export interface AnalyzerOptions {
	program: Program;
	ts?: typeof tsModule;
	flavors?: AnalyzerFlavor[];
	config?: AnalyzerConfig;
	verbose?: boolean;
}
