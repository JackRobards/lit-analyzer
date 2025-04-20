import type { SimpleType } from "@jackolope/ts-simple-type";
import type { Node, Type } from "typescript";
import type { VisibilityKind } from "../visibility-kind";
import type { ComponentFeatureBase } from "./component-feature";

export interface ComponentMethod extends ComponentFeatureBase {
	name: string;
	node?: Node;
	type?: () => SimpleType | Type;

	visibility?: VisibilityKind;
	//modifiers?: Set<ModifierKind>;
}
