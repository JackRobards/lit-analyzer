"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtmlAttrAssignment = parseHtmlAttrAssignment;
const html_node_attr_assignment_types_js_1 = require("../../../../../types/html-node/html-node-attr-assignment-types.js");
/**
 * Parses a html attribute assignment.
 * @param p5Node
 * @param p5Attr
 * @param htmlAttr
 * @param context
 */
function parseHtmlAttrAssignment(p5Node, p5Attr, htmlAttr, context) {
    const location = getAssignmentLocation(p5Node, p5Attr, htmlAttr, context);
    if (location == null) {
        // A null assignment location might be an element expression, which only
        // has an attribute name and no attribute "assignment".
        if (htmlAttr.name.match(/_+[0-9a-zA-Z]+_/)) {
            // Here we have an element expression, which doesn't have an "assignment"
            // in HTML. The parts will be in the range of the attribute name instead.
            const values = context.getPartsAtOffsetRange(htmlAttr.location);
            return {
                kind: html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.ELEMENT_EXPRESSION,
                htmlAttr,
                location: htmlAttr.location,
                expression: values[0]
            };
        }
        return { kind: html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.BOOLEAN, htmlAttr };
    }
    const values = context.getPartsAtOffsetRange(location);
    if (values.length === 0) {
        return undefined;
    }
    else if (values.length === 1) {
        const value = values[0];
        if (typeof value === "string") {
            return {
                kind: html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.STRING,
                location,
                value,
                htmlAttr
            };
        }
        else {
            return {
                kind: html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.EXPRESSION,
                location,
                expression: value,
                htmlAttr
            };
        }
    }
    else {
        return {
            kind: html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.MIXED,
            location,
            values,
            htmlAttr
        };
    }
}
function getAssignmentLocation(p5Node, p5Attr, htmlAttr, context) {
    const sourceLocation = p5Node.sourceCodeLocation;
    if (sourceLocation == null) {
        return undefined;
    }
    const htmlAttrLocation = (sourceLocation.startTag?.attrs || {})[p5Attr.name];
    if (htmlAttrLocation == null)
        return undefined;
    const nameEndOffset = htmlAttr.location.name.end;
    const htmlAfterName = context.html.substring(nameEndOffset, htmlAttrLocation.endOffset);
    const firstQuote = indexOfRegExp(htmlAfterName, /^([\s=]*)(['"])/);
    const lastQuote = indexOfRegExp(htmlAfterName, /['"]\s*$/);
    const firstEquals = indexOfRegExp(htmlAfterName, /=/);
    // Example: attr
    if (firstEquals == null)
        return undefined;
    // Example: attr=myvalue | attr=myvalue" | attr="myvalue
    if (firstQuote == null || lastQuote == null) {
        return {
            start: nameEndOffset + firstEquals + 1,
            end: htmlAttrLocation.endOffset
        };
    }
    // Example: attr="myvalue"
    return {
        start: nameEndOffset + firstQuote + 1,
        end: nameEndOffset + lastQuote
    };
}
/**
 * Returns the index of a regex match.
 * Returns -1 when no match is found.
 * @param text
 * @param reg
 */
function indexOfRegExp(text, reg) {
    const match = text.match(reg);
    if (match == null)
        return undefined;
    // Support matching with a prefix group that counts as padding
    if (match.length === 3) {
        return match[1].length;
    }
    return match.index;
}
//# sourceMappingURL=parse-html-attr-assignment.js.map