"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const html_tag_js_1 = require("../analyze/parse/parse-html-data/html-tag.js");
const html_node_attr_types_js_1 = require("../analyze/types/html-node/html-node-attr-types.js");
const html_node_types_js_1 = require("../analyze/types/html-node/html-node-types.js");
const attribute_util_js_1 = require("../analyze/util/attribute-util.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
/**
 * This rule validates that only known events are used in event listener bindings.
 */
const rule = {
    id: "no-unknown-event",
    meta: {
        priority: "low"
    },
    visitHtmlAttribute(htmlAttr, context) {
        const { htmlStore, config, definitionStore } = context;
        // Ignore "style" and "svg" attrs because I don't yet have all data for them.
        if (htmlAttr.htmlNode.kind !== html_node_types_js_1.HtmlNodeKind.NODE)
            return;
        // Only validate event listener bindings.
        if (htmlAttr.kind !== html_node_attr_types_js_1.HtmlNodeAttrKind.EVENT_LISTENER)
            return;
        // Report a diagnostic if the target is unknown
        const htmlAttrTarget = htmlStore.getHtmlAttrTarget(htmlAttr);
        if (htmlAttrTarget == null) {
            // Don't report unknown properties on unknown tags
            const htmlTag = htmlStore.getHtmlTag(htmlAttr.htmlNode);
            if (htmlTag == null)
                return;
            // Get suggested target
            const suggestedTarget = (0, attribute_util_js_1.suggestTargetForHtmlAttr)(htmlAttr, htmlStore);
            const suggestedMemberName = (suggestedTarget && `${(0, html_tag_js_1.litAttributeModifierForTarget)(suggestedTarget)}${suggestedTarget.name}`) || undefined;
            const suggestion = getSuggestionText({ config, definitionStore, htmlTag });
            context.report({
                location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
                message: `Unknown event '${htmlAttr.name}'.`,
                fixMessage: suggestedMemberName == null ? undefined : `Did you mean '${suggestedMemberName}'?`,
                suggestion,
                fix: suggestedMemberName == null
                    ? undefined
                    : () => ({
                        message: `Change event to '${suggestedMemberName}'`,
                        actions: [
                            {
                                kind: "changeAttributeName",
                                newName: suggestedMemberName,
                                htmlAttr
                            }
                        ]
                    })
            });
        }
    }
};
exports.default = rule;
/**
 * Returns a suggestion text for the unknown event rule.
 * @param config
 * @param definitionStore
 * @param htmlTag
 */
function getSuggestionText({ config, definitionStore, htmlTag }) {
    if (config.dontSuggestConfigChanges) {
        return `Please consider adding '@fires ${htmlTag.tagName}' to the jsdoc on a component class`;
    }
    return `Please consider adding '@fires ${htmlTag.tagName}' to the jsdoc on a component class, adding it to 'globalEvents' or disabling the 'no-unknown-event' rule.`;
}
//# sourceMappingURL=no-unknown-event.js.map