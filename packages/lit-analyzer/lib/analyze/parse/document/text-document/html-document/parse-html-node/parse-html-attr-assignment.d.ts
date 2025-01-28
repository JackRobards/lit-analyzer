import type { HtmlNodeAttrAssignment } from "../../../../../types/html-node/html-node-attr-assignment-types.js";
import type { HtmlNodeAttr } from "../../../../../types/html-node/html-node-attr-types.js";
import type { ParseHtmlContext } from "./parse-html-context.js";
import type { DefaultTreeAdapterTypes, Token } from "parse5";
/**
 * Parses a html attribute assignment.
 * @param p5Node
 * @param p5Attr
 * @param htmlAttr
 * @param context
 */
export declare function parseHtmlAttrAssignment(p5Node: DefaultTreeAdapterTypes.Element, p5Attr: Token.Attribute, htmlAttr: HtmlNodeAttr, context: ParseHtmlContext): HtmlNodeAttrAssignment | undefined;
//# sourceMappingURL=parse-html-attr-assignment.d.ts.map