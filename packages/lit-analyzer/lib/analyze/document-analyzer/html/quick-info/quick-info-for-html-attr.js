"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickInfoForHtmlAttr = quickInfoForHtmlAttr;
const html_tag_js_1 = require("../../../parse/parse-html-data/html-tag.js");
const range_util_js_1 = require("../../../util/range-util.js");
function quickInfoForHtmlAttr(htmlAttr, { htmlStore }) {
    const target = htmlStore.getHtmlAttrTarget(htmlAttr);
    if (target == null)
        return undefined;
    return {
        range: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
        primaryInfo: (0, html_tag_js_1.targetKindAndTypeText)(target, { modifier: htmlAttr.modifier }),
        secondaryInfo: (0, html_tag_js_1.descriptionForTarget)(target, { markdown: true })
    };
}
//# sourceMappingURL=quick-info-for-html-attr.js.map