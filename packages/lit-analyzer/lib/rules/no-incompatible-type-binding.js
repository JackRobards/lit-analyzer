"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../analyze/constants.js");
const html_node_attr_assignment_types_js_1 = require("../analyze/types/html-node/html-node-attr-assignment-types.js");
const extract_binding_types_js_1 = require("./util/type/extract-binding-types.js");
const is_assignable_in_attribute_binding_js_1 = require("./util/type/is-assignable-in-attribute-binding.js");
const is_assignable_in_boolean_binding_js_1 = require("./util/type/is-assignable-in-boolean-binding.js");
const is_assignable_in_property_binding_js_1 = require("./util/type/is-assignable-in-property-binding.js");
const is_assignable_in_element_binding_js_1 = require("./util/type/is-assignable-in-element-binding.js");
/**
 * This rule validate if the types of a binding are assignable.
 */
const rule = {
    id: "no-incompatible-type-binding",
    meta: {
        priority: "low"
    },
    visitHtmlAssignment(assignment, context) {
        const { htmlAttr } = assignment;
        if (assignment.kind === html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.ELEMENT_EXPRESSION) {
            // For element bindings we only care about the expression type
            const { typeB } = (0, extract_binding_types_js_1.extractBindingTypes)(assignment, context);
            (0, is_assignable_in_element_binding_js_1.isAssignableInElementBinding)(htmlAttr, typeB, context);
        }
        if (context.htmlStore.getHtmlAttrTarget(htmlAttr) == null) {
            return;
        }
        const { typeA, typeB } = (0, extract_binding_types_js_1.extractBindingTypes)(assignment, context);
        // Validate types based on the binding in which they appear
        switch (htmlAttr.modifier) {
            case constants_js_1.LIT_HTML_BOOLEAN_ATTRIBUTE_MODIFIER:
                (0, is_assignable_in_boolean_binding_js_1.isAssignableInBooleanBinding)(htmlAttr, { typeA, typeB }, context);
                break;
            case constants_js_1.LIT_HTML_PROP_ATTRIBUTE_MODIFIER:
                (0, is_assignable_in_property_binding_js_1.isAssignableInPropertyBinding)(htmlAttr, { typeA, typeB }, context);
                break;
            case constants_js_1.LIT_HTML_EVENT_LISTENER_ATTRIBUTE_MODIFIER:
                break;
            default: {
                (0, is_assignable_in_attribute_binding_js_1.isAssignableInAttributeBinding)(htmlAttr, { typeA, typeB }, context);
                break;
            }
        }
    }
};
exports.default = rule;
//# sourceMappingURL=no-incompatible-type-binding.js.map