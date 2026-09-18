import type { SimpleType } from "ts-simple-type";
import { isSimpleType, typeToString, validateType } from "ts-simple-type";
import type { Type, TypeReference } from "typescript";
import type { HtmlNodeAttrAssignment } from "../analyze/types/html-node/html-node-attr-assignment-types.js";
import { HtmlNodeAttrKind } from "../analyze/types/html-node/html-node-attr-types.js";
import type { RuleModule } from "../analyze/types/rule/rule-module.js";
import type { RuleModuleContext } from "../analyze/types/rule/rule-module-context.js";
import { rangeFromHtmlNodeAttr } from "../analyze/util/range-util.js";
import { getDirective } from "./util/directive/get-directive.js";
import { extractBindingTypes, inferTypeFromAssignment } from "./util/type/extract-binding-types.js";

/**
 * This rule validates that only callable types are used within event binding expressions.
 * This rule catches typos like: @click="onClick()"
 */
const rule: RuleModule = {
	id: "no-noncallable-event-binding",
	meta: {
		priority: "high"
	},
	visitHtmlAssignment(assignment, context) {
		// Only validate event listener bindings.
		const { htmlAttr } = assignment;
		if (htmlAttr.kind !== HtmlNodeAttrKind.EVENT_LISTENER) {
			return;
		}

		const { typeB } = extractBindingTypes(assignment, context);

		// Make sure that the expression given to the event listener binding a function or an object with "handleEvent" property.
		if (!isTypeBindableToEventListener(typeB) && !isNativeAssignmentBindableToEventListener(assignment, context)) {
			context.report({
				location: rangeFromHtmlNodeAttr(htmlAttr),
				message: `You are setting up an event listener with a non-callable type '${typeToString(typeB)}'`
			});
		}
	}
};

export default rule;

/**
 * SimpleType can lose generic constraints and instantiated member types. Consult
 * the checker for these cases while retaining directives' projected value types.
 */
function isNativeAssignmentBindableToEventListener(assignment: HtmlNodeAttrAssignment, context: RuleModuleContext): boolean {
	const checker = context.program.getTypeChecker();
	let type = inferTypeFromAssignment(assignment, checker);
	if (isSimpleType(type)) {
		return false;
	}

	const directive = getDirective(assignment, context);
	if (directive != null) {
		if (directive.kind === "guard" && directive.args.length >= 2) {
			const callback = checker.getTypeAtLocation(directive.args[1]);
			const signature = checker.getSignaturesOfType(callback, context.ts.SignatureKind.Call)[0];
			if (signature == null) {
				return false;
			}
			type = checker.getReturnTypeOfSignature(signature);
		} else if (typeof directive.kind === "object" && directive.actualType != null) {
			// getDirective projects the first type argument of a generic DirectiveFn.
			const typeArguments =
				type.aliasTypeArguments ??
				(type.flags & context.ts.TypeFlags.Object && (type as TypeReference).objectFlags & context.ts.ObjectFlags.Reference
					? checker.getTypeArguments(type as TypeReference)
					: undefined);
			if (typeArguments?.[0] == null) {
				return false;
			}
			type = typeArguments[0];
		} else {
			// Do not accept a directive's raw callable/any type when its projected
			// binding value is invalid or no native projection is available.
			return false;
		}
	}

	return isNativeTypeBindableToEventListener(type, context);
}

function isNativeTypeBindableToEventListener(type: Type, context: RuleModuleContext, allowOptional = true, allowListenerObject = true): boolean {
	const { ts } = context;
	const checker = context.program.getTypeChecker();
	if (type.flags & ts.TypeFlags.TypeParameter) {
		const constraint = checker.getBaseConstraintOfType(type);
		return constraint != null && constraint !== type && isNativeTypeBindableToEventListener(constraint, context, allowOptional, allowListenerObject);
	}

	if (type.isUnion()) {
		// Match the binding extractor's exclusion of Lit's nothing/noChange symbols.
		const listeners = allowOptional
			? type.types.filter(member => !(member.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.ESSymbolLike)))
			: type.types;
		return (
			listeners.length > 0 && listeners.every(member => isNativeTypeBindableToEventListener(member, context, allowOptional, allowListenerObject))
		);
	}

	if (type.flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) {
		return true;
	}
	if (checker.getSignaturesOfType(type, ts.SignatureKind.Call).length > 0) {
		return true;
	}
	if (!allowListenerObject) {
		return false;
	}

	const handleEvent = checker.getPropertyOfType(type, "handleEvent");
	return (
		handleEvent != null &&
		!(handleEvent.flags & ts.SymbolFlags.Optional) &&
		isNativeTypeBindableToEventListener(checker.getTypeOfSymbolAtLocation(handleEvent, context.file), context, false, false)
	);
}

/**
 * Returns if this type can be used in a event listener binding
 * @param type
 */
function isTypeBindableToEventListener(type: SimpleType, allowOptional = true, allowListenerObject = true): boolean {
	// Optional handlers may omit the listener, but every concrete alternative must
	// be valid. A nullish-only union does not provide a listener.
	if (type.kind === "UNION") {
		const listeners = allowOptional ? type.types.filter(member => member.kind !== "NULL" && member.kind !== "UNDEFINED") : type.types;
		return listeners.length > 0 && listeners.every(member => isTypeBindableToEventListener(member, allowOptional, allowListenerObject));
	}

	// A callable function can be intersected with control methods, as in
	// lodash's DebouncedFunc<T>. The intersection remains callable when any
	// constituent supplies the call signature.
	if (type.kind === "INTERSECTION") {
		return type.types.some(member => isTypeBindableToEventListener(member, false, allowListenerObject));
	}

	// A named alias can hide the callable intersection from the structural
	// checks below. Resolve the alias while preserving the existing behavior for
	// non-callable object aliases.
	if (type.kind === "ALIAS") {
		return isTypeBindableToEventListener(type.target, allowOptional, allowListenerObject);
	}

	if (type.kind === "GENERIC_ARGUMENTS") {
		return isTypeBindableToEventListener(type.target, allowOptional, allowListenerObject);
	}

	// Return "true" if the type has a call signature
	if ("call" in type && type.call != null) {
		return true;
	}

	// Any and unknown values are intentionally allowed because the analyzer cannot
	// determine whether they are callable. A generic parameter is different: its
	// constraint must provide a call signature before it can be accepted here.
	if (type.kind === "ANY" || type.kind === "UNKNOWN" || type.kind === "FUNCTION" || type.kind === "METHOD") {
		return true;
	}

	return validateType(type, simpleType => {
		switch (simpleType.kind) {
			// Functions and methods can hide behind generic parameter or alias resolution.
			case "FUNCTION":
			case "METHOD":
				return true;

			case "ENUM_MEMBER":
				return isTypeBindableToEventListener(simpleType.type, allowOptional, allowListenerObject);

			// Object types with attributes for the setup function of the event listener can be used
			case "OBJECT":
			case "INTERFACE": {
				if (!allowListenerObject) {
					return false;
				}
				// The "handleEvent" property must be present
				const handleEventFunctions = simpleType.members?.filter(member => member.name === "handleEvent" && !member.optional) || [];

				// The "handleEvent" property must be callable
				if (handleEventFunctions.length > 0) {
					return handleEventFunctions.some(member => isTypeBindableToEventListener(member.type, false, false));
				}
			}
		}

		return undefined;
	});
}
