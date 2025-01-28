"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtmlDocuments = parseHtmlDocuments;
exports.parseHtmlDocument = parseHtmlDocument;
const virtual_html_document_js_1 = require("../../virtual-document/virtual-html-document.js");
const html_document_js_1 = require("./html-document.js");
const parse_html_node_js_1 = require("./parse-html-node/parse-html-node.js");
const parse_html_js_1 = require("./parse-html-p5/parse-html.js");
function parseHtmlDocuments(nodes) {
    return nodes.map(parseHtmlDocument);
}
function parseHtmlDocument(node) {
    const virtualDocument = new virtual_html_document_js_1.VirtualAstHtmlDocument(node);
    const html = virtualDocument.text;
    const htmlAst = (0, parse_html_js_1.parseHtml)(html);
    const document = new html_document_js_1.HtmlDocument(virtualDocument, []);
    const context = {
        html,
        document,
        getPartsAtOffsetRange(range) {
            return virtualDocument.getPartsAtDocumentRange(range);
        }
    };
    document.rootNodes = (0, parse_html_node_js_1.parseHtmlNodes)(htmlAst.childNodes, undefined, context);
    return document;
}
//# sourceMappingURL=parse-html-document.js.map