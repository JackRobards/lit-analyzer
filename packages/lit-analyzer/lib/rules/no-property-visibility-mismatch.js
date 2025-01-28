"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_util_js_1 = require("../analyze/util/ast-util.js");
const range_util_js_1 = require("../analyze/util/range-util.js");
/**
 * Returns the identifier of the decorator used on the member if any
 * @param member
 * @param context
 */
const getDecoratorIdentifier = (member, context) => {
    const decorator = member.meta?.node?.decorator;
    if (decorator == null) {
        return undefined;
    }
    return (0, ast_util_js_1.getNodeIdentifier)(decorator, context.ts);
};
/**
 * This rule detects mismatches with property visibilities and the decorators
 * they were defined with.
 */
const rule = {
    id: "no-property-visibility-mismatch",
    meta: {
        priority: "medium"
    },
    visitComponentMember(member, context) {
        // Only run this rule on members of "property" kind
        if (member.kind !== "property") {
            return;
        }
        // Get the decorator of the property if any
        const decoratorIdentifier = getDecoratorIdentifier(member, context);
        if (decoratorIdentifier == null || decoratorIdentifier.getSourceFile() !== context.file) {
            return;
        }
        // Get the decorator of interest
        const decoratorName = decoratorIdentifier.text;
        const hasInternalDecorator = decoratorName === "internalProperty";
        const hasPropertyDecorator = decoratorName === "property";
        // Handle cases where @internalProperty decorator is used, but the property is public
        if (hasInternalDecorator && (member.visibility === "public" || member.visibility == null)) {
            const inJsFile = context.file.fileName.endsWith(".js");
            context.report({
                location: (0, range_util_js_1.rangeFromNode)(decoratorIdentifier),
                message: `'${member.propName}' is marked as an internal property (@internalProperty) but is publicly accessible.`,
                ...(inJsFile
                    ? {
                    // We are in Javascript context. Add "@properted" or "@private" JSDoc
                    }
                    : {
                        // We are in Typescript context. Add "protected" or "private" keyword
                        fixMessage: "Change the property access to 'private' or 'protected'?",
                        fix: () => {
                            // Make sure we operate on a property declaration
                            const propertyDeclaration = member.node;
                            if (!context.ts.isPropertyDeclaration(propertyDeclaration)) {
                                return [];
                            }
                            // The modifiers the user can choose to add to fix this warning/error
                            const modifiers = ["protected", "private"];
                            // Get the public modifier if any. If one exists, we want to change that one.
                            const publicModifier = propertyDeclaration.modifiers?.find(modifier => modifier.kind === context.ts.SyntaxKind.PublicKeyword);
                            if (publicModifier != null) {
                                // Return actions that can replace the modifier
                                return modifiers.map(keyword => ({
                                    message: `Change to '${keyword}'`,
                                    actions: [
                                        {
                                            kind: "changeRange",
                                            range: (0, range_util_js_1.rangeFromNode)(publicModifier),
                                            newText: keyword
                                        }
                                    ]
                                }));
                            }
                            // If there is no existing visibility modifier, add a new modifier right in front of the property name (identifier)
                            const propertyIdentifier = propertyDeclaration.name;
                            if (propertyIdentifier != null) {
                                // Return actions that can add a modifier in front of the identifier
                                return modifiers.map(keyword => ({
                                    message: `Add '${keyword}' modifier`,
                                    actions: [
                                        {
                                            kind: "changeRange",
                                            range: (0, range_util_js_1.makeSourceFileRange)({
                                                start: propertyIdentifier.getStart(),
                                                end: propertyIdentifier.getStart()
                                            }),
                                            newText: `${keyword} `
                                        }
                                    ]
                                }));
                            }
                            return [];
                        }
                    })
            });
        }
        // Handle cases where @property decorator is used, but the property is not public
        else if (hasPropertyDecorator && member.visibility !== "public") {
            context.report({
                location: (0, range_util_js_1.rangeFromNode)(decoratorIdentifier),
                message: `'${member.propName}' is not publicly accessible but is marked as a public property (@property).`,
                fixMessage: "Use the '@internalProperty' decorator instead?",
                fix: () => {
                    // Return a code action that can replace the identifier of the decorator
                    const newText = `internalProperty`;
                    // Change identifier to "internal property"
                    const actions = [
                        {
                            kind: "changeIdentifier",
                            identifier: decoratorIdentifier,
                            newText
                        }
                    ];
                    // Find the object literal node (the config of the "@property" decorator)
                    const objectLiteralNode = (0, ast_util_js_1.findChild)(decoratorIdentifier.parent, node => context.ts.isObjectLiteralExpression(node));
                    if (objectLiteralNode != null) {
                        // Remove the configuration if the config doesn't have any shared properties with the "internalProperty" config
                        const internalPropertyConfigProperties = ["hasChanged"];
                        if (!objectLiteralNode.properties?.some(propertyNode => internalPropertyConfigProperties.includes(propertyNode.name?.getText() || ""))) {
                            actions.push({
                                kind: "changeRange",
                                range: (0, range_util_js_1.rangeFromNode)(objectLiteralNode),
                                newText: ""
                            });
                        }
                    }
                    return {
                        message: `Change to '${newText}'`,
                        actions
                    };
                }
            });
        }
    }
};
exports.default = rule;
//# sourceMappingURL=no-property-visibility-mismatch.js.map