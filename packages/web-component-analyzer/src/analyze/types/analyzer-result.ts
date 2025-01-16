import type { SourceFile } from "typescript";
import type { ComponentDeclaration, ComponentFeatures } from "./component-declaration";
import type { ComponentDefinition } from "./component-definition";

/**
 * The result returned after components have been analyzed.
 */
export interface AnalyzerResult {
	sourceFile: SourceFile;
	componentDefinitions: ComponentDefinition[];
	declarations?: ComponentDeclaration[];
	globalFeatures?: ComponentFeatures;
}
