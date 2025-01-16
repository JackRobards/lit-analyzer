import type { Node } from "typescript";
import type { AnalyzerVisitContext } from "../../analyzer-visit-context";
import { getNodeName } from "../../util/resolve-declarations";

export function excludeNode(node: Node, context: AnalyzerVisitContext): boolean | undefined {
	if (context.config.analyzeDependencies) {
		return undefined;
	}

	// Exclude lit element related super classes if "analyzeLib" is false
	const declName = getNodeName(node, context);
	if (declName != null) {
		return declName === "LitElement" || declName === "UpdatingElement";
	} else {
		const fileName = node.getSourceFile().fileName;

		return fileName.includes("/lit-element.") || fileName.endsWith("/updating-element.");
	}
}
