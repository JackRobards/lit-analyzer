import {
	LIT_HTML_BOOLEAN_ATTRIBUTE_MODIFIER,
	LIT_HTML_EVENT_LISTENER_ATTRIBUTE_MODIFIER,
	LIT_HTML_PROP_ATTRIBUTE_MODIFIER
} from "../../../../../constants.js";
import type { HtmlNodeAttr, IHtmlNodeAttrBase, IHtmlNodeAttrSourceCodeLocation } from "../../../../../types/html-node/html-node-attr-types.js";
import { HtmlNodeAttrKind } from "../../../../../types/html-node/html-node-attr-types.js";
import { parseLitAttrName } from "../../../../../util/general-util.js";
import { parseHtmlAttrAssignment } from "./parse-html-attr-assignment.js";
import type { ParseHtmlAttrContext } from "./parse-html-attr-context.js";
import type { DefaultTreeAdapterTypes, Token } from "parse5";

/**
 * Creates multiple html attributes based on multiple p5Attributes.
 * @param p5Node
 * @param context
 */
export function parseHtmlNodeAttrs(p5Node: DefaultTreeAdapterTypes.Element, context: ParseHtmlAttrContext): HtmlNodeAttr[] {
	return p5Node.attrs
		.map(htmlAttr =>
			parseHtmlNodeAttr(p5Node, htmlAttr, {
				...context,
				htmlNode: context.htmlNode
			})
		)
		.filter((attr): attr is HtmlNodeAttr => attr != null);
}

/**
 * Creates a html attr based on a p5Attr.
 * @param p5Node
 * @param p5Attr
 * @param context
 */
export function parseHtmlNodeAttr(
	p5Node: DefaultTreeAdapterTypes.Element,
	p5Attr: Token.Attribute,
	context: ParseHtmlAttrContext
): HtmlNodeAttr | undefined {
	const { htmlNode } = context;
	const { name, modifier } = parseLitAttrName(p5Attr.name);

	const location = makeHtmlAttrLocation(p5Node, p5Attr, context);
	if (location == null) {
		return undefined;
	}

	const htmlAttrBase: IHtmlNodeAttrBase = {
		name: name.toLowerCase(), // Parse5 lowercases all attributes names. Therefore ".myAttr" becomes ".myattr"
		document: context.document,
		modifier,
		htmlNode,
		location
	};

	const htmlAttr = parseHtmlAttrBase(htmlAttrBase);

	htmlAttr.assignment = parseHtmlAttrAssignment(p5Node, p5Attr, htmlAttr, context);

	return htmlAttr;
}

/**
 * Returns source code location based on a p5Node.
 * @param p5Node
 * @param p5Attr
 * @param context
 */
function makeHtmlAttrLocation(
	p5Node: DefaultTreeAdapterTypes.Element,
	p5Attr: Token.Attribute,
	context: ParseHtmlAttrContext
): IHtmlNodeAttrSourceCodeLocation | undefined {
	const { name, modifier } = parseLitAttrName(p5Attr.name);

	const sourceLocation = p5Node.sourceCodeLocation;
	if (sourceLocation == null) {
		return undefined;
	}

	// Explicitly call "toLowerCase()" because of inconsistencies in parse5.
	// Parse5 lowercases source code location attr keys but doesnt lowercase the attr name when it comes to svg.
	// It would be correct not to lowercase the attr names because svg is case sensitive
	const sourceCodeLocationName = `${p5Attr.prefix || ""}${(p5Attr.prefix && ":") || ""}${p5Attr.name}`.toLowerCase();
	const htmlAttrLocation = ((sourceLocation.startTag as Token.LocationWithAttributes)?.attrs || {})[sourceCodeLocationName];
	const start = htmlAttrLocation.startOffset;
	const end = htmlAttrLocation.endOffset;
	return {
		start,
		end,
		name: {
			start: start + (modifier ? modifier.length : 0),
			end: start + (modifier ? modifier.length : 0) + name.length
		}
	};
}

function parseHtmlAttrBase(htmlAttrBase: IHtmlNodeAttrBase): HtmlNodeAttr {
	const { modifier } = htmlAttrBase;

	switch (modifier) {
		case LIT_HTML_EVENT_LISTENER_ATTRIBUTE_MODIFIER:
			return {
				kind: HtmlNodeAttrKind.EVENT_LISTENER,
				...htmlAttrBase,
				modifier
			};
		case LIT_HTML_PROP_ATTRIBUTE_MODIFIER:
			return {
				kind: HtmlNodeAttrKind.PROPERTY,
				...htmlAttrBase,
				modifier
			};
		case LIT_HTML_BOOLEAN_ATTRIBUTE_MODIFIER:
			return {
				kind: HtmlNodeAttrKind.BOOLEAN_ATTRIBUTE,
				...htmlAttrBase,
				modifier
			};

		default:
			return {
				kind: HtmlNodeAttrKind.ATTRIBUTE,
				...htmlAttrBase,
				modifier: undefined
			};
	}
}
