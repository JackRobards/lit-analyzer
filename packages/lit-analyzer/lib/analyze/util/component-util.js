"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeclarationsInFile = getDeclarationsInFile;
const web_component_analyzer_1 = require("@jackolope/web-component-analyzer");
function getDeclarationsInFile(definition, sourceFile) {
    const declarations = new Set();
    emitDeclarationsInFile(definition, sourceFile, decl => declarations.add(decl));
    return Array.from(declarations);
}
function emitDeclarationsInFile(definition, sourceFile, emit) {
    const declaration = definition.declaration;
    if (declaration == null) {
        return;
    }
    if (declaration.sourceFile.fileName === sourceFile.fileName) {
        if (emit(declaration) === false) {
            return;
        }
    }
    (0, web_component_analyzer_1.visitAllHeritageClauses)(declaration, clause => {
        if (clause.declaration && clause.declaration.sourceFile === sourceFile) {
            if (emit(clause.declaration) === false) {
                return;
            }
        }
    });
}
//# sourceMappingURL=component-util.js.map