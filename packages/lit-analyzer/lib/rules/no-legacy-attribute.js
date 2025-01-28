"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const html_node_attr_assignment_types_js_1 = require("../analyze/types/html-node/html-node-attr-assignment-types.js");
const html_node_attr_types_js_1 = require("../analyze/types/html-node/html-node-attr-types.js");
const html_node_types_js_1 = require("../analyze/types/html-node/html-node-types.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
const LEGACY_ASSIGNMENT = /^(\[\[[^\]]+\]\]|{{[^}]+}})/;
/**
 * This rule validates that legacy Polymer attribute bindings are not used.
 */
const rule = {
    id: "no-legacy-attribute",
    meta: {
        priority: "medium"
    },
    visitHtmlAttribute(htmlAttr, context) {
        if (htmlAttr.htmlNode.kind !== html_node_types_js_1.HtmlNodeKind.NODE) {
            return;
        }
        if (htmlAttr.kind !== html_node_attr_types_js_1.HtmlNodeAttrKind.ATTRIBUTE && htmlAttr.kind !== html_node_attr_types_js_1.HtmlNodeAttrKind.BOOLEAN_ATTRIBUTE) {
            return;
        }
        //const suggestedTarget = suggestTargetForHtmlAttr(htmlAttr, htmlStore);
        const suggestedName = getSuggestedName(htmlAttr.name);
        if (suggestedName !== htmlAttr.name) {
            context.report({
                location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
                message: `Legacy Polymer binding syntax in attribute '${htmlAttr.name}'.`,
                fixMessage: `Did you mean '${suggestedName}'?`,
                suggestion: "Legacy Polymer binding syntax is not supported in Lit."
                /*fix: () => ({
                    message: `Change to '${suggestedName}'`,
                    actions: [{ kind: "changeAttributeName", htmlAttr, newName: suggestedName }]
                })*/
            });
        }
    },
    visitHtmlAssignment(assignment, context) {
        if (assignment.kind !== html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.STRING) {
            return;
        }
        const htmlAttr = assignment.htmlAttr;
        if (LEGACY_ASSIGNMENT.test(assignment.value)) {
            //const suggestedTarget = suggestTargetForHtmlAttr(htmlAttr, htmlStore);
            context.report({
                location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
                message: `Legacy Polymer binding syntax in attribute '${htmlAttr.name}'.`,
                suggestion: "Legacy Polymer binding syntax is not supported in Lit." + ' Instead you should use JavaScript interpolation, e.g. "attr=${foo}".'
                //suggestedTarget
            });
        }
    }
};
exports.default = rule;
/**
 * Determines the non-legacy attribute name equivalent of the given name
 * @param name legacy name
 */
function getSuggestedName(name) {
    if (name.endsWith("?")) {
        return `?${name.slice(0, -1)}`;
    }
    if (name.endsWith("$")) {
        return `${name.slice(0, -1)}`;
    }
    return name;
}
//# sourceMappingURL=no-legacy-attribute.js.map