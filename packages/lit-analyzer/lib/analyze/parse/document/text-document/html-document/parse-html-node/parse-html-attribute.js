"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtmlNodeAttrs = parseHtmlNodeAttrs;
exports.parseHtmlNodeAttr = parseHtmlNodeAttr;
const constants_js_1 = require("../../../../../constants.js");
const html_node_attr_types_js_1 = require("../../../../../types/html-node/html-node-attr-types.js");
const general_util_js_1 = require("../../../../../util/general-util.js");
const parse_html_attr_assignment_js_1 = require("./parse-html-attr-assignment.js");
/**
 * Creates multiple html attributes based on multiple p5Attributes.
 * @param p5Node
 * @param context
 */
function parseHtmlNodeAttrs(p5Node, context) {
    return p5Node.attrs
        .map(htmlAttr => parseHtmlNodeAttr(p5Node, htmlAttr, {
        ...context,
        htmlNode: context.htmlNode
    }))
        .filter((attr) => attr != null);
}
/**
 * Creates a html attr based on a p5Attr.
 * @param p5Node
 * @param p5Attr
 * @param context
 */
function parseHtmlNodeAttr(p5Node, p5Attr, context) {
    const { htmlNode } = context;
    const { name, modifier } = (0, general_util_js_1.parseLitAttrName)(p5Attr.name);
    const location = makeHtmlAttrLocation(p5Node, p5Attr, context);
    if (location == null) {
        return undefined;
    }
    const htmlAttrBase = {
        name: name.toLowerCase(), // Parse5 lowercases all attributes names. Therefore ".myAttr" becomes ".myattr"
        document: context.document,
        modifier,
        htmlNode,
        location
    };
    const htmlAttr = parseHtmlAttrBase(htmlAttrBase);
    htmlAttr.assignment = (0, parse_html_attr_assignment_js_1.parseHtmlAttrAssignment)(p5Node, p5Attr, htmlAttr, context);
    return htmlAttr;
}
/**
 * Returns source code location based on a p5Node.
 * @param p5Node
 * @param p5Attr
 * @param context
 */
function makeHtmlAttrLocation(p5Node, p5Attr, context) {
    const { name, modifier } = (0, general_util_js_1.parseLitAttrName)(p5Attr.name);
    const sourceLocation = p5Node.sourceCodeLocation;
    if (sourceLocation == null) {
        return undefined;
    }
    // Explicitly call "toLowerCase()" because of inconsistencies in parse5.
    // Parse5 lowercases source code location attr keys but doesnt lowercase the attr name when it comes to svg.
    // It would be correct not to lowercase the attr names because svg is case sensitive
    const sourceCodeLocationName = `${p5Attr.prefix || ""}${(p5Attr.prefix && ":") || ""}${p5Attr.name}`.toLowerCase();
    const htmlAttrLocation = (sourceLocation.startTag?.attrs || {})[sourceCodeLocationName];
    const start = htmlAttrLocation.startOffset;
    const end = htmlAttrLocation.endOffset;
    return {
        start,
        end,
        name: {
            start: start + (modifier ? modifier.length : 0),
            end: start + (modifier ? modifier.length : 0) + name.length
        }
    };
}
function parseHtmlAttrBase(htmlAttrBase) {
    const { modifier } = htmlAttrBase;
    switch (modifier) {
        case constants_js_1.LIT_HTML_EVENT_LISTENER_ATTRIBUTE_MODIFIER:
            return {
                kind: html_node_attr_types_js_1.HtmlNodeAttrKind.EVENT_LISTENER,
                ...htmlAttrBase,
                modifier
            };
        case constants_js_1.LIT_HTML_PROP_ATTRIBUTE_MODIFIER:
            return {
                kind: html_node_attr_types_js_1.HtmlNodeAttrKind.PROPERTY,
                ...htmlAttrBase,
                modifier
            };
        case constants_js_1.LIT_HTML_BOOLEAN_ATTRIBUTE_MODIFIER:
            return {
                kind: html_node_attr_types_js_1.HtmlNodeAttrKind.BOOLEAN_ATTRIBUTE,
                ...htmlAttrBase,
                modifier
            };
        default:
            return {
                kind: html_node_attr_types_js_1.HtmlNodeAttrKind.ATTRIBUTE,
                ...htmlAttrBase,
                modifier: undefined
            };
    }
}
//# sourceMappingURL=parse-html-attribute.js.map