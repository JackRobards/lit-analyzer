import type { Node } from "typescript";
import type { AnalyzerVisitContext } from "../../analyzer-visit-context";
import type { ComponentCssPart } from "../../types/features/component-css-part";
import type { ComponentCssProperty } from "../../types/features/component-css-property";
import type { ComponentEvent } from "../../types/features/component-event";
import type { ComponentMember } from "../../types/features/component-member";
import type { ComponentSlot } from "../../types/features/component-slot";
import type { AnalyzerFlavor } from "../analyzer-flavor";
import { discoverFeatures } from "./discover-features";

export const discoverGlobalFeatures: AnalyzerFlavor["discoverGlobalFeatures"] = {
	csspart: (node: Node, context: AnalyzerVisitContext): ComponentCssPart[] | undefined => {
		if (context.ts.isInterfaceDeclaration(node) && node.name.text === "HTMLElement") {
			return discoverFeatures.csspart?.(node, context);
		}
		return;
	},
	cssproperty: (node: Node, context: AnalyzerVisitContext): ComponentCssProperty[] | undefined => {
		if (context.ts.isInterfaceDeclaration(node) && node.name.text === "HTMLElement") {
			return discoverFeatures.cssproperty?.(node, context);
		}
		return;
	},
	event: (node: Node, context: AnalyzerVisitContext): ComponentEvent[] | undefined => {
		if (context.ts.isInterfaceDeclaration(node) && node.name.text === "HTMLElement") {
			return discoverFeatures.event?.(node, context);
		}
		return;
	},
	slot: (node: Node, context: AnalyzerVisitContext): ComponentSlot[] | undefined => {
		if (context.ts.isInterfaceDeclaration(node) && node.name.text === "HTMLElement") {
			return discoverFeatures.slot?.(node, context);
		}
		return;
	},
	member: (node: Node, context: AnalyzerVisitContext): ComponentMember[] | undefined => {
		if (context.ts.isInterfaceDeclaration(node) && node.name.text === "HTMLElement") {
			return discoverFeatures?.member?.(node, context);
		}
		return;
	}
};
