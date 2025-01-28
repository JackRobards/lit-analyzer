"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtmlNodes = parseHtmlNodes;
exports.parseHtmlNode = parseHtmlNode;
const constants_js_1 = require("../../../../../constants.js");
const html_node_types_js_1 = require("../../../../../types/html-node/html-node-types.js");
const parse_html_js_1 = require("../parse-html-p5/parse-html.js");
const parse_html_attribute_js_1 = require("./parse-html-attribute.js");
/**
 * Parses multiple p5Nodes into multiple html nodes.
 * @param p5Nodes
 * @param parent
 * @param context
 */
function parseHtmlNodes(p5Nodes, parent, context) {
    const htmlNodes = [];
    let ignoreNextNode = false;
    for (const p5Node of p5Nodes) {
        // Check ts-ignore comments and indicate that we wan't to ignore the next node
        if ((0, parse_html_js_1.isCommentNode)(p5Node)) {
            if (p5Node.data != null && p5Node.data.includes(constants_js_1.TS_IGNORE_FLAG)) {
                ignoreNextNode = true;
            }
        }
        if ((0, parse_html_js_1.isTagNode)(p5Node)) {
            if (!ignoreNextNode) {
                const htmlNode = parseHtmlNode(p5Node, parent, context);
                if (htmlNode != null) {
                    htmlNodes.push(htmlNode);
                }
            }
            else {
                ignoreNextNode = false;
            }
        }
    }
    return htmlNodes;
}
/**
 * Parses a single p5Node into a html node.
 * @param p5Node
 * @param parent
 * @param context
 */
function parseHtmlNode(p5Node, parent, context) {
    // `sourceCodeLocation` will be undefined if the element was implicitly created by the parser.
    if (p5Node.sourceCodeLocation == null)
        return undefined;
    const htmlNodeBase = {
        tagName: p5Node.tagName.toLowerCase(),
        attributes: [],
        location: makeHtmlNodeLocation(p5Node, context),
        children: [],
        document: context.document,
        parent
    };
    const htmlNode = parseHtmlNodeBase(htmlNodeBase);
    // Don't parse children of <style> and <svg> as of now
    if (htmlNode.kind === html_node_types_js_1.HtmlNodeKind.NODE) {
        htmlNode.children = parseHtmlNodes(p5Node.childNodes || [], htmlNode, context);
    }
    htmlNode.attributes = (0, parse_html_attribute_js_1.parseHtmlNodeAttrs)(p5Node, { ...context, htmlNode });
    return htmlNode;
}
/**
 * Creates source code location from a p5Node.
 * @param p5Node
 * @param context
 */
function makeHtmlNodeLocation(p5Node, context) {
    const loc = p5Node.sourceCodeLocation;
    return {
        start: loc.startOffset,
        end: loc.endOffset,
        name: {
            start: loc.startTag.startOffset + 1, // take '<' into account
            end: loc.startTag.startOffset + 1 + p5Node.tagName.length
        },
        startTag: {
            start: loc.startTag.startOffset,
            end: loc.startTag.endOffset
        },
        endTag: loc.endTag == null
            ? undefined
            : {
                start: loc.endTag.startOffset,
                end: loc.endTag.endOffset
            }
    };
}
function parseHtmlNodeBase(htmlNodeBase) {
    if (htmlNodeBase.tagName === "style") {
        return {
            kind: html_node_types_js_1.HtmlNodeKind.STYLE,
            ...htmlNodeBase,
            children: []
        };
    }
    else if (htmlNodeBase.tagName === "svg") {
        // Ignore children of "svg" for now
        return {
            kind: html_node_types_js_1.HtmlNodeKind.SVG,
            ...htmlNodeBase,
            children: []
        };
    }
    return {
        kind: html_node_types_js_1.HtmlNodeKind.NODE,
        ...htmlNodeBase
    };
    /*if (component != null) {
     return {
     ...htmlNodeBase,
     kind: HtmlNodeKind.COMPONENT,
     component
     };
     }

     if (isBuiltInTag(htmlNodeBase.tagName)) {
     // For now: opt out of svg and style children tags
     // TODO: Handle svg and style tags
     const isBlacklisted = ["svg", "style"].includes(htmlNodeBase.tagName);

     return {
     ...htmlNodeBase,
     kind: HtmlNodeKind.BUILT_IN,
     children: isBlacklisted ? [] : htmlNodeBase.children
     };
     }*/
    /*return {
     kind: HtmlNodeKind.UNKNOWN,
     ...htmlNodeBase
     };*/
}
//# sourceMappingURL=parse-html-node.js.map