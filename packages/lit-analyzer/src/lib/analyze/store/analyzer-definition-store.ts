import type { SourceFile } from "typescript";
import type { AnalyzerResult, ComponentDeclaration, ComponentDefinition } from "web-component-analyzer-fork";

export interface AnalyzerDefinitionStore {
	getAnalysisResultForFile(sourceFile: SourceFile): AnalyzerResult | undefined;
	getDefinitionsWithDeclarationInFile(sourceFile: SourceFile): ComponentDefinition[];
	getComponentDeclarationsInFile(sourceFile: SourceFile): ComponentDeclaration[];
	getDefinitionForTagName(tagName: string): ComponentDefinition | undefined;
	getDefinitionsInFile(sourceFile: SourceFile): ComponentDefinition[];
}
