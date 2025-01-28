"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_simple_type_1 = require("ts-simple-type");
const constants_js_1 = require("../analyze/constants.js");
const html_node_attr_assignment_types_js_1 = require("../analyze/types/html-node/html-node-attr-assignment-types.js");
const html_node_attr_types_js_1 = require("../analyze/types/html-node/html-node-attr-types.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
const extract_binding_types_js_1 = require("./util/type/extract-binding-types.js");
const is_assignable_in_attribute_binding_js_1 = require("./util/type/is-assignable-in-attribute-binding.js");
const is_assignable_to_type_js_1 = require("./util/type/is-assignable-to-type.js");
/**
 * This rule validates that you are not binding a boolean type in an attribute binding
 * This would result in binding the string 'true' or 'false' and a '?' binding should be used instead.
 */
const rule = {
    id: "no-boolean-in-attribute-binding",
    meta: {
        priority: "medium"
    },
    visitHtmlAssignment(assignment, context) {
        // Don't validate boolean attribute bindings.
        if (assignment.kind === html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.BOOLEAN)
            return;
        // Only validate attribute bindings.
        const { htmlAttr } = assignment;
        if (htmlAttr.kind !== html_node_attr_types_js_1.HtmlNodeAttrKind.ATTRIBUTE)
            return;
        const { typeA, typeB } = (0, extract_binding_types_js_1.extractBindingTypes)(assignment, context);
        // Return early if the attribute is like 'required=""' because this is assignable to boolean.
        if (typeB.kind === "STRING_LITERAL" && typeB.value.length === 0)
            return;
        // Check that typeB is not of any|unknown type and typeB is assignable to boolean.
        // Report a diagnostic if typeB is assignable to boolean type because this would result in binding the boolean coerced to string.
        if (!(0, ts_simple_type_1.isAssignableToSimpleTypeKind)(typeB, ["ANY", "UNKNOWN"]) && (0, is_assignable_to_type_js_1.isAssignableToType)({ typeA: { kind: "BOOLEAN" }, typeB }, context)) {
            // Don't emit error if typeB is assignable to typeA with string coercion.
            if ((0, is_assignable_to_type_js_1.isAssignableToType)({ typeA, typeB }, context, { isAssignable: is_assignable_in_attribute_binding_js_1.isAssignableToTypeWithStringCoercion })) {
                return;
            }
            context.report({
                location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
                message: `The value being assigned is a boolean type, but you are not using a boolean binding.`,
                fixMessage: "Change to boolean binding?",
                fix: () => {
                    const newName = `${constants_js_1.LIT_HTML_BOOLEAN_ATTRIBUTE_MODIFIER}${htmlAttr.name}`;
                    return {
                        message: `Change to '${newName}'`,
                        actions: [
                            {
                                kind: "changeAttributeName",
                                htmlAttr,
                                newName
                            }
                        ]
                    };
                }
            });
        }
        // Check that typeA is not of any|unknown type and typeA is assignable to boolean.
        // Report a diagnostic if typeA is assignable to boolean type because then
        //   we should probably be using a boolean binding instead of an attribute binding.
        else if (!(0, ts_simple_type_1.isAssignableToSimpleTypeKind)(typeA, ["ANY", "UNKNOWN"]) &&
            (0, is_assignable_to_type_js_1.isAssignableToType)({
                typeA: { kind: "BOOLEAN" },
                typeB: typeA
            }, context)) {
            context.report({
                location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
                message: `The '${htmlAttr.name}' attribute is of boolean type but you are not using a boolean binding.`,
                fixMessage: "Change to boolean binding?",
                fix: () => {
                    const newName = `${constants_js_1.LIT_HTML_BOOLEAN_ATTRIBUTE_MODIFIER}${htmlAttr.name}`;
                    return {
                        message: `Change to '${newName}'`,
                        actions: [
                            {
                                kind: "changeAttributeName",
                                htmlAttr,
                                newName
                            }
                        ]
                    };
                }
            });
        }
    }
};
exports.default = rule;
//# sourceMappingURL=no-boolean-in-attribute-binding.js.map