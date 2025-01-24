import type { DefaultTreeAdapterTypes } from "parse5";
import { parseFragment } from "parse5";

/**
 * Returns if a p5Node is a tag node.
 * @param node
 */
export function isTagNode(node: DefaultTreeAdapterTypes.Node): node is DefaultTreeAdapterTypes.Element {
	return !node.nodeName.includes("#");
}

/**
 * Returns if a p5Node is a document fragment.
 * @param node
 */
export function isDocumentFragmentNode(node: DefaultTreeAdapterTypes.Node): node is DefaultTreeAdapterTypes.DocumentFragment {
	return node.nodeName === "#document-fragment";
}

/**
 * Returns if a p5Node is a text node.
 * @param node
 */
export function isTextNode(node: DefaultTreeAdapterTypes.Node): node is DefaultTreeAdapterTypes.TextNode {
	return node.nodeName === "#text";
}

/**
 * Returns if a p5Node is a comment node.
 * @param node
 */
export function isCommentNode(node: DefaultTreeAdapterTypes.Node): node is DefaultTreeAdapterTypes.CommentNode {
	return node.nodeName === "#comment";
}

/**
 * Parse a html string into p5Nodes.
 * @param html
 */
export function parseHtml(html: string): DefaultTreeAdapterTypes.DocumentFragment {
	return parseFragment(html, { sourceCodeLocationInfo: true });
}
