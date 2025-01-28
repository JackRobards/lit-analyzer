"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LitAnalyzer = void 0;
const component_analyzer_js_1 = require("./component-analyzer/component-analyzer.js");
const lit_css_document_analyzer_js_1 = require("./document-analyzer/css/lit-css-document-analyzer.js");
const lit_html_document_analyzer_js_1 = require("./document-analyzer/html/lit-html-document-analyzer.js");
const rename_locations_for_tag_name_js_1 = require("./document-analyzer/html/rename-locations/rename-locations-for-tag-name.js");
const css_document_js_1 = require("./parse/document/text-document/css-document/css-document.js");
const html_document_js_1 = require("./parse/document/text-document/html-document/html-document.js");
const ts_module_js_1 = require("./ts-module.js");
const array_util_js_1 = require("./util/array-util.js");
const ast_util_js_1 = require("./util/ast-util.js");
const iterable_util_js_1 = require("./util/iterable-util.js");
const range_util_js_1 = require("./util/range-util.js");
class LitAnalyzer {
    context;
    litHtmlDocumentAnalyzer = new lit_html_document_analyzer_js_1.LitHtmlDocumentAnalyzer();
    litCssDocumentAnalyzer = new lit_css_document_analyzer_js_1.LitCssDocumentAnalyzer();
    componentAnalyzer = new component_analyzer_js_1.ComponentAnalyzer();
    constructor(context) {
        this.context = context;
        // Set the Typescript module
        // I plan on removing this function, so only "context.ts" is used.
        (0, ts_module_js_1.setTypescriptModule)(context.ts);
    }
    getOutliningSpansInFile(file) {
        this.context.setContextBase({ file });
        const documents = this.getDocumentsInFile(file);
        this.context.updateComponents(file);
        return (0, array_util_js_1.arrayFlat)(documents.map(document => {
            if (document instanceof css_document_js_1.CssDocument) {
                return [];
            }
            else if (document instanceof html_document_js_1.HtmlDocument) {
                return this.litHtmlDocumentAnalyzer.getOutliningSpans(document);
            }
            return [];
        }));
    }
    getDefinitionAtPosition(file, position) {
        this.context.setContextBase({ file });
        const { document, offset } = this.getDocumentAndOffsetAtPosition(file, position);
        if (document == null)
            return undefined;
        this.context.updateComponents(file);
        if (document instanceof css_document_js_1.CssDocument) {
            return this.litCssDocumentAnalyzer.getDefinitionAtOffset(document, offset, this.context);
        }
        else if (document instanceof html_document_js_1.HtmlDocument) {
            return this.litHtmlDocumentAnalyzer.getDefinitionAtOffset(document, offset, this.context);
        }
        return;
    }
    /**
     * Yields entries that describe regions of code in the given file, and
     * what the analyzer knows about them.
     *
     * This is useful for generating a static index of analysis output. Two such
     * indexing systems are Kythe and the Language Server Index Format.
     */
    *indexFile(file) {
        this.context.updateComponents(file);
        const documents = this.getDocumentsInFile(file);
        for (const document of documents) {
            if (document instanceof html_document_js_1.HtmlDocument) {
                yield* this.litHtmlDocumentAnalyzer.indexFile(document, this.context);
            }
        }
    }
    getQuickInfoAtPosition(file, position) {
        this.context.setContextBase({ file });
        const { document, offset } = this.getDocumentAndOffsetAtPosition(file, position);
        if (document == null)
            return undefined;
        this.context.updateComponents(file);
        if (document instanceof css_document_js_1.CssDocument) {
            return this.litCssDocumentAnalyzer.getQuickInfoAtOffset(document, offset, this.context);
        }
        else if (document instanceof html_document_js_1.HtmlDocument) {
            return this.litHtmlDocumentAnalyzer.getQuickInfoAtOffset(document, offset, this.context);
        }
        return;
    }
    getRenameInfoAtPosition(file, position) {
        this.context.setContextBase({ file });
        const { document, offset } = this.getDocumentAndOffsetAtPosition(file, position);
        if (document != null) {
            if (document instanceof css_document_js_1.CssDocument) {
                return undefined;
            }
            else if (document instanceof html_document_js_1.HtmlDocument) {
                return this.litHtmlDocumentAnalyzer.getRenameInfoAtOffset(document, offset, this.context);
            }
        }
        else {
            const nodeUnderCursor = (0, ast_util_js_1.getNodeAtPosition)(file, position);
            if (nodeUnderCursor == null)
                return undefined;
            if (this.context.ts.isStringLiteralLike(nodeUnderCursor)) {
                const tagName = nodeUnderCursor.text;
                const definition = this.context.definitionStore.getDefinitionForTagName(tagName);
                if (definition != null && (0, ast_util_js_1.nodeIntersects)(nodeUnderCursor, (0, iterable_util_js_1.iterableFirst)(definition.tagNameNodes))) {
                    return {
                        fullDisplayName: tagName,
                        displayName: tagName,
                        range: (0, range_util_js_1.makeSourceFileRange)({ start: nodeUnderCursor.getStart() + 1, end: nodeUnderCursor.getEnd() - 1 }),
                        kind: "label",
                        target: definition
                    };
                }
            }
        }
        return;
    }
    getRenameLocationsAtPosition(file, position) {
        this.context.setContextBase({ file });
        const renameInfo = this.getRenameInfoAtPosition(file, position);
        if (renameInfo == null)
            return [];
        if ("document" in renameInfo) {
            const document = renameInfo.document;
            const offset = document.virtualDocument.sfPositionToDocumentOffset(position);
            if (document instanceof css_document_js_1.CssDocument) {
                return [];
            }
            else {
                return this.litHtmlDocumentAnalyzer.getRenameLocationsAtOffset(document, offset, this.context);
            }
        }
        else {
            return (0, rename_locations_for_tag_name_js_1.renameLocationsForTagName)(renameInfo.target.tagName, this.context);
        }
    }
    getClosingTagAtPosition(file, position) {
        this.context.setContextBase({ file });
        const { document, offset } = this.getDocumentAndOffsetAtPosition(file, position);
        if (document == null)
            return undefined;
        this.context.updateComponents(file);
        if (document instanceof html_document_js_1.HtmlDocument) {
            return this.litHtmlDocumentAnalyzer.getClosingTagAtOffset(document, offset);
        }
        return;
    }
    getCompletionDetailsAtPosition(file, position, name) {
        this.context.setContextBase({ file });
        const { document, offset } = this.getDocumentAndOffsetAtPosition(file, position);
        if (document == null)
            return undefined;
        if (document instanceof css_document_js_1.CssDocument) {
            return this.litCssDocumentAnalyzer.getCompletionDetailsAtOffset(document, offset, name, this.context);
        }
        else if (document instanceof html_document_js_1.HtmlDocument) {
            return this.litHtmlDocumentAnalyzer.getCompletionDetailsAtOffset(document, offset, name, this.context);
        }
        return;
    }
    getCompletionsAtPosition(file, position) {
        this.context.setContextBase({ file });
        const { document, offset } = this.getDocumentAndOffsetAtPosition(file, position);
        if (document == null)
            return undefined;
        this.context.updateComponents(file);
        if (document instanceof css_document_js_1.CssDocument) {
            return this.litCssDocumentAnalyzer.getCompletionsAtOffset(document, offset, this.context);
        }
        else if (document instanceof html_document_js_1.HtmlDocument) {
            return this.litHtmlDocumentAnalyzer.getCompletionsAtOffset(document, offset, this.context);
        }
        return;
    }
    getDiagnosticsInFile(file) {
        this.context.setContextBase({ file, timeout: 7000, throwOnCancellation: true });
        this.context.updateComponents(file);
        this.context.updateDependencies(file);
        const documents = this.getDocumentsInFile(file);
        const diagnostics = [];
        // Get diagnostics for components definitions in this file
        const definitions = this.context.definitionStore.getDefinitionsWithDeclarationInFile(file);
        for (const definition of definitions) {
            if (this.context.isCancellationRequested) {
                break;
            }
            diagnostics.push(...this.componentAnalyzer.getDiagnostics(definition, this.context));
        }
        // Get diagnostics for components in this file
        const declarations = this.context.definitionStore.getComponentDeclarationsInFile(file);
        for (const declaration of declarations) {
            if (this.context.isCancellationRequested) {
                break;
            }
            diagnostics.push(...this.componentAnalyzer.getDiagnostics(declaration, this.context));
        }
        // Get diagnostics for documents in this file
        for (const document of documents) {
            if (this.context.isCancellationRequested) {
                break;
            }
            if (document instanceof css_document_js_1.CssDocument) {
                diagnostics.push(...this.litCssDocumentAnalyzer.getDiagnostics(document, this.context));
            }
            else if (document instanceof html_document_js_1.HtmlDocument) {
                diagnostics.push(...this.litHtmlDocumentAnalyzer.getDiagnostics(document, this.context));
            }
        }
        return diagnostics;
    }
    getCodeFixesAtPositionRange(file, sourceFileRange) {
        this.context.setContextBase({ file });
        const { document } = this.getDocumentAndOffsetAtPosition(file, sourceFileRange.start);
        this.context.updateComponents(file);
        this.context.updateDependencies(file);
        // Return fixes for intersecting document
        if (document instanceof html_document_js_1.HtmlDocument) {
            return this.litHtmlDocumentAnalyzer.getCodeFixesAtOffsetRange(document, (0, range_util_js_1.sfRangeToDocumentRange)(document, sourceFileRange), this.context);
        }
        // Else, return fixes for components in this file
        else {
            const definitions = this.context.definitionStore.getDefinitionsWithDeclarationInFile(file);
            for (const definition of definitions) {
                const result = this.componentAnalyzer.getCodeFixesAtOffsetRange(definition, (0, range_util_js_1.makeSourceFileRange)(sourceFileRange), this.context);
                if (result.length > 0) {
                    return result;
                }
            }
            const components = this.context.definitionStore.getComponentDeclarationsInFile(file);
            for (const component of components) {
                const result = this.componentAnalyzer.getCodeFixesAtOffsetRange(component, (0, range_util_js_1.makeSourceFileRange)(sourceFileRange), this.context);
                if (result.length > 0) {
                    return result;
                }
            }
        }
        return [];
    }
    getFormatEditsInFile(file, settings) {
        this.context.setContextBase({ file });
        const documents = this.getDocumentsInFile(file);
        return (0, array_util_js_1.arrayFlat)(documents.map(document => {
            if (document instanceof css_document_js_1.CssDocument) {
                return [];
            }
            else if (document instanceof html_document_js_1.HtmlDocument) {
                return this.litHtmlDocumentAnalyzer.getFormatEdits(document, settings);
            }
            return [];
        }));
    }
    getDocumentAndOffsetAtPosition(sourceFile, position) {
        const document = this.context.documentStore.getDocumentAtPosition(sourceFile, position, this.context.config);
        return {
            document,
            offset: document != null ? document.virtualDocument.sfPositionToDocumentOffset(position) : -1
        };
    }
    getDocumentsInFile(sourceFile) {
        return this.context.documentStore.getDocumentsInFile(sourceFile, this.context.config);
    }
}
exports.LitAnalyzer = LitAnalyzer;
//# sourceMappingURL=lit-analyzer.js.map