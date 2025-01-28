"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTagNode = isTagNode;
exports.isDocumentFragmentNode = isDocumentFragmentNode;
exports.isTextNode = isTextNode;
exports.isCommentNode = isCommentNode;
exports.parseHtml = parseHtml;
const parse5_1 = require("parse5");
/**
 * Returns if a p5Node is a tag node.
 * @param node
 */
function isTagNode(node) {
    return !node.nodeName.includes("#");
}
/**
 * Returns if a p5Node is a document fragment.
 * @param node
 */
function isDocumentFragmentNode(node) {
    return node.nodeName === "#document-fragment";
}
/**
 * Returns if a p5Node is a text node.
 * @param node
 */
function isTextNode(node) {
    return node.nodeName === "#text";
}
/**
 * Returns if a p5Node is a comment node.
 * @param node
 */
function isCommentNode(node) {
    return node.nodeName === "#comment";
}
/**
 * Parse a html string into p5Nodes.
 * @param html
 */
function parseHtml(html) {
    return (0, parse5_1.parseFragment)(html, { sourceCodeLocationInfo: true });
}
//# sourceMappingURL=parse-html.js.map