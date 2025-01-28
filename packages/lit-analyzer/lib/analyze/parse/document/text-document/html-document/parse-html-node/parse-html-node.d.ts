import type { HtmlNode } from "../../../../../types/html-node/html-node-types.js";
import type { DefaultTreeAdapterTypes } from "parse5";
import type { ParseHtmlContext } from "./parse-html-context.js";
/**
 * Parses multiple p5Nodes into multiple html nodes.
 * @param p5Nodes
 * @param parent
 * @param context
 */
export declare function parseHtmlNodes(p5Nodes: DefaultTreeAdapterTypes.Node[], parent: HtmlNode | undefined, context: ParseHtmlContext): HtmlNode[];
/**
 * Parses a single p5Node into a html node.
 * @param p5Node
 * @param parent
 * @param context
 */
export declare function parseHtmlNode(p5Node: DefaultTreeAdapterTypes.Element, parent: HtmlNode | undefined, context: ParseHtmlContext): HtmlNode | undefined;
//# sourceMappingURL=parse-html-node.d.ts.map