"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LitHtmlDocumentAnalyzer = void 0;
const html_node_attr_types_js_1 = require("../../types/html-node/html-node-attr-types.js");
const html_node_types_js_1 = require("../../types/html-node/html-node-types.js");
const lit_outlining_span_js_1 = require("../../types/lit-outlining-span.js");
const iterable_util_js_1 = require("../../util/iterable-util.js");
const range_util_js_1 = require("../../util/range-util.js");
const code_fixes_for_html_document_js_1 = require("./code-fix/code-fixes-for-html-document.js");
const completions_at_offset_js_1 = require("./completion/completions-at-offset.js");
const definition_for_html_attr_js_1 = require("./definition/definition-for-html-attr.js");
const definition_for_html_node_js_1 = require("./definition/definition-for-html-node.js");
const validate_html_document_js_1 = require("./diagnostic/validate-html-document.js");
const lit_html_vscode_service_js_1 = require("./lit-html-vscode-service.js");
const quick_info_for_html_attr_js_1 = require("./quick-info/quick-info-for-html-attr.js");
const quick_info_for_html_node_js_1 = require("./quick-info/quick-info-for-html-node.js");
const rename_locations_at_offset_js_1 = require("./rename-locations/rename-locations-at-offset.js");
class LitHtmlDocumentAnalyzer {
    vscodeHtmlService = new lit_html_vscode_service_js_1.LitHtmlVscodeService();
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
        this.completionsCache = (0, completions_at_offset_js_1.completionsAtOffset)(document, offset, context);
        return (0, completions_at_offset_js_1.completionsAtOffset)(document, offset, context);
    }
    getDiagnostics(document, context) {
        return (0, validate_html_document_js_1.validateHTMLDocument)(document, context);
    }
    getClosingTagAtOffset(document, offset) {
        return this.vscodeHtmlService.getClosingTagAtOffset(document, offset);
    }
    getCodeFixesAtOffsetRange(document, offsetRange, context) {
        const hit = document.htmlNodeOrAttrAtOffset(offsetRange);
        if (hit == null)
            return [];
        return (0, code_fixes_for_html_document_js_1.codeFixesForHtmlDocument)(document, offsetRange, context);
    }
    getDefinitionAtOffset(document, offset, context) {
        const hit = document.htmlNodeOrAttrAtOffset(offset);
        if (hit == null)
            return undefined;
        if ((0, html_node_types_js_1.isHTMLNode)(hit)) {
            return (0, definition_for_html_node_js_1.definitionForHtmlNode)(hit, context);
        }
        else if ((0, html_node_attr_types_js_1.isHTMLAttr)(hit)) {
            return (0, definition_for_html_attr_js_1.definitionForHtmlAttr)(hit, context);
        }
        return;
    }
    getRenameInfoAtOffset(document, offset, context) {
        const hit = document.htmlNodeOrAttrAtOffset(offset);
        if (hit == null)
            return undefined;
        if ((0, html_node_types_js_1.isHTMLNode)(hit)) {
            return {
                kind: "memberVariableElement",
                fullDisplayName: hit.tagName,
                displayName: hit.tagName,
                range: (0, range_util_js_1.documentRangeToSFRange)(document, { ...hit.location.name }),
                document,
                target: hit
            };
        }
        return;
    }
    getRenameLocationsAtOffset(document, offset, context) {
        return (0, rename_locations_at_offset_js_1.renameLocationsAtOffset)(document, offset, context);
    }
    getQuickInfoAtOffset(document, offset, context) {
        const hit = document.htmlNodeOrAttrAtOffset(offset);
        if (hit == null)
            return undefined;
        if ((0, html_node_types_js_1.isHTMLNode)(hit)) {
            return (0, quick_info_for_html_node_js_1.quickInfoForHtmlNode)(hit, context);
        }
        if ((0, html_node_attr_types_js_1.isHTMLAttr)(hit)) {
            return (0, quick_info_for_html_attr_js_1.quickInfoForHtmlAttr)(hit, context);
        }
        return;
    }
    getOutliningSpans(document) {
        return (0, iterable_util_js_1.iterableDefined)(document.mapNodes(node => {
            if (node.location.endTag == null)
                return undefined;
            // Calculate last index of the collapsed span.
            // We don't want to include the last line because it will include the </endtag> in the collapsed region
            const endIndex = (() => {
                const lastChild = node.children[node.children.length - 1];
                if (lastChild != null) {
                    return lastChild.location.endTag != null ? lastChild.location.endTag.start : lastChild.location.startTag.end;
                }
                return node.location.endTag.start;
            })();
            return {
                autoCollapse: false,
                bannerText: node.tagName,
                kind: lit_outlining_span_js_1.LitOutliningSpanKind.Code,
                location: (0, range_util_js_1.documentRangeToSFRange)(document, { start: node.location.startTag.end, end: endIndex })
            };
        }));
    }
    getFormatEdits(document, settings) {
        return this.vscodeHtmlService.format(document, settings);
    }
    *indexFile(document, context) {
        for (const node of document.nodes()) {
            const definition = (0, definition_for_html_node_js_1.definitionForHtmlNode)(node, context);
            if (definition != null) {
                yield { kind: "NODE-REFERENCE", node, document, definition };
            }
            for (const attribute of node.attributes) {
                const definition = (0, definition_for_html_attr_js_1.definitionForHtmlAttr)(attribute, context);
                if (definition != null) {
                    yield { kind: "ATTRIBUTE-REFERENCE", attribute, document, definition };
                }
            }
        }
    }
}
exports.LitHtmlDocumentAnalyzer = LitHtmlDocumentAnalyzer;
//# sourceMappingURL=lit-html-document-analyzer.js.map