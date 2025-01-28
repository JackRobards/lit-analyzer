"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_util_js_1 = require("../analyze/util/ast-util.js");
const iterable_util_js_1 = require("../analyze/util/iterable-util.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
/**
 * This rule validates that legacy Polymer attribute bindings are not used.
 */
const rule = {
    id: "no-missing-element-type-definition",
    meta: {
        priority: "low"
    },
    visitComponentDefinition(definition, context) {
        // Don't run this rule on non-typescript files and declaration files
        if (context.file.isDeclarationFile || !context.file.fileName.endsWith(".ts")) {
            return;
        }
        // Try to find the tag name node on "interface HTMLElementTagNameMap"
        const htmlElementTagNameMapTagNameNode = (0, iterable_util_js_1.iterableFind)(definition.tagNameNodes, node => (0, ast_util_js_1.findParent)(node, node => context.ts.isInterfaceDeclaration(node) && context.ts.isModuleBlock(node.parent) && node.name.getText() === "HTMLElementTagNameMap") != null);
        // Don't continue if the node was found
        if (htmlElementTagNameMapTagNameNode != null) {
            return;
        }
        // Find the identifier node
        const declarationIdentifier = definition.declaration != null ? (0, ast_util_js_1.getNodeIdentifier)(definition.declaration.node, context.ts) : undefined;
        if (declarationIdentifier == null) {
            return;
        }
        // Only report diagnostic if the tag is not built in,
        const tag = context.htmlStore.getHtmlTag(definition.tagName);
        if (!tag?.builtIn) {
            context.report({
                location: (0, range_util_js_1.rangeFromNode)(declarationIdentifier),
                message: `'${definition.tagName}' has not been registered on HTMLElementTagNameMap`,
                fix: () => {
                    return {
                        message: `Register '${definition.tagName}' on HTMLElementTagNameMap`,
                        actions: [
                            {
                                kind: "extendGlobalDeclaration",
                                file: context.file,
                                name: "HTMLElementTagNameMap",
                                newMembers: [`"${definition.tagName}": ${declarationIdentifier.text}`]
                            }
                        ]
                    };
                }
            });
        }
    }
};
exports.default = rule;
//# sourceMappingURL=no-missing-element-type-definition.js.map