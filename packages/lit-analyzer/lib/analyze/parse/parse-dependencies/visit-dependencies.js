"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitIndirectImportsFromSourceFile = visitIndirectImportsFromSourceFile;
exports.isFacadeModule = isFacadeModule;
/**
 * Visits all indirect imports from a source file
 * Emits them using "emitIndirectImport" callback
 * @param sourceFile
 * @param context
 */
function visitIndirectImportsFromSourceFile(sourceFile, context) {
    const currentDepth = context.depth ?? 0;
    // Emit a visit. If this file has been seen already, the function will return false, and traversal will stop
    if (!context.emitIndirectImport(sourceFile)) {
        return;
    }
    const inExternal = context.program.isSourceFileFromExternalLibrary(sourceFile);
    // Check if we have traversed too deep
    if (inExternal && currentDepth >= (context.maxExternalDepth ?? Infinity)) {
        return;
    }
    else if (!inExternal && currentDepth >= (context.maxInternalDepth ?? Infinity)) {
        return;
    }
    // Get all direct imports from the cache
    let directImports = context.directImportCache.get(sourceFile);
    if (directImports == null) {
        // If the cache didn't have all direct imports, build up using the visitor function
        directImports = new Set();
        const newContext = {
            ...context,
            emitDirectImport(file) {
                directImports.add(file);
            }
        };
        // Emit all direct imports
        visitDirectImports(sourceFile, newContext);
        // Cache the result
        context.directImportCache.set(sourceFile, directImports);
    }
    else {
        // Updated references to newest source files
        const updatedImports = new Set();
        for (const sf of directImports) {
            const updatedSf = context.program.getSourceFile(sf.fileName);
            if (updatedSf != null) {
                updatedImports.add(updatedSf);
            }
        }
        directImports = updatedImports;
    }
    // Call this function recursively on all direct imports from this source file
    for (const file of directImports) {
        const toExternal = context.program.isSourceFileFromExternalLibrary(file);
        const fromProjectToExternal = !inExternal && toExternal;
        // It's possible to only follow external dependencies from the source file of interest (depth 0)
        /*if (fromProjectToExternal && currentDepth !== 0) {
         continue;
         }*/
        // Calculate new depth. Reset depth to 1 if we go from a project module to an external module.
        // This will make sure that we always go X modules deep into external modules
        let newDepth;
        if (fromProjectToExternal) {
            newDepth = 1;
        }
        else {
            newDepth = currentDepth + 1;
        }
        if (isFacadeModule(file, context.ts)) {
            // Facade modules are ignored when calculating depth
            newDepth--;
        }
        // Visit direct imported source files recursively
        visitIndirectImportsFromSourceFile(file, {
            ...context,
            depth: newDepth
        });
    }
}
/**
 * Visits all direct imports in an AST.
 * Emits them using "emitDirectImport"
 * @param node
 * @param context
 */
function visitDirectImports(node, context) {
    if (node == null)
        return;
    // Handle top level imports/exports: (import "..."), (import { ... } from "..."), (export * from "...")
    if ((context.ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly) || (context.ts.isExportDeclaration(node) && !node.isTypeOnly)) {
        if (node.moduleSpecifier != null && context.ts.isStringLiteral(node.moduleSpecifier) && context.ts.isSourceFile(node.parent)) {
            // Potentially ignore all imports/exports with named imports/exports because importing an interface would not
            //    necessarily result in the custom element being defined. An even better solution would be to ignore all
            //    import declarations with only interface-like/type-alias imports.
            /*if (("importClause" in node && node.importClause != null) || ("exportClause" in node && node.exportClause != null)) {
             return;
             }*/
            const namedBindings = context.ts.isImportDeclaration(node) && node.importClause?.namedBindings;
            // Exclude files that only have type imports like `import { type MyElement } from "./file1"`
            if (namedBindings &&
                context.ts.isNamedImports(namedBindings) &&
                namedBindings.elements.length > 0 &&
                namedBindings.elements.every(e => e.isTypeOnly)) {
                return;
            }
            emitDirectModuleImportWithName(node.moduleSpecifier.text, node, context);
        }
    }
    // Handle async imports (await import(...))
    else if (context.ts.isCallExpression(node) && node.expression.kind === context.ts.SyntaxKind.ImportKeyword) {
        const moduleSpecifier = node.arguments[0];
        if (moduleSpecifier != null && context.ts.isStringLiteralLike(moduleSpecifier)) {
            emitDirectModuleImportWithName(moduleSpecifier.text, node, context);
        }
    }
    node.forEachChild(child => visitDirectImports(child, context));
}
/**
 * Resolves and emits a direct imported module
 * @param moduleSpecifier
 * @param node
 * @param context
 */
function emitDirectModuleImportWithName(moduleSpecifier, node, context) {
    const fromSourceFile = node.getSourceFile();
    // Resolve the imported string
    let result;
    if (context.project && "getResolvedModuleWithFailedLookupLocationsFromCache" in context.project) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result = context.project.getResolvedModuleWithFailedLookupLocationsFromCache(moduleSpecifier, fromSourceFile.fileName);
    }
    else if ("getResolvedModuleWithFailedLookupLocationsFromCache" in context.program) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result = context.program["getResolvedModuleWithFailedLookupLocationsFromCache"](moduleSpecifier, fromSourceFile.fileName);
    }
    else {
        const cache = context.program.getModuleResolutionCache?.();
        let mode = undefined;
        if (context.ts.isImportDeclaration(node) || context.ts.isExportDeclaration(node)) {
            if (node.moduleSpecifier != null && context.ts.isStringLiteral(node.moduleSpecifier) && context.ts.isSourceFile(node.parent)) {
                mode = context.program.getModeForUsageLocation(fromSourceFile, node.moduleSpecifier);
            }
        }
        if (cache != null) {
            result = context.ts.resolveModuleNameFromCache(moduleSpecifier, node.getSourceFile().fileName, cache, mode);
        }
        if (result == null) {
            // Result could not be found from the cache, try and resolve module without using the
            // cache.
            result = context.ts.resolveModuleName(moduleSpecifier, node.getSourceFile().fileName, context.program.getCompilerOptions(), context.ts.createCompilerHost(context.program.getCompilerOptions()));
        }
    }
    if (result?.resolvedModule?.resolvedFileName != null) {
        const resolvedModule = result.resolvedModule;
        const sourceFile = context.program.getSourceFile(resolvedModule.resolvedFileName);
        if (sourceFile != null) {
            context.emitDirectImport?.(sourceFile);
        }
    }
}
/**
 * Returns whether a SourceFile is a Facade Module.
 * A Facade Module only consists of import and export declarations.
 * @param sourceFile
 * @param ts
 */
function isFacadeModule(sourceFile, ts) {
    const statements = sourceFile.statements;
    const isFacade = statements.every(statement => {
        return ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement);
    });
    return isFacade;
}
//# sourceMappingURL=visit-dependencies.js.map