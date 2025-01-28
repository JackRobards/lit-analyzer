"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAssignableInBooleanBinding = isAssignableInBooleanBinding;
const ts_simple_type_1 = require("ts-simple-type");
const range_util_js_1 = require("../../../analyze/util/range-util.js");
const is_assignable_to_type_js_1 = require("./is-assignable-to-type.js");
function isAssignableInBooleanBinding(htmlAttr, { typeA, typeB }, context) {
    // Test if the user is trying to use ? modifier on a non-boolean type.
    if (!(0, is_assignable_to_type_js_1.isAssignableToType)({ typeA: { kind: "UNION", types: [{ kind: "BOOLEAN" }, { kind: "UNDEFINED" }, { kind: "NULL" }] }, typeB }, context)) {
        context.report({
            location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
            message: `Type '${(0, ts_simple_type_1.typeToString)(typeB)}' is not assignable to 'boolean'`
        });
        return false;
    }
    // Test if the user is trying to use the ? modifier on a non-boolean type.
    if (!(0, is_assignable_to_type_js_1.isAssignableToType)({ typeA, typeB: { kind: "BOOLEAN" } }, context)) {
        context.report({
            location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
            message: `You are using a boolean binding on a non boolean type '${(0, ts_simple_type_1.typeToString)(typeA)}'`,
            fix: () => {
                const htmlAttrTarget = context.htmlStore.getHtmlAttrTarget(htmlAttr);
                const newModifier = htmlAttrTarget == null ? "." : "";
                return {
                    message: newModifier.length === 0 ? `Remove '${htmlAttr.modifier || ""}' modifier` : `Use '${newModifier}' modifier instead`,
                    actions: [
                        {
                            kind: "changeAttributeModifier",
                            htmlAttr,
                            newModifier
                        }
                    ]
                };
            }
        });
        return false;
    }
    return true;
}
//# sourceMappingURL=is-assignable-in-boolean-binding.js.map