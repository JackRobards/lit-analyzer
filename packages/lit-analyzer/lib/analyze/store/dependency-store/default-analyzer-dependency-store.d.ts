import type { SourceFile } from "typescript";
import type { ComponentDefinition } from "@jackolope/web-component-analyzer";
import type { AnalyzerDependencyStore } from "../analyzer-dependency-store.js";
export declare class DefaultAnalyzerDependencyStore implements AnalyzerDependencyStore {
    private importedComponentDefinitionsInFile;
    absorbComponentDefinitionsForFile(sourceFile: SourceFile, result: ComponentDefinition[]): void;
    /**
     * Returns if a component for a specific file has been imported.
     * @param fileName
     * @param tagName
     */
    hasTagNameBeenImported(fileName: string, tagName: string): boolean;
}
//# sourceMappingURL=default-analyzer-dependency-store.d.ts.map