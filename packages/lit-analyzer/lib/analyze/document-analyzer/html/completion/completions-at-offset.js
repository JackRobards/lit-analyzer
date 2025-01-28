"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completionsAtOffset = completionsAtOffset;
const get_position_context_in_document_js_1 = require("../../../util/get-position-context-in-document.js");
const range_util_js_1 = require("../../../util/range-util.js");
const completions_for_html_attr_values_js_1 = require("./completions-for-html-attr-values.js");
const completions_for_html_attrs_js_1 = require("./completions-for-html-attrs.js");
const completions_for_html_nodes_js_1 = require("./completions-for-html-nodes.js");
function completionsAtOffset(document, offset, context) {
    const positionContext = (0, get_position_context_in_document_js_1.getPositionContextInDocument)(document, offset);
    const { beforeWord } = positionContext;
    // Get possible intersecting html attribute or attribute area.
    const intersectingAttr = document.htmlAttrNameAtOffset(offset);
    const intersectingAttrAreaNode = document.htmlAttrAreaAtOffset(offset);
    const intersectingAttrAssignment = document.htmlAttrAssignmentAtOffset(offset);
    const intersectingClosestNode = document.htmlNodeClosestToOffset(offset);
    // Get entries from the extensions
    if (intersectingAttr != null) {
        const entries = (0, completions_for_html_attrs_js_1.completionsForHtmlAttrs)(intersectingAttr.htmlNode, positionContext, context);
        // Make sure that every entry overwrites the entire attribute name.
        return entries.map(entry => ({
            ...entry,
            range: (0, range_util_js_1.rangeFromHtmlNodeAttr)(intersectingAttr)
        }));
    }
    else if (intersectingAttrAssignment != null) {
        return (0, completions_for_html_attr_values_js_1.completionsForHtmlAttrValues)(intersectingAttrAssignment, positionContext, context);
    }
    else if (intersectingAttrAreaNode != null) {
        return (0, completions_for_html_attrs_js_1.completionsForHtmlAttrs)(intersectingAttrAreaNode, positionContext, context);
    }
    else if (beforeWord === "<" || beforeWord === "/") {
        return (0, completions_for_html_nodes_js_1.completionsForHtmlNodes)(document, intersectingClosestNode, positionContext, context);
    }
    return [];
}
//# sourceMappingURL=completions-at-offset.js.map