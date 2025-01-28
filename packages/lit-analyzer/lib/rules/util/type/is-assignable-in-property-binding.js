"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAssignableInPropertyBinding = isAssignableInPropertyBinding;
const ts_simple_type_1 = require("ts-simple-type");
const range_util_js_1 = require("../../../analyze/util/range-util.js");
const is_assignable_binding_under_security_system_js_1 = require("./is-assignable-binding-under-security-system.js");
const is_assignable_to_type_js_1 = require("./is-assignable-to-type.js");
function isAssignableInPropertyBinding(htmlAttr, { typeA, typeB }, context) {
    const securitySystemResult = (0, is_assignable_binding_under_security_system_js_1.isAssignableBindingUnderSecuritySystem)(htmlAttr, { typeA, typeB }, context);
    if (securitySystemResult !== undefined) {
        // The security diagnostics take precedence here,
        //   and we should not do any more checking.
        return securitySystemResult;
    }
    if (!(0, is_assignable_to_type_js_1.isAssignableToType)({ typeA, typeB }, context)) {
        context.report({
            location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
            message: `Type '${(0, ts_simple_type_1.typeToString)(typeB)}' is not assignable to '${(0, ts_simple_type_1.typeToString)(typeA)}'`
        });
        return false;
    }
    return true;
}
//# sourceMappingURL=is-assignable-in-property-binding.js.map