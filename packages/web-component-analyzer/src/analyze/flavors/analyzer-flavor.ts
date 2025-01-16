import type { Node, SourceFile } from "typescript";
import type { AnalyzerVisitContext } from "../analyzer-visit-context";
import type { ComponentDeclaration, ComponentDeclarationKind, ComponentHeritageClause } from "../types/component-declaration";
import type { ComponentCssPart } from "../types/features/component-css-part";
import type { ComponentCssProperty } from "../types/features/component-css-property";
import type { ComponentEvent } from "../types/features/component-event";
import type { ComponentFeature } from "../types/features/component-feature";
import type { ComponentMember } from "../types/features/component-member";
import type { ComponentMethod } from "../types/features/component-method";
import type { ComponentSlot } from "../types/features/component-slot";

export type PriorityKind = "low" | "medium" | "high";

export interface DefinitionNodeResult {
	tagName: string;

	tagNameNode?: Node; // Where to find the node that contains the name of the component
	identifierNode?: Node; // Where to find the node that refers to the declaration node
	declarationNode?: Node; // Where to find the node that contains the implementation of the component

	analyzerFlavor?: AnalyzerFlavor;
}

export interface FeatureVisitReturnTypeMap {
	member: ComponentMember;
	method: ComponentMethod;
	cssproperty: ComponentCssProperty;
	csspart: ComponentCssPart;
	event: ComponentEvent;
	slot: ComponentSlot;
}

export interface ComponentFeatureCollection {
	members: ComponentMember[];
	methods: ComponentMethod[];
	events: ComponentEvent[];
	slots: ComponentSlot[];
	cssProperties: ComponentCssProperty[];
	cssParts: ComponentCssPart[];
}

export interface AnalyzerDeclarationVisitContext extends AnalyzerVisitContext {
	//getDefinition: () => ComponentDefinition;
	getDeclaration: () => ComponentDeclaration;
	declarationNode: Node;
	sourceFile: SourceFile;
}

export type FeatureDiscoverVisitMap<Context extends AnalyzerVisitContext> = {
	[K in ComponentFeature]: (node: Node, context: Context) => FeatureVisitReturnTypeMap[K][] | undefined;
};

export type FeatureRefineVisitMap = {
	[K in ComponentFeature]: (
		feature: FeatureVisitReturnTypeMap[K],
		context: AnalyzerVisitContext
	) => FeatureVisitReturnTypeMap[K] | FeatureVisitReturnTypeMap[K][] | undefined;
};

export interface InheritanceResult {
	heritageClauses?: ComponentHeritageClause[];
	declarationNodes?: Node[];
	declarationKind?: ComponentDeclarationKind;
}

export interface AnalyzerFlavor {
	excludeNode?(node: Node, context: AnalyzerVisitContext): boolean | undefined;
	discoverDefinitions?(node: Node, context: AnalyzerVisitContext): DefinitionNodeResult[] | undefined;
	discoverInheritance?(node: Node, context: AnalyzerVisitContext): InheritanceResult | undefined;
	discoverFeatures?: Partial<FeatureDiscoverVisitMap<AnalyzerDeclarationVisitContext>>;
	discoverGlobalFeatures?: Partial<FeatureDiscoverVisitMap<AnalyzerVisitContext>>;
	refineFeature?: Partial<FeatureRefineVisitMap>;
	refineDeclaration?(declaration: ComponentDeclaration, context: AnalyzerDeclarationVisitContext): ComponentDeclaration | undefined;
}
