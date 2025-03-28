import type { SimpleType } from "ts-simple-type";
import { typeToString } from "ts-simple-type";
import type { HtmlNodeAttr } from "../../../analyze/types/html-node/html-node-attr-types.js";
import type { RuleModuleContext } from "../../../analyze/types/rule/rule-module-context.js";
import { rangeFromHtmlNodeAttr } from "../../../analyze/util/range-util.js";
import { isAssignableBindingUnderSecuritySystem } from "./is-assignable-binding-under-security-system.js";
import { isAssignableToType } from "./is-assignable-to-type.js";

export function isAssignableInPropertyBinding(
	htmlAttr: HtmlNodeAttr,
	{ typeA, typeB }: { typeA: SimpleType; typeB: SimpleType },
	context: RuleModuleContext
): boolean | undefined {
	const securitySystemResult = isAssignableBindingUnderSecuritySystem(htmlAttr, { typeA, typeB }, context);
	if (securitySystemResult !== undefined) {
		// The security diagnostics take precedence here,
		//   and we should not do any more checking.
		return securitySystemResult;
	}

	// Exclude `undefined` from union type checks
	const filteredTypeB = typeB.kind === "UNION" ? { ...typeB, types: typeB.types.filter(type => type.kind !== "UNDEFINED") } : typeB;

	if (!isAssignableToType({ typeA, typeB: filteredTypeB }, context)) {
		context.report({
			location: rangeFromHtmlNodeAttr(htmlAttr),
			message: `Type '${typeToString(typeB)}' is not assignable to '${typeToString(typeA)}'`
		});

		return false;
	}

	return true;
}
