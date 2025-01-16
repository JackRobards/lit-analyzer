import type { HtmlNode } from "../../../../../types/html-node/html-node-types.js";
import type { ParseHtmlContext } from "./parse-html-context.js";

export interface ParseHtmlAttrContext extends ParseHtmlContext {
	htmlNode: HtmlNode;
}
