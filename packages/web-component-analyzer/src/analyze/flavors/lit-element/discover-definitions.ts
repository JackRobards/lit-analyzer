import type { Node } from "typescript";
import type { AnalyzerVisitContext } from "../../analyzer-visit-context";
import { getDecorators } from "../../util/ast-util";
import { getNodeIdentifier } from "../../util/resolve-declarations";
import { resolveNodeValue } from "../../util/resolve-node-value";
import type { DefinitionNodeResult } from "../analyzer-flavor";

/**
 * Visits lit-element related definitions.
 * Specifically it finds the usage of the @customElement decorator.
 * @param node
 * @param context
 */
export function discoverDefinitions(node: Node, context: AnalyzerVisitContext): DefinitionNodeResult[] | undefined {
	const { ts, checker } = context;

	// @customElement("my-element")
	if (ts.isClassDeclaration(node)) {
		// Visit all decorators on the class
		for (const decorator of getDecorators(node, context)) {
			const callExpression = decorator.expression;

			// Find "@customElement"
			if (ts.isCallExpression(callExpression) && ts.isIdentifier(callExpression.expression)) {
				const decoratorIdentifierName = callExpression.expression.escapedText;

				// Decorators called "customElement"
				if (decoratorIdentifierName === "customElement") {
					// Resolve the value of the first argument. This is the tag name.
					const unresolvedTagNameNode = callExpression.arguments[0];
					const resolvedTagNameNode = resolveNodeValue(unresolvedTagNameNode, { ts, checker, strict: true });
					const identifier = getNodeIdentifier(node, context);

					if (resolvedTagNameNode != null && typeof resolvedTagNameNode.value === "string") {
						return [
							{
								tagName: resolvedTagNameNode.value,
								tagNameNode: resolvedTagNameNode.node,
								identifierNode: identifier
							}
						];
					}
				}
			}
		}

		return;
	}

	node.forEachChild(child => {
		discoverDefinitions(child, context);
	});

	return;
}
