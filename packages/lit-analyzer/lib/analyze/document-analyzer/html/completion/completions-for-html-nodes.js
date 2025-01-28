"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completionsForHtmlNodes = completionsForHtmlNodes;
const html_tag_js_1 = require("../../../parse/parse-html-data/html-tag.js");
const general_util_js_1 = require("../../../util/general-util.js");
const is_valid_name_js_1 = require("../../../util/is-valid-name.js");
const range_util_js_1 = require("../../../util/range-util.js");
function completionsForHtmlNodes(document, intersectingClosestNode, { offset, leftWord, rightWord, beforeWord, afterWord }, { htmlStore }) {
    const isClosingTag = beforeWord === "/";
    // This case handles closing the closest intersecting node.
    // For this case we only suggest closing the closest intersecting node: so 1 single suggestion.
    // Example:   <my-element></|
    // This doesn't handle:   <my-element></my-el|ement> , because in that case we would like to show all options to the user.
    if (isClosingTag && leftWord === "" && rightWord === "" && afterWord !== ">" && intersectingClosestNode != null) {
        const insert = `</${intersectingClosestNode.tagName}>`;
        return [
            {
                name: insert,
                insert,
                kind: "enumElement",
                importance: "high",
                range: (0, range_util_js_1.documentRangeToSFRange)(document, {
                    start: offset - leftWord.length - 2,
                    end: offset + rightWord.length
                }),
                documentation: (0, general_util_js_1.lazy)(() => {
                    const htmlTag = htmlStore.getHtmlTag(intersectingClosestNode);
                    return htmlTag != null ? (0, html_tag_js_1.documentationForHtmlTag)(htmlTag) : undefined;
                })
            }
        ];
    }
    const htmlTags = Array.from(htmlStore.getGlobalTags());
    return htmlTags.map(htmlTag => {
        const isBuiltIn = !(0, is_valid_name_js_1.isCustomElementTagName)(htmlTag.tagName);
        const hasDeclaration = htmlTag.declaration != null;
        const insert = isClosingTag ? "</" + htmlTag.tagName + ">" : htmlTag.tagName;
        return {
            name: insert,
            insert,
            kind: isBuiltIn ? "enumElement" : hasDeclaration ? "member" : "label",
            importance: isBuiltIn ? "low" : hasDeclaration ? "high" : "medium",
            range: (0, range_util_js_1.documentRangeToSFRange)(document, {
                start: offset - leftWord.length - (isClosingTag ? 2 : 0),
                end: offset + rightWord.length + (isClosingTag && afterWord === ">" ? 1 : 0)
            }),
            documentation: (0, general_util_js_1.lazy)(() => (0, html_tag_js_1.documentationForHtmlTag)(htmlTag))
        };
    });
}
//# sourceMappingURL=completions-for-html-nodes.js.map