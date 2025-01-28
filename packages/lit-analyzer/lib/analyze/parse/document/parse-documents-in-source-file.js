"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDocumentsInSourceFile = parseDocumentsInSourceFile;
const html_node_types_js_1 = require("../../types/html-node/html-node-types.js");
const array_util_js_1 = require("../../util/array-util.js");
const range_util_js_1 = require("../../util/range-util.js");
const find_tagged_templates_js_1 = require("../tagged-template/find-tagged-templates.js");
const css_document_js_1 = require("./text-document/css-document/css-document.js");
const html_document_js_1 = require("./text-document/html-document/html-document.js");
const parse_html_document_js_1 = require("./text-document/html-document/parse-html-document.js");
const virtual_css_document_js_1 = require("./virtual-document/virtual-css-document.js");
function parseDocumentsInSourceFile(sourceFile, options, position) {
    // Parse html tags in the relevant source file
    const templateTags = [...options.cssTags, ...options.htmlTags];
    const taggedTemplates = (0, find_tagged_templates_js_1.findTaggedTemplates)(sourceFile, templateTags, position);
    let result = undefined;
    if (taggedTemplates == null) {
        return undefined;
    }
    else if (Array.isArray(taggedTemplates)) {
        result = taggedTemplates.map(t => taggedTemplateToDocument(t, options));
    }
    else {
        result = taggedTemplateToDocument(taggedTemplates, options);
    }
    if (result == null)
        return undefined;
    if (Array.isArray(result)) {
        return (0, array_util_js_1.arrayFlat)(result.map(document => {
            const res = unpackHtmlDocument(document, position);
            return [document, ...(res == null ? [] : Array.isArray(res) ? res : [res])];
        }));
    }
    else {
        const nestedDocuments = unpackHtmlDocument(result, position);
        if (position != null && nestedDocuments != null) {
            return nestedDocuments;
        }
    }
    return result;
}
function taggedTemplateToDocument(taggedTemplate, { cssTags }) {
    const tag = taggedTemplate.tag.getText();
    if (cssTags.includes(tag)) {
        return new css_document_js_1.CssDocument(new virtual_css_document_js_1.VirtualAstCssDocument(taggedTemplate));
    }
    else {
        return (0, parse_html_document_js_1.parseHtmlDocument)(taggedTemplate);
    }
}
function unpackHtmlDocument(textDocument, position) {
    const documents = [];
    if (textDocument instanceof html_document_js_1.HtmlDocument) {
        for (const rootNode of textDocument.rootNodes) {
            if (rootNode.kind === html_node_types_js_1.HtmlNodeKind.STYLE && rootNode.location.endTag != null) {
                if (position == null) {
                    const nestedDocument = styleHtmlNodeToCssDocument(textDocument, rootNode);
                    if (nestedDocument != null) {
                        documents.push(nestedDocument);
                    }
                }
                else if ((0, range_util_js_1.intersects)(textDocument.virtualDocument.sfPositionToDocumentOffset(position), {
                    start: rootNode.location.startTag.end,
                    end: rootNode.location.endTag.start
                })) {
                    return styleHtmlNodeToCssDocument(textDocument, rootNode);
                }
            }
        }
    }
    if (position != null)
        return undefined;
    return documents;
}
function styleHtmlNodeToCssDocument(htmlDocument, styleNode) {
    if (styleNode.location.endTag == null)
        return undefined;
    const cssDocumentParts = htmlDocument.virtualDocument.getPartsAtDocumentRange((0, range_util_js_1.makeDocumentRange)({
        start: styleNode.location.startTag.start,
        end: styleNode.location.endTag.start
    }));
    const cssVirtualDocument = new virtual_css_document_js_1.VirtualAstCssDocument(cssDocumentParts, (0, range_util_js_1.documentRangeToSFRange)(htmlDocument, styleNode.location.startTag), htmlDocument.virtualDocument.fileName);
    return new css_document_js_1.CssDocument(cssVirtualDocument);
}
//# sourceMappingURL=parse-documents-in-source-file.js.map