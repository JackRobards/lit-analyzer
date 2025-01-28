"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const html_tag_js_1 = require("../analyze/parse/parse-html-data/html-tag.js");
const html_node_attr_assignment_types_js_1 = require("../analyze/types/html-node/html-node-attr-assignment-types.js");
const html_node_attr_types_js_1 = require("../analyze/types/html-node/html-node-attr-types.js");
const html_node_types_js_1 = require("../analyze/types/html-node/html-node-types.js");
const attribute_util_js_1 = require("../analyze/util/attribute-util.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
/**
 * This rule validates that only known attributes are used in attribute bindings.
 */
const rule = {
    id: "no-unknown-attribute",
    meta: {
        priority: "low"
    },
    visitHtmlAttribute(htmlAttr, context) {
        const { htmlStore, config, definitionStore } = context;
        // Ignore "style" and "svg" attrs because I don't yet have all data for them.
        if (htmlAttr.htmlNode.kind !== html_node_types_js_1.HtmlNodeKind.NODE)
            return;
        // Only validate attribute bindings.
        if (htmlAttr.kind !== html_node_attr_types_js_1.HtmlNodeAttrKind.ATTRIBUTE && htmlAttr.kind !== html_node_attr_types_js_1.HtmlNodeAttrKind.BOOLEAN_ATTRIBUTE)
            return;
        // Report a diagnostic if the target is unknown
        const htmlAttrTarget = htmlStore.getHtmlAttrTarget(htmlAttr);
        if (htmlAttrTarget == null) {
            // Don't report unknown attributes on unknown tag names
            const htmlTag = htmlStore.getHtmlTag(htmlAttr.htmlNode);
            if (htmlTag == null)
                return;
            // Ignore unknown "data-" attributes
            if (htmlAttr.name.startsWith("data-"))
                return;
            // Ignore element expressions
            if (htmlAttr.assignment?.kind === html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.ELEMENT_EXPRESSION)
                return;
            // Get suggested target
            const suggestedTarget = (0, attribute_util_js_1.suggestTargetForHtmlAttr)(htmlAttr, htmlStore);
            const suggestedModifier = suggestedTarget == null ? undefined : (0, html_tag_js_1.litAttributeModifierForTarget)(suggestedTarget);
            const suggestedMemberName = suggestedTarget == null ? undefined : suggestedTarget.name;
            const suggestion = getSuggestionText({ config, htmlTag, definitionStore });
            context.report({
                location: (0, range_util_js_1.rangeFromHtmlNodeAttr)(htmlAttr),
                message: `Unknown attribute '${htmlAttr.name}'.`,
                fixMessage: suggestedMemberName == null ? undefined : `Did you mean '${suggestedModifier}${suggestedMemberName}'?`,
                suggestion,
                fix: () => [
                    {
                        message: `Change attribute to 'data-${htmlAttr.name}'`,
                        actions: [
                            {
                                kind: "changeAttributeName",
                                newName: `data-${htmlAttr.name}`,
                                htmlAttr
                            }
                        ]
                    },
                    ...(suggestedMemberName == null
                        ? []
                        : [
                            {
                                message: `Change attribute to '${suggestedModifier}${suggestedMemberName}'`,
                                actions: [
                                    {
                                        kind: "changeAttributeName",
                                        newName: suggestedMemberName,
                                        htmlAttr
                                    },
                                    {
                                        kind: "changeAttributeModifier",
                                        newModifier: suggestedModifier,
                                        htmlAttr
                                    }
                                ]
                            }
                        ])
                ]
            });
        }
        return;
    }
};
exports.default = rule;
/**
 * Returns are suggestion for the unknown attribute rule.
 * @param config
 * @param definitionStore
 * @param htmlTag
 */
function getSuggestionText({ config, definitionStore, htmlTag }) {
    if (config.dontSuggestConfigChanges) {
        return `Please consider using a data-* attribute.`;
    }
    const tagHasDeclaration = htmlTag.declaration != null;
    const tagIsBuiltIn = htmlTag.builtIn || false;
    const tagIsFromLibrary = definitionStore.getDefinitionForTagName(htmlTag.tagName)?.sourceFile?.isDeclarationFile || false;
    return tagIsBuiltIn
        ? `This is a built in tag. Please consider using a 'data-*' attribute, adding the attribute to 'globalAttributes' or disabling the 'no-unknown-attribute' rule.`
        : tagIsFromLibrary
            ? `If you are not the author of this component please consider using a 'data-*' attribute, adding the attribute to 'globalAttributes' or disabling the 'no-unknown-attribute' rule.`
            : tagHasDeclaration
                ? `Please consider adding it as an attribute on the component, adding '@attr' tag to jsdoc on the component class or using a 'data-*' attribute instead.`
                : `Please consider using a 'data-*' attribute.`;
}
//# sourceMappingURL=no-unknown-attribute.js.map