"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAnalyzerDependencyStore = void 0;
class DefaultAnalyzerDependencyStore {
    importedComponentDefinitionsInFile = new Map();
    absorbComponentDefinitionsForFile(sourceFile, result) {
        this.importedComponentDefinitionsInFile.set(sourceFile.fileName, result);
    }
    /**
     * Returns if a component for a specific file has been imported.
     * @param fileName
     * @param tagName
     */
    hasTagNameBeenImported(fileName, tagName) {
        for (const file of this.importedComponentDefinitionsInFile.get(fileName) || []) {
            if (file.tagName === tagName) {
                return true;
            }
        }
        return false;
    }
}
exports.DefaultAnalyzerDependencyStore = DefaultAnalyzerDependencyStore;
//# sourceMappingURL=default-analyzer-dependency-store.js.map