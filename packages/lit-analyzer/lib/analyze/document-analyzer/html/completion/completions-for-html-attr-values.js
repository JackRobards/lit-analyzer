"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completionsForHtmlAttrValues = completionsForHtmlAttrValues;
const ts_simple_type_1 = require("ts-simple-type");
const html_node_attr_assignment_types_js_1 = require("../../../types/html-node/html-node-attr-assignment-types.js");
const html_node_attr_types_js_1 = require("../../../types/html-node/html-node-attr-types.js");
function completionsForHtmlAttrValues(htmlNodeAttr, location, { htmlStore }) {
    // There is not point in showing completions for event listener bindings
    if (htmlNodeAttr.kind === html_node_attr_types_js_1.HtmlNodeAttrKind.EVENT_LISTENER)
        return [];
    // Don't show completions inside assignments with expressions
    if (htmlNodeAttr.assignment && htmlNodeAttr.assignment.kind === html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.EXPRESSION)
        return [];
    const htmlTagMember = htmlStore.getHtmlAttrTarget(htmlNodeAttr);
    if (htmlTagMember == null)
        return [];
    // Special case for handling slot attr as we need to look at its parent
    if (htmlNodeAttr.name === "slot") {
        const parentHtmlTag = htmlNodeAttr.htmlNode.parent && htmlStore.getHtmlTag(htmlNodeAttr.htmlNode.parent);
        if (parentHtmlTag != null && parentHtmlTag.slots.length > 0) {
            return parentHtmlTag.slots.map(slot => ({
                name: slot.name || " ",
                insert: slot.name || "",
                documentation: () => slot.description,
                kind: "enumElement"
            }));
        }
    }
    const options = getOptionsFromType(htmlTagMember.getType());
    return options.map(option => ({
        name: option,
        insert: option,
        kind: "enumElement"
    }));
}
function getOptionsFromType(type) {
    switch (type.kind) {
        case "UNION":
            return type.types.filter(ts_simple_type_1.isSimpleTypeLiteral).map(t => t.value.toString());
        case "ENUM":
            return type.types
                .map(m => m.type)
                .filter(ts_simple_type_1.isSimpleTypeLiteral)
                .map(t => t.value.toString());
        case "ALIAS":
            return getOptionsFromType(type.target);
    }
    return [];
}
//# sourceMappingURL=completions-for-html-attr-values.js.map