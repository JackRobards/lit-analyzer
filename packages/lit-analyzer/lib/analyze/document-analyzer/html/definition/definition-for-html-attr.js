"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definitionForHtmlAttr = definitionForHtmlAttr;
const html_tag_js_1 = require("../../../parse/parse-html-data/html-tag.js");
const ast_util_js_1 = require("../../../util/ast-util.js");
const range_util_js_1 = require("../../../util/range-util.js");
function definitionForHtmlAttr(htmlAttr, { htmlStore, ts }) {
    const target = htmlStore.getHtmlAttrTarget(htmlAttr);
    if (target == null)
        return undefined;
    if ((0, html_tag_js_1.isHtmlMember)(target) && target.declaration != null) {
        const node = target.declaration.node;
        return {
            fromRange: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
            targets: [
                {
                    kind: "node",
                    node: (0, ast_util_js_1.getNodeIdentifier)(node, ts) || node,
                    name: target.name
                }
            ]
        };
    }
    else if ((0, html_tag_js_1.isHtmlEvent)(target) && target.declaration != null) {
        const node = target.declaration.node;
        return {
            fromRange: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
            targets: [
                {
                    kind: "node",
                    node: (0, ast_util_js_1.getNodeIdentifier)(node, ts) || node,
                    name: target.name
                }
            ]
        };
    }
    return;
}
//# sourceMappingURL=definition-for-html-attr.js.map