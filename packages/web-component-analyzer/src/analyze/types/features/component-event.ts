import type { SimpleType } from "ts-simple-type";
import type { Node, Type } from "typescript";
import type { VisibilityKind } from "../visibility-kind";
import type { ComponentFeatureBase } from "./component-feature";

export interface ComponentEvent extends ComponentFeatureBase {
	name: string;
	node: Node;
	type?: () => SimpleType | Type;
	typeHint?: string;
	visibility?: VisibilityKind;
	deprecated?: boolean | string;
}
