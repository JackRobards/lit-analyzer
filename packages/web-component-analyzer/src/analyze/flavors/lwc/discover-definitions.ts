import type { Node } from "typescript";
import type { AnalyzerVisitContext } from "../../analyzer-visit-context";
import type { DefinitionNodeResult } from "../analyzer-flavor";
import { getLwcComponent } from "./utils";

export function discoverDefinitions(node: Node, context: AnalyzerVisitContext): DefinitionNodeResult[] | undefined {
	const { ts } = context;
	if (ts.isClassDeclaration(node)) {
		const lwc = getLwcComponent(node, context);
		if (lwc) {
			return [
				{
					tagName: lwc.tagName,
					tagNameNode: node.heritageClauses?.[0].types[0],
					declarationNode: node
				}
			];
		}
	}
	return undefined;
}
