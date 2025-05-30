import type { Identifier, ObjectLiteralExpression } from "typescript";
import type { ComponentMember } from "@jackolope/web-component-analyzer";
import type { RuleFixAction, RuleFixActionChangeRange } from "../analyze/types/rule/rule-fix-action.js";
import type { RuleModule } from "../analyze/types/rule/rule-module.js";
import type { RuleModuleContext } from "../analyze/types/rule/rule-module-context.js";
import { findChild, getNodeIdentifier } from "../analyze/util/ast-util.js";
import { makeSourceFileRange, rangeFromNode } from "../analyze/util/range-util.js";

/**
 * Returns the identifier of the decorator used on the member if any
 * @param member
 * @param context
 */
const getDecoratorIdentifier = (member: ComponentMember, context: RuleModuleContext): Identifier | undefined => {
	const decorator = member.meta?.node?.decorator;

	if (decorator == null) {
		return undefined;
	}

	return getNodeIdentifier(decorator, context.ts);
};

/**
 * This rule detects mismatches with property visibilities and the decorators
 * they were defined with.
 */
const rule: RuleModule = {
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
		const hasInternalDecorator = decoratorName === "state";
		const hasPropertyDecorator = decoratorName === "property";

		// Handle cases where @state decorator is used, but the property is public
		if (hasInternalDecorator && (member.visibility === "public" || member.visibility == null)) {
			const inJsFile = context.file.fileName.endsWith(".js");

			context.report({
				location: rangeFromNode(decoratorIdentifier),
				message: `'${member.propName}' is marked as an internal property (@state) but is publicly accessible.`,
				...(inJsFile
					? {
							// We are in Javascript context. Add "@protected" or "@private" JSDoc
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
												range: rangeFromNode(publicModifier),
												newText: keyword
											} as RuleFixActionChangeRange
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
												range: makeSourceFileRange({
													start: propertyIdentifier.getStart(),
													end: propertyIdentifier.getStart()
												}),
												newText: `${keyword} `
											} as RuleFixActionChangeRange
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
			// If the Lit `state` option is set on the decorator, then that is also considered valid
			if (member.meta?.state) {
				return;
			}

			context.report({
				location: rangeFromNode(decoratorIdentifier),
				message: `'${member.propName}' is not publicly accessible but is marked as a public property (@property).`,
				fixMessage: "Use the '@state' decorator instead?",
				fix: () => {
					// Return a code action that can replace the identifier of the decorator
					const newText = `state`;

					// Change identifier to "internal property"
					const actions: RuleFixAction[] = [
						{
							kind: "changeIdentifier",
							identifier: decoratorIdentifier,
							newText
						}
					];

					// Find the object literal node (the config of the "@property" decorator)
					const objectLiteralNode = findChild<ObjectLiteralExpression>(decoratorIdentifier.parent, node =>
						context.ts.isObjectLiteralExpression(node)
					);

					if (objectLiteralNode != null) {
						// Remove the configuration if the config doesn't have any shared properties with the "state" config
						const stateConfigProperties = ["hasChanged"];
						if (!objectLiteralNode.properties?.some(propertyNode => stateConfigProperties.includes(propertyNode.name?.getText() || ""))) {
							actions.push({
								kind: "changeRange",
								range: rangeFromNode(objectLiteralNode),
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

export default rule;
