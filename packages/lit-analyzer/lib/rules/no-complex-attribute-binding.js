"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_simple_type_1 = require("ts-simple-type");
const html_node_attr_assignment_types_js_1 = require("../analyze/types/html-node/html-node-attr-assignment-types.js");
const html_node_attr_types_js_1 = require("../analyze/types/html-node/html-node-attr-types.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
const is_lit_directive_js_1 = require("./util/directive/is-lit-directive.js");
const extract_binding_types_js_1 = require("./util/type/extract-binding-types.js");
const is_assignable_binding_under_security_system_js_1 = require("./util/type/is-assignable-binding-under-security-system.js");
/**
 * This rule validates that complex types are not used within an expression in an attribute binding.
 */
const rule = {
    id: "no-complex-attribute-binding",
    meta: {
        priority: "medium"
    },
    visitHtmlAssignment(assignment, context) {
        // Only validate attribute bindings, because you are able to assign complex types in property bindings.
        const { htmlAttr } = assignment;
        if (htmlAttr.kind !== html_node_attr_types_js_1.HtmlNodeAttrKind.ATTRIBUTE)
            return;
        // Ignore element expressions
        if (assignment.kind === html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.ELEMENT_EXPRESSION)
            return;
        const { typeA, typeB } = (0, extract_binding_types_js_1.extractBindingTypes)(assignment, context);
        // Don't validate directives in this rule, because they are assignable even though they are complex types (functions).
        if ((0, is_lit_directive_js_1.isLitDirective)(typeB))
            return;
        const htmlAttrTarget = context.htmlStore.getHtmlAttrTarget(htmlAttr);
        const hasConverter = htmlAttrTarget?.declaration?.meta?.hasConverter;
        // Only primitive types should be allowed as "typeB"
        if (!(0, ts_simple_type_1.isAssignableToPrimitiveType)(typeB)) {
            if ((0, is_assignable_binding_under_security_system_js_1.isAssignableBindingUnderSecuritySystem)(htmlAttr, { typeA, typeB }, context) !== undefined) {
                // This is binding via a security sanitization system, let it do
                // this check. Apparently complex values are OK to assign here.
                return;
            }
            const message = `You are binding a non-primitive type '${(0, ts_simple_type_1.typeToString)(typeB)}'. This could result in binding the string "[object Object]".`;
            const newModifier = ".";
            context.report({
                location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
                message,
                fixMessage: `Use '${newModifier}' binding instead?`,
                fix: () => ({
                    message: `Use '${newModifier}' modifier instead`,
                    actions: [
                        {
                            kind: "changeAttributeModifier",
                            htmlAttr,
                            newModifier
                        }
                    ]
                })
            });
        }
        // Only primitive types without a custom converter should be allowed as "typeA"
        else if (!hasConverter && !(0, ts_simple_type_1.isAssignableToPrimitiveType)(typeA)) {
            const message = `You are assigning the primitive '${(0, ts_simple_type_1.typeToString)(typeB)}' to a non-primitive type '${(0, ts_simple_type_1.typeToString)(typeA)}'.`;
            const newModifier = ".";
            context.report({
                location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
                message,
                fixMessage: `Use '${newModifier}' binding instead?`,
                fix: () => ({
                    message: `Use '${newModifier}' modifier instead`,
                    actions: [
                        {
                            kind: "changeAttributeModifier",
                            htmlAttr,
                            newModifier
                        }
                    ]
                })
            });
        }
    }
};
exports.default = rule;
//# sourceMappingURL=no-complex-attribute-binding.js.map