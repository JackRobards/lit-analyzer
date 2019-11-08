import { HtmlNodeAttr } from "../../types/html-node/html-node-attr-types";
import { SimpleType, toTypeString, SimpleTypeKind } from "ts-simple-type";
import { LitAnalyzerRequest } from "../../lit-analyzer-context";
import { LitHtmlDiagnostic, LitHtmlDiagnosticKind } from "../../types/lit-diagnostic";
import { LitAnalyzerRuleName } from "../../lit-analyzer-config";

/**
 * If the user's security policy overrides normal type checking for this
 * attribute binding, returns a (possibly empty) array of diagnostics.
 *
 * If the security policy does not apply to this binding, then
 */
export function isAssignableBindingUnderSecuritySystem(
	htmlAttr: HtmlNodeAttr,
	{ typeA, typeB }: { typeA: SimpleType; typeB: SimpleType },
	request: LitAnalyzerRequest,
	source: LitAnalyzerRuleName
): LitHtmlDiagnostic[] | undefined {
	const securityPolicy = request.config.securitySystem;
	switch (securityPolicy) {
		case "off":
			return undefined; // No security checks apply.
		case "ClosureSafeTypes":
			return checkClosureSecurityAssignability(typeB, htmlAttr, request, source);
		default: {
			const never: never = securityPolicy;
			request.logger.error(`Unexpected security policy: ${never}`);
			return undefined;
		}
	}
}

interface TagNameToSecurityOverrideMap {
	[tagName: string]: SecurityOverrideMap | undefined;
}

// A map from attribute/property names to an array of type names.
// Assignments to the given attribute must match one of the given types.
interface SecurityOverrideMap {
	[attributeName: string]: string[] | undefined;
}

const closureScopedOverrides: TagNameToSecurityOverrideMap = {
	iframe: {
		src: ["TrustedResourceUrl"]
	},
	a: {
		href: ["TrustedResourceUrl", "SafeUrl", "string"]
	},
	img: {
		src: ["TrustedResourceUrl", "SafeUrl", "string"]
	},
	script: {
		src: ["TrustedResourceUrl"]
	}
};
const closureGlobalOverrides: SecurityOverrideMap = {
	style: ["SafeStyle", "string"]
};

function checkClosureSecurityAssignability(
	typeB: SimpleType,
	htmlAttr: HtmlNodeAttr,
	request: LitAnalyzerRequest,
	source: LitAnalyzerRuleName
): LitHtmlDiagnostic[] | undefined {
	const scopedOverride = closureScopedOverrides[htmlAttr.htmlNode.tagName];
	const overriddenTypes = (scopedOverride && scopedOverride[htmlAttr.name]) || closureGlobalOverrides[htmlAttr.name];
	if (overriddenTypes === undefined) {
		return undefined;
	}
	const typeMatch = matchesAtLeastOneNominalType(overriddenTypes, typeB);
	if (typeMatch === undefined) {
		return undefined;
	}
	if (typeMatch === false) {
		const nominalType: SimpleType = {
			kind: SimpleTypeKind.INTERFACE,
			members: [],
			name: "A security type"
		};
		return [
			{
				kind: LitHtmlDiagnosticKind.INVALID_ATTRIBUTE_EXPRESSION_TYPE,
				message: `Type '${toTypeString(typeB)}' is not assignable to '${overriddenTypes.join(" | ")}'.`,
				severity: "error",
				source,
				location: { document: request.document, ...htmlAttr.location.name },
				htmlAttr,
				typeA: nominalType,
				typeB
			}
		];
	}
	return [];
}

function matchesAtLeastOneNominalType(typeNames: string[], typeB: SimpleType): boolean | undefined {
	// Directives are out of scope of lit's security system.
	if (looksLikeADirective(typeB)) {
		return undefined;
	}
	if (typeB.name !== undefined && typeNames.includes(typeB.name)) {
		return true;
	}
	switch (typeB.kind) {
		case "UNION":
			return typeB.types.every(t => matchesAtLeastOneNominalType(typeNames, t));
		case "STRING_LITERAL":
		case "STRING":
			return typeNames.includes("string");
		case "GENERIC_ARGUMENTS":
			return matchesAtLeastOneNominalType(typeNames, typeB.target);
		default:
			return false;
	}
}

function looksLikeADirective(type: SimpleType): boolean {
	// If it has this type name, probably a directive.
	if (type.name === "DirectiveFn") {
		return true;
	}
	// Otherwise, look for a function that takes a part and returns nothing.
	if (type.kind !== "FUNCTION" && type.kind !== "METHOD") {
		return false;
	}
	if (type.argTypes === undefined || type.argTypes.length !== 1) {
		return false;
	}
	const [argType] = type.argTypes;
	if (argType.type.name !== "Part" && argType.type.name !== "NodePart") {
		return false;
	}
	if (type.returnType === undefined || type.returnType.kind !== SimpleTypeKind.VOID) {
		return false;
	}
	return true;
}
