import type { SourceFile } from "typescript";
import type { AnalyzerResult, ComponentDeclaration, ComponentDefinition } from "@jackolope/web-component-analyzer";
import type { AnalyzerDefinitionStore } from "../analyzer-definition-store.js";
export declare class DefaultAnalyzerDefinitionStore implements AnalyzerDefinitionStore {
    private analysisResultForFile;
    private definitionForTagName;
    private intersectingDefinitionsForFile;
    absorbAnalysisResult(sourceFile: SourceFile, result: AnalyzerResult): void;
    forgetAnalysisResultForFile(sourceFile: SourceFile): void;
    getAnalysisResultForFile(sourceFile: SourceFile): AnalyzerResult | undefined;
    getDefinitionsWithDeclarationInFile(sourceFile: SourceFile): ComponentDefinition[];
    getComponentDeclarationsInFile(sourceFile: SourceFile): ComponentDeclaration[];
    getDefinitionForTagName(tagName: string): ComponentDefinition | undefined;
    getDefinitionsInFile(sourceFile: SourceFile): ComponentDefinition[];
}
//# sourceMappingURL=default-analyzer-definition-store.d.ts.map