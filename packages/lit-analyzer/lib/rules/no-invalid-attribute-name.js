"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_valid_name_js_1 = require("../analyze/util/is-valid-name.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
const rule = {
    id: "no-invalid-attribute-name",
    meta: {
        priority: "low"
    },
    visitComponentMember(member, context) {
        // Check if the tag name is invalid
        let attrName;
        let attrNameNode;
        if (member.kind === "attribute") {
            attrName = member.attrName;
            attrNameNode = member.node;
        }
        else if (typeof member.meta?.attribute === "string") {
            attrName = member.meta.attribute;
            attrNameNode = member.meta.node?.attribute || member.node;
        }
        if (attrName != null && attrNameNode != null && attrNameNode.getSourceFile() === context.file && !(0, is_valid_name_js_1.isValidAttributeName)(attrName)) {
            context.report({
                location: (0, range_util_js_1.rangeFromNode)(attrNameNode),
                message: `'${attrName}' is not a valid attribute name.`
            });
        }
    }
};
exports.default = rule;
//# sourceMappingURL=no-invalid-attribute-name.js.map