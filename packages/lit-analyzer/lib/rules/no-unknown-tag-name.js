"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const html_node_types_js_1 = require("../analyze/types/html-node/html-node-types.js");
const find_best_match_js_1 = require("../analyze/util/find-best-match.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
/**
 * This rule checks that all tag names used in a template are defined.
 */
const rule = {
    id: "no-unknown-tag-name",
    meta: {
        priority: "low"
    },
    visitHtmlNode(htmlNode, context) {
        const { htmlStore, config } = context;
        // Don't validate style and svg yet
        if (htmlNode.kind !== html_node_types_js_1.HtmlNodeKind.NODE)
            return;
        // Get the html tag from the html store
        const htmlTag = htmlStore.getHtmlTag(htmlNode);
        // Add diagnostics if the tag couldn't be found (not defined anywhere)
        if (htmlTag == null) {
            // Find a suggested name in the set of defined tag names. Maybe this tag name is a typo?
            const suggestedName = (0, find_best_match_js_1.findBestStringMatch)(htmlNode.tagName, Array.from(htmlStore.getGlobalTags()).map(tag => tag.tagName));
            // Build a suggestion text
            let suggestion = `Check that you've imported the element, and that it's declared on the HTMLElementTagNameMap.`;
            if (!config.dontSuggestConfigChanges) {
                suggestion += ` If it can't be imported, consider adding it to the 'globalTags' plugin configuration or disabling the 'no-unknown-tag' rule.`;
            }
            context.report({
                location: (0, range_util_js_1.rangeFromHtmlNode)(htmlNode),
                message: `Unknown tag <${htmlNode.tagName}>.`,
                fixMessage: suggestedName == null ? undefined : `Did you mean <${suggestedName}>?`,
                suggestion,
                fix: suggestedName == null
                    ? undefined
                    : () => ({
                        message: `Change tag name to '${suggestedName}'`,
                        actions: [
                            {
                                kind: "changeTagName",
                                htmlNode,
                                newName: suggestedName
                            }
                        ]
                    })
            });
        }
        return;
    }
};
exports.default = rule;
//# sourceMappingURL=no-unknown-tag-name.js.map