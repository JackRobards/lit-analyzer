"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_simple_type_1 = require("ts-simple-type");
const html_node_attr_assignment_types_js_1 = require("../analyze/types/html-node/html-node-attr-assignment-types.js");
const html_node_attr_types_js_1 = require("../analyze/types/html-node/html-node-attr-types.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
const extract_binding_types_js_1 = require("./util/type/extract-binding-types.js");
/**
 * This rule validates that "null" and "undefined" types are not bound in an attribute binding.
 */
const rule = {
    id: "no-nullable-attribute-binding",
    meta: {
        priority: "high"
    },
    visitHtmlAssignment(assignment, context) {
        // Only validate "expression" kind bindings.
        if (assignment.kind !== html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.EXPRESSION)
            return;
        // Only validate "attribute" bindings because these will coerce null|undefined to a string.
        const { htmlAttr } = assignment;
        if (htmlAttr.kind !== html_node_attr_types_js_1.HtmlNodeAttrKind.ATTRIBUTE)
            return;
        const { typeB } = (0, extract_binding_types_js_1.extractBindingTypes)(assignment, context);
        const isAssignableToNull = (0, ts_simple_type_1.isAssignableToSimpleTypeKind)(typeB, "NULL");
        // Test if removing "undefined" or "null" from typeB would work and suggest using "ifDefined".
        if (isAssignableToNull || (0, ts_simple_type_1.isAssignableToSimpleTypeKind)(typeB, "UNDEFINED")) {
            context.report({
                location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
                message: `This attribute binds the type '${(0, ts_simple_type_1.typeToString)(typeB)}' which can end up binding the string '${isAssignableToNull ? "null" : "undefined"}'.`,
                fixMessage: "Use the 'ifDefined' directive?",
                fix: () => ({
                    message: `Use the 'ifDefined' directive.`,
                    actions: [{ kind: "changeAssignment", assignment, newValue: `ifDefined(${assignment.expression.getText()})` }]
                })
            });
        }
    }
};
exports.default = rule;
//# sourceMappingURL=no-nullable-attribute-binding.js.map