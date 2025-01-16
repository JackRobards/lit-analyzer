import type { SimpleType } from "ts-simple-type";
import type { CallExpression, Node } from "typescript";

export interface LitElementPropertyConfig {
	type?: SimpleType | string;
	attribute?: string | boolean;
	node?: {
		type?: Node;
		attribute?: Node;
		decorator?: CallExpression;
	};
	hasConverter?: boolean;
	default?: unknown;
	reflect?: boolean;
	state?: boolean;
}
