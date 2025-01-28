"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findParent = findParent;
exports.findChild = findChild;
exports.getNodeAtPosition = getNodeAtPosition;
exports.nodeIntersects = nodeIntersects;
exports.leadingCommentsIncludes = leadingCommentsIncludes;
exports.getNodeIdentifier = getNodeIdentifier;
const ts_module_js_1 = require("../ts-module.js");
const range_util_js_1 = require("./range-util.js");
/**
 * Tests nodes recursively walking up the tree using parent nodes.
 * @param node
 * @param test
 */
function findParent(node, test) {
    if (node == null)
        return;
    return test(node) ? node : findParent(node.parent, test);
}
function findChild(node, test) {
    if (!node)
        return;
    if (test(node))
        return node;
    return node.forEachChild(child => findChild(child, test));
}
/**
 * Returns a node at a specific position.
 * @param node
 * @param position
 */
function getNodeAtPosition(node, position) {
    if (!(0, range_util_js_1.intersects)(position, { start: node.pos, end: node.end })) {
        return;
    }
    return node.forEachChild(child => getNodeAtPosition(child, position)) || node;
}
function nodeIntersects(nodeA, nodeB) {
    return (0, range_util_js_1.intersects)({
        start: nodeA.getStart(),
        end: nodeA.getEnd()
    }, {
        start: nodeB.getStart(),
        end: nodeB.getEnd()
    });
}
/**
 * Checks whether a leading comment includes a given search string.
 * @param text
 * @param pos
 * @param needle
 */
function leadingCommentsIncludes(text, pos, needle) {
    // Get the leading comments to the position.
    const leadingComments = ts_module_js_1.tsModule.ts.getLeadingCommentRanges(text, pos);
    // If any leading comments exists, we check whether the needle matches the context of the comment.
    if (leadingComments != null) {
        for (const comment of leadingComments) {
            const commentText = text.substring(comment.pos, comment.end);
            if (commentText.includes(needle)) {
                return true;
            }
        }
    }
    return false;
}
/**
 * Returns the declaration name of a given node if possible.
 * @param node
 * @param ts
 */
function getNodeIdentifier(node, ts) {
    if (ts.isIdentifier(node)) {
        return node;
    }
    else if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
        return node.expression;
    }
    else if ((ts.isClassLike(node) ||
        ts.isInterfaceDeclaration(node) ||
        ts.isVariableDeclaration(node) ||
        ts.isMethodDeclaration(node) ||
        ts.isPropertyDeclaration(node) ||
        ts.isFunctionDeclaration(node)) &&
        node.name != null &&
        ts.isIdentifier(node.name)) {
        return node.name;
    }
    return undefined;
}
//# sourceMappingURL=ast-util.js.map