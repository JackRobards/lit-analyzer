"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_valid_name_js_1 = require("../analyze/util/is-valid-name.js");
const iterable_util_js_1 = require("../analyze/util/iterable-util.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
const rule = {
    id: "no-invalid-tag-name",
    meta: {
        priority: "low"
    },
    visitComponentDefinition(definition, context) {
        // Check if the tag name is invalid
        if (!(0, is_valid_name_js_1.isValidCustomElementName)(definition.tagName) && definition.tagName !== "") {
            const node = (0, iterable_util_js_1.iterableFirst)(definition.tagNameNodes) || (0, iterable_util_js_1.iterableFirst)(definition.identifierNodes);
            // Only report diagnostic if the tag is not built in,
            //  because this function among other things tests for missing "-" in custom element names
            const tag = context.htmlStore.getHtmlTag(definition.tagName);
            if (node != null && tag != null && !tag.builtIn) {
                context.report({
                    location: (0, range_util_js_1.rangeFromNode)(node),
                    message: `The tag name '${definition.tagName}' is not a valid custom element name. Remember that a hyphen (-) is required.`
                });
            }
        }
    }
};
exports.default = rule;
//# sourceMappingURL=no-invalid-tag-name.js.map