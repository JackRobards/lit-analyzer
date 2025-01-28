"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickInfoForHtmlNode = quickInfoForHtmlNode;
const html_tag_js_1 = require("../../../parse/parse-html-data/html-tag.js");
const range_util_js_1 = require("../../../util/range-util.js");
function quickInfoForHtmlNode(htmlNode, { htmlStore }) {
    const htmlTag = htmlStore.getHtmlTag(htmlNode);
    if (htmlTag == null)
        return undefined;
    return {
        range: (0, range_util_js_1.rangeFromHtmlNode)(htmlNode),
        primaryInfo: `<${htmlNode.tagName}>`,
        secondaryInfo: (0, html_tag_js_1.documentationForHtmlTag)(htmlTag, { markdown: true })
    };
}
//# sourceMappingURL=quick-info-for-html-node.js.map