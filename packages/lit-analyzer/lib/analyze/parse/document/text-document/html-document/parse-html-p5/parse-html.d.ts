import type { DefaultTreeAdapterTypes } from "parse5";
/**
 * Returns if a p5Node is a tag node.
 * @param node
 */
export declare function isTagNode(node: DefaultTreeAdapterTypes.Node): node is DefaultTreeAdapterTypes.Element;
/**
 * Returns if a p5Node is a document fragment.
 * @param node
 */
export declare function isDocumentFragmentNode(node: DefaultTreeAdapterTypes.Node): node is DefaultTreeAdapterTypes.DocumentFragment;
/**
 * Returns if a p5Node is a text node.
 * @param node
 */
export declare function isTextNode(node: DefaultTreeAdapterTypes.Node): node is DefaultTreeAdapterTypes.TextNode;
/**
 * Returns if a p5Node is a comment node.
 * @param node
 */
export declare function isCommentNode(node: DefaultTreeAdapterTypes.Node): node is DefaultTreeAdapterTypes.CommentNode;
/**
 * Parse a html string into p5Nodes.
 * @param html
 */
export declare function parseHtml(html: string): DefaultTreeAdapterTypes.DocumentFragment;
//# sourceMappingURL=parse-html.d.ts.map