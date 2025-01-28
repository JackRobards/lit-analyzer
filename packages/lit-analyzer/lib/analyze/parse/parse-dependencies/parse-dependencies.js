"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDependencies = parseDependencies;
exports.parseAllIndirectImports = parseAllIndirectImports;
const visit_dependencies_js_1 = require("./visit-dependencies.js");
// A cache used to prevent traversing through entire source files multiple times to find direct imports
const DIRECT_IMPORT_CACHE = new WeakMap();
// Two caches used to return the result of of a known source file right away
const RESULT_CACHE = new WeakMap();
const IMPORTED_SOURCE_FILES_CACHE = new WeakMap();
/**
 * Returns a map of imported component definitions in each file encountered from a source file recursively.
 * @param sourceFile
 * @param context
 */
function parseDependencies(sourceFile, context) {
    if (RESULT_CACHE.has(sourceFile)) {
        let invalidate = false;
        // Check if the cache has been invalidated
        for (const file of IMPORTED_SOURCE_FILES_CACHE.get(sourceFile) || []) {
            // If we get a SourceFile with a certain fileName but it's not the same reference, the file has been updated
            if (context.program.getSourceFile(file.fileName) !== file) {
                invalidate = true;
                break;
            }
        }
        if (invalidate) {
            RESULT_CACHE.delete(sourceFile);
            IMPORTED_SOURCE_FILES_CACHE.delete(sourceFile);
        }
        else {
            return RESULT_CACHE.get(sourceFile);
        }
    }
    // Get all indirectly imported source files from this the source file
    const importedSourceFiles = parseAllIndirectImports(sourceFile, context);
    IMPORTED_SOURCE_FILES_CACHE.set(sourceFile, importedSourceFiles);
    // Get component definitions from all these source files
    const definitions = new Set();
    for (const file of importedSourceFiles) {
        for (const def of context.definitionStore.getDefinitionsInFile(file)) {
            definitions.add(def);
        }
    }
    // Cache the result
    const result = Array.from(definitions);
    RESULT_CACHE.set(sourceFile, result);
    return result;
}
/**
 * Returns a map of component declarations in each file encountered from a source file recursively.
 * @param sourceFile
 * @param context
 * @param maxExternalDepth
 * @param minExternalDepth
 */
function parseAllIndirectImports(sourceFile, context, { maxExternalDepth, maxInternalDepth } = {}) {
    const importedSourceFiles = new Set();
    (0, visit_dependencies_js_1.visitIndirectImportsFromSourceFile)(sourceFile, {
        project: context.project,
        program: context.program,
        ts: context.ts,
        directImportCache: DIRECT_IMPORT_CACHE,
        maxExternalDepth: maxExternalDepth ?? context.config.maxNodeModuleImportDepth,
        maxInternalDepth: maxInternalDepth ?? context.config.maxProjectImportDepth,
        emitIndirectImport(file) {
            if (importedSourceFiles.has(file)) {
                return false;
            }
            importedSourceFiles.add(file);
            return true;
        }
    });
    return importedSourceFiles;
}
//# sourceMappingURL=parse-dependencies.js.map