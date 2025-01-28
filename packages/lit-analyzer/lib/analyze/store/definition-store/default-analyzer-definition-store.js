"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAnalyzerDefinitionStore = void 0;
const web_component_analyzer_1 = require("@jackolope/web-component-analyzer");
const component_util_js_1 = require("../../util/component-util.js");
class DefaultAnalyzerDefinitionStore {
    analysisResultForFile = new Map();
    definitionForTagName = new Map();
    intersectingDefinitionsForFile = new Map();
    absorbAnalysisResult(sourceFile, result) {
        this.analysisResultForFile.set(sourceFile.fileName, result);
        result.componentDefinitions.forEach(definition => {
            this.definitionForTagName.set(definition.tagName, definition);
            addToSetInMap(this.intersectingDefinitionsForFile, definition.sourceFile.fileName, definition);
            if (definition.declaration == null) {
                return;
            }
            addToSetInMap(this.intersectingDefinitionsForFile, definition.declaration?.sourceFile.fileName, definition);
            (0, web_component_analyzer_1.visitAllHeritageClauses)(definition.declaration, clause => {
                if (clause.declaration != null) {
                    addToSetInMap(this.intersectingDefinitionsForFile, clause.declaration.sourceFile.fileName, definition);
                }
            });
        });
    }
    forgetAnalysisResultForFile(sourceFile) {
        const result = this.analysisResultForFile.get(sourceFile.fileName);
        if (result == null)
            return;
        result.componentDefinitions.forEach(definition => {
            this.definitionForTagName.delete(definition.tagName);
            this.intersectingDefinitionsForFile.get(definition.sourceFile.fileName)?.delete(definition);
            if (definition.declaration == null) {
                return;
            }
            this.intersectingDefinitionsForFile.get(definition.declaration?.sourceFile.fileName)?.delete(definition);
            (0, web_component_analyzer_1.visitAllHeritageClauses)(definition.declaration, clause => {
                if (clause.declaration != null) {
                    this.intersectingDefinitionsForFile.get(clause.declaration.sourceFile.fileName)?.delete(definition);
                }
            });
        });
        this.analysisResultForFile.delete(sourceFile.fileName);
    }
    getAnalysisResultForFile(sourceFile) {
        return this.analysisResultForFile.get(sourceFile.fileName);
    }
    getDefinitionsWithDeclarationInFile(sourceFile) {
        return Array.from(this.intersectingDefinitionsForFile.get(sourceFile.fileName) || []);
    }
    getComponentDeclarationsInFile(sourceFile) {
        const declarations = new Set();
        for (const definition of this.intersectingDefinitionsForFile.get(sourceFile.fileName) || []) {
            for (const declaration of (0, component_util_js_1.getDeclarationsInFile)(definition, sourceFile)) {
                declarations.add(declaration);
            }
        }
        return Array.from(declarations);
    }
    getDefinitionForTagName(tagName) {
        return this.definitionForTagName.get(tagName);
    }
    getDefinitionsInFile(sourceFile) {
        const result = this.analysisResultForFile.get(sourceFile.fileName);
        return (result != null && result.componentDefinitions) || [];
    }
}
exports.DefaultAnalyzerDefinitionStore = DefaultAnalyzerDefinitionStore;
function addToSetInMap(map, key, value) {
    const set = map.get(key) || new Set();
    set.add(value);
    map.set(key, set);
}
//# sourceMappingURL=default-analyzer-definition-store.js.map