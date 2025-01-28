"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const html_tag_js_1 = require("../analyze/parse/parse-html-data/html-tag.js");
const html_node_attr_types_js_1 = require("../analyze/types/html-node/html-node-attr-types.js");
const html_node_types_js_1 = require("../analyze/types/html-node/html-node-types.js");
const attribute_util_js_1 = require("../analyze/util/attribute-util.js");
const iterable_util_js_1 = require("../analyze/util/iterable-util.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
/**
 * This rule validates that only known properties are used in bindings.
 */
const rule = {
    id: "no-unknown-property",
    meta: {
        priority: "low"
    },
    visitHtmlAttribute(htmlAttr, context) {
        const { htmlStore, config, definitionStore } = context;
        // Ignore "style" and "svg" attrs because I don't yet have all data for them.
        if (htmlAttr.htmlNode.kind !== html_node_types_js_1.HtmlNodeKind.NODE)
            return;
        // Only validate property bindings.
        if (htmlAttr.kind !== html_node_attr_types_js_1.HtmlNodeAttrKind.PROPERTY)
            return;
        // Report a diagnostic if the target is unknown.
        const htmlAttrTarget = htmlStore.getHtmlAttrTarget(htmlAttr);
        if (htmlAttrTarget == null) {
            // Don't report unknown properties on unknown tags
            const htmlTag = htmlStore.getHtmlTag(htmlAttr.htmlNode);
            if (htmlTag == null)
                return;
            // Get suggested target because the name could be a typo.
            const suggestedTarget = (0, attribute_util_js_1.suggestTargetForHtmlAttr)(htmlAttr, htmlStore);
            const suggestedModifier = suggestedTarget == null ? undefined : (0, html_tag_js_1.litAttributeModifierForTarget)(suggestedTarget);
            const suggestedMemberName = suggestedTarget == null ? undefined : suggestedTarget.name;
            const suggestion = getSuggestionText({ config, definitionStore, htmlTag });
            context.report({
                location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
                message: `Unknown property '${htmlAttr.name}'.`,
                fixMessage: suggestedMemberName == null ? undefined : `Did you mean '${suggestedModifier}${suggestedMemberName}'?`,
                suggestion,
                fix: suggestedMemberName == null
                    ? undefined
                    : () => ({
                        message: `Change property to '${suggestedModifier}${suggestedMemberName}'`,
                        actions: [
                            {
                                kind: "changeAttributeModifier",
                                newModifier: suggestedModifier,
                                htmlAttr
                            },
                            {
                                kind: "changeAttributeName",
                                newName: suggestedMemberName,
                                htmlAttr
                            }
                        ]
                    })
            });
        }
        return;
    }
};
exports.default = rule;
/**
 * Generates a suggestion for the unknown property rule.
 * @param config
 * @param definitionStore
 * @param htmlTag
 */
function getSuggestionText({ config, definitionStore, htmlTag }) {
    // Don't generate suggestion if config changes has been disabled.
    if (config.dontSuggestConfigChanges) {
        return undefined;
    }
    const tagHasDeclaration = htmlTag.declaration != null;
    const tagIsBuiltIn = htmlTag.builtIn || false;
    const tagIsFromLibrary = (0, iterable_util_js_1.iterableFirst)(definitionStore.getDefinitionForTagName(htmlTag.tagName)?.identifierNodes)?.getSourceFile().isDeclarationFile || false;
    return tagIsBuiltIn
        ? `This is a built in tag. Please consider disabling the 'no-unknown-property' rule.`
        : tagIsFromLibrary
            ? `If you are not the author of this component please consider disabling the 'no-unknown-property' rule.`
            : tagHasDeclaration
                ? `Please consider adding a '@prop' tag to jsdoc on the component class or disabling the 'no-unknown-property' rule.`
                : `Please consider disabling the 'no-unknown-property' rule.`;
}
//# sourceMappingURL=no-unknown-property.js.map