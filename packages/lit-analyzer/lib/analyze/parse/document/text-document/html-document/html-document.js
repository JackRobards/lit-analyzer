"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlDocument = void 0;
const range_util_js_1 = require("../../../../util/range-util.js");
const text_document_js_1 = require("../text-document.js");
class HtmlDocument extends text_document_js_1.TextDocument {
    rootNodes;
    constructor(virtualDocument, rootNodes) {
        super(virtualDocument);
        this.rootNodes = rootNodes;
    }
    htmlAttrAreaAtOffset(offset) {
        return this.mapFindOne(node => {
            const offsetNum = typeof offset === "number" ? offset : offset.end;
            if (offsetNum > node.location.name.end && (0, range_util_js_1.intersects)(offset, node.location.startTag)) {
                // Check if the position intersects any attributes. Break if so.
                for (const htmlAttr of node.attributes) {
                    if ((0, range_util_js_1.intersects)(offset, htmlAttr.location)) {
                        return undefined;
                    }
                }
                return node;
            }
            return;
        });
    }
    htmlAttrAssignmentAtOffset(offset) {
        return this.findAttr(attr => attr.assignment != null && attr.assignment.location != null ? (0, range_util_js_1.intersects)(offset, attr.assignment.location) : false);
    }
    htmlAttrNameAtOffset(offset) {
        return this.findAttr(attr => (0, range_util_js_1.intersects)(offset, attr.location.name));
    }
    htmlNodeNameAtOffset(offset) {
        return this.findNode(node => (0, range_util_js_1.intersects)(offset, node.location.name) || (node.location.endTag != null && (0, range_util_js_1.intersects)(offset, node.location.endTag)));
    }
    htmlNodeOrAttrAtOffset(offset) {
        const htmlNode = this.htmlNodeNameAtOffset(offset);
        if (htmlNode != null)
            return htmlNode;
        const htmlAttr = this.htmlAttrNameAtOffset(offset);
        if (htmlAttr != null)
            return htmlAttr;
        return;
    }
    /**
     * Finds the closest node to offset.
     * This method can be used to find out which tag to close in the HTML.
     * @param offset
     */
    htmlNodeClosestToOffset(offset) {
        let closestNode = undefined;
        // Use 'findNode' to iterate nodes. Keep track of the closest node.
        this.findNode(node => {
            if (offset < node.location.startTag.end) {
                // Break as soon as we find a node that starts AFTER the offset.
                // The closestNode would now be the previous found node.
                return true;
            }
            else if (node.location.endTag == null || offset < node.location.endTag.end) {
                // Save closest node if the node doesn't have an end tag of the node ends AFTER the offset.
                closestNode = node;
            }
            return false;
        });
        return closestNode;
    }
    findAttr(test) {
        return this.mapFindOne(node => {
            for (const attr of node.attributes) {
                if (test(attr))
                    return attr;
            }
            return;
        });
    }
    findNode(test) {
        return this.mapFindOne(node => {
            if (test(node))
                return node;
            return;
        });
    }
    mapNodes(map) {
        const items = [];
        function childrenLoop(node) {
            items.push(map(node));
            node.children.forEach(childNode => childrenLoop(childNode));
        }
        this.rootNodes.forEach(rootNode => childrenLoop(rootNode));
        return items;
    }
    *nodes(roots = this.rootNodes) {
        for (const root of roots) {
            yield root;
            yield* this.nodes(root.children);
        }
    }
    mapFindOne(map) {
        for (const node of this.nodes()) {
            const found = map(node);
            if (found != null) {
                return found;
            }
        }
        return;
    }
}
exports.HtmlDocument = HtmlDocument;
//# sourceMappingURL=html-document.js.map