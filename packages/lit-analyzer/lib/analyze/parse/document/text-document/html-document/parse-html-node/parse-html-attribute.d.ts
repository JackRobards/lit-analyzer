import type { HtmlNodeAttr } from "../../../../../types/html-node/html-node-attr-types.js";
import type { ParseHtmlAttrContext } from "./parse-html-attr-context.js";
import type { DefaultTreeAdapterTypes, Token } from "parse5";
/**
 * Creates multiple html attributes based on multiple p5Attributes.
 * @param p5Node
 * @param context
 */
export declare function parseHtmlNodeAttrs(p5Node: DefaultTreeAdapterTypes.Element, context: ParseHtmlAttrContext): HtmlNodeAttr[];
/**
 * Creates a html attr based on a p5Attr.
 * @param p5Node
 * @param p5Attr
 * @param context
 */
export declare function parseHtmlNodeAttr(p5Node: DefaultTreeAdapterTypes.Element, p5Attr: Token.Attribute, context: ParseHtmlAttrContext): HtmlNodeAttr | undefined;
//# sourceMappingURL=parse-html-attribute.d.ts.map