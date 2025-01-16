import type { AnalyzerVisitContext } from "../../analyzer-visit-context";
import type { ComponentMethod } from "../../types/features/component-method";
import type { AnalyzerFlavor } from "../analyzer-flavor";

export const refineFeature: AnalyzerFlavor["refineFeature"] = {
	method: (method: ComponentMethod, context: AnalyzerVisitContext): ComponentMethod | undefined => {
		// This is temporary, but for now we force lit-element named methods to be protected
		if (LIT_ELEMENT_PROTECTED_METHODS.includes(method.name)) {
			return {
				...method,
				visibility: "protected"
			};
		}

		return method;
	}
};

const LIT_ELEMENT_PROTECTED_METHODS = [
	"render",
	"requestUpdate",
	"firstUpdated",
	"updated",
	"update",
	"shouldUpdate",
	"hasUpdated",
	"updateComplete"
];
