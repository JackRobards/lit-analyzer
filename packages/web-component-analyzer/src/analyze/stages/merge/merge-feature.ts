import type { ComponentCssPart } from "../../types/features/component-css-part";
import type { ComponentCssProperty } from "../../types/features/component-css-property";
import type { ComponentEvent } from "../../types/features/component-event";
import type { ComponentMethod } from "../../types/features/component-method";
import type { ComponentSlot } from "../../types/features/component-slot";
import { mergeJsDoc, mergeNamedEntries } from "./merge-util";

/**
 * Merges multiple slots
 * @param slots
 */
export function mergeSlots(slots: ComponentSlot[]): ComponentSlot[] {
	return mergeNamedEntries(slots, slot => slot.name || "");
}

/**
 * Merges multiple css parts
 * @param cssParts
 */
export function mergeCssParts(cssParts: ComponentCssPart[]): ComponentCssPart[] {
	return mergeNamedEntries(cssParts, cssPart => cssPart.name);
}

/**
 * Merges multiple css properties
 * @param cssProps
 */
export function mergeCssProperties(cssProps: ComponentCssProperty[]): ComponentCssProperty[] {
	return mergeNamedEntries(cssProps, cssProp => cssProp.name);
}

/**
 * Merges multiple methods
 * @param methods
 */
export function mergeMethods(methods: ComponentMethod[]): ComponentMethod[] {
	return mergeNamedEntries(
		methods,
		method => method.name,
		(left, right) => ({
			...left,
			jsDoc: mergeJsDoc(left.jsDoc, right.jsDoc)
			//modifiers: mergeModifiers(left.modifiers, right.modifiers)
		})
	);
	/*return mergeEntries(
		methods,
		(method, mergedMethod) => {
			if (method.name === mergedMethod.name) {
				return (method.modifiers?.has("static") || false) === (mergedMethod.modifiers?.has("static") || false);
			}

			return false;
		},
		(left, right) => ({
			...left,
			jsDoc: mergeJsDoc(left.jsDoc, right.jsDoc),
			modifiers: mergeModifiers(left.modifiers, right.modifiers)
		})
	);*/
}

/**
 * Merges multiple events
 * @param events
 */
export function mergeEvents(events: ComponentEvent[]): ComponentEvent[] {
	return mergeNamedEntries(
		events,
		event => event.name,
		(left, right) => ({
			...left,
			jsDoc: mergeJsDoc(left.jsDoc, right.jsDoc),
			type: () => (left.type != null ? left.type() : right.type != null ? right.type() : { kind: "ANY" }),
			typeHint: left.typeHint || right.typeHint
		})
	);
}
