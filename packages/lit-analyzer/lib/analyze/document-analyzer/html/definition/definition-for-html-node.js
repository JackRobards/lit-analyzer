"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definitionForHtmlNode = definitionForHtmlNode;
const ast_util_js_1 = require("../../../util/ast-util.js");
const range_util_js_1 = require("../../../util/range-util.js");
function definitionForHtmlNode(htmlNode, { htmlStore, ts }) {
    const tag = htmlStore.getHtmlTag(htmlNode);
    if (tag == null || tag.declaration == null)
        return undefined;
    const node = tag.declaration.node;
    return {
        fromRange: (0, range_util_js_1.rangeFromHtmlNode)(htmlNode),
        targets: [
            {
                kind: "node",
                node: (0, ast_util_js_1.getNodeIdentifier)(node, ts) || node
            }
        ]
    };
}
//# sourceMappingURL=definition-for-html-node.js.map