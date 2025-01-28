"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LitCssDocumentAnalyzer = void 0;
const ast_util_js_1 = require("../../util/ast-util.js");
const get_position_context_in_document_js_1 = require("../../util/get-position-context-in-document.js");
const iterable_util_js_1 = require("../../util/iterable-util.js");
const range_util_js_1 = require("../../util/range-util.js");
const lit_css_vscode_service_js_1 = require("./lit-css-vscode-service.js");
class LitCssDocumentAnalyzer {
    vscodeCssService = new lit_css_vscode_service_js_1.LitCssVscodeService();
    completionsCache = [];
    getCompletionDetailsAtOffset(document, offset, name, context) {
        const completionWithName = this.completionsCache.find(completion => completion.name === name);
        if (completionWithName == null || completionWithName.documentation == null)
            return undefined;
        const primaryInfo = completionWithName.documentation();
        if (primaryInfo == null)
            return undefined;
        return {
            name,
            kind: completionWithName.kind,
            primaryInfo
        };
    }
    getCompletionsAtOffset(document, offset, context) {
        this.completionsCache = this.vscodeCssService.getCompletions(document, offset, context);
        return this.completionsCache;
    }
    getQuickInfoAtOffset(document, offset, context) {
        return this.vscodeCssService.getQuickInfo(document, offset, context);
    }
    getDiagnostics(document, context) {
        return this.vscodeCssService.getDiagnostics(document, context);
    }
    getDefinitionAtOffset(document, offset, context) {
        const positionContext = (0, get_position_context_in_document_js_1.getPositionContextInDocument)(document, offset);
        const word = positionContext.word;
        const start = offset - positionContext.leftWord.length;
        const end = start + word.length;
        // Return definitions for css custom properties
        if (word.startsWith("-")) {
            for (const cssProp of context.htmlStore.getAllCssPropertiesForTag("")) {
                if (cssProp.name === word) {
                    const nodes = (0, iterable_util_js_1.iterableDefined)((cssProp.related != null ? cssProp.related : [cssProp]).map(p => p.declaration?.declaration?.node));
                    if (nodes.length === 0) {
                        return;
                    }
                    return {
                        fromRange: (0, range_util_js_1.documentRangeToSFRange)(document, { start, end }),
                        targets: nodes.map(node => ({
                            kind: "node",
                            node: (0, ast_util_js_1.getNodeIdentifier)(node, context.ts) || node
                        }))
                    };
                }
            }
        }
        // Return definitions for custom elements
        else {
            const definition = context.definitionStore.getDefinitionForTagName(word);
            if (definition != null && definition.declaration != null) {
                const node = definition.declaration.node;
                return {
                    fromRange: (0, range_util_js_1.documentRangeToSFRange)(document, { start, end }),
                    targets: [
                        {
                            kind: "node",
                            node: (0, ast_util_js_1.getNodeIdentifier)(node, context.ts) || node
                        }
                    ]
                };
            }
        }
        return undefined;
    }
}
exports.LitCssDocumentAnalyzer = LitCssDocumentAnalyzer;
//# sourceMappingURL=lit-css-document-analyzer.js.map