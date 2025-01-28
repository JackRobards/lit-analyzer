"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_valid_name_js_1 = require("../analyze/util/is-valid-name.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
// List taken from https://html.spec.whatwg.org/multipage/syntax.html#void-elements
// and parse5 list of void elements: https://github.com/inikulin/parse5/blob/86f09edd5a6840ab2269680b0eef2945e78c38fd/packages/parse5/lib/serializer/index.ts#L7-L26
const VOID_ELEMENTS = new Set([
    "area",
    "base",
    "basefont",
    "bgsound",
    "br",
    "col",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
]);
/**
 * This rule validates that all tags are closed properly.
 */
const rule = {
    id: "no-unclosed-tag",
    meta: {
        priority: "low"
    },
    visitHtmlNode(htmlNode, context) {
        if (VOID_ELEMENTS.has(htmlNode.tagName.toLowerCase()) || htmlNode.location.endTag != null) {
            return;
        }
        // Report specifically that a custom element cannot be self closing
        //   if the user is trying to close a custom element.
        const isCustomElement = (0, is_valid_name_js_1.isCustomElementTagName)(htmlNode.tagName);
        context.report({
            location: (0, range_util_js_1.rangeFromHtmlNode)(htmlNode),
            message: `This tag isn't closed.${isCustomElement ? " Custom elements cannot be self closing." : ""}`
        });
    }
};
exports.default = rule;
//# sourceMappingURL=no-unclosed-tag.js.map