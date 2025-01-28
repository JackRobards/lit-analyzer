"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameLocationsForTagName = renameLocationsForTagName;
const html_document_js_1 = require("../../../parse/document/text-document/html-document/html-document.js");
const ast_util_js_1 = require("../../../util/ast-util.js");
const iterable_util_js_1 = require("../../../util/iterable-util.js");
const range_util_js_1 = require("../../../util/range-util.js");
function renameLocationsForTagName(tagName, context) {
    const locations = [];
    for (const sourceFile of context.program.getSourceFiles()) {
        const documents = context.documentStore.getDocumentsInFile(sourceFile, context.config);
        for (const document of documents) {
            if (document instanceof html_document_js_1.HtmlDocument) {
                document.rootNodes.forEach(rootNode => visitHtmlNode(rootNode, {
                    document,
                    tagName,
                    emitRenameLocation(location) {
                        locations.push(location);
                    }
                }));
            }
        }
    }
    const definition = context.definitionStore.getDefinitionForTagName(tagName);
    if (definition != null) {
        // TODO
        const definitionNode = (0, iterable_util_js_1.iterableFirst)(definition.tagNameNodes);
        if (definitionNode != null) {
            const fileName = definitionNode.getSourceFile().fileName;
            if (context.ts.isCallLikeExpression(definitionNode)) {
                const stringLiteralNode = (0, ast_util_js_1.findChild)(definitionNode, child => context.ts.isStringLiteralLike(child) && child.text === tagName);
                if (stringLiteralNode != null) {
                    locations.push({
                        fileName,
                        range: (0, range_util_js_1.makeSourceFileRange)({ start: stringLiteralNode.getStart() + 1, end: stringLiteralNode.getEnd() - 1 })
                    });
                }
            }
            else if (definitionNode.kind === context.ts.SyntaxKind.JSDocTag) {
                const jsDocTagNode = definitionNode;
                if (jsDocTagNode.comment != null) {
                    const start = jsDocTagNode.tagName.getEnd() + 1;
                    locations.push({
                        fileName,
                        range: (0, range_util_js_1.makeSourceFileRange)({ start, end: start + jsDocTagNode.comment.length })
                    });
                }
            }
            else if (context.ts.isInterfaceDeclaration(definitionNode)) {
                const stringLiteralNode = (0, ast_util_js_1.findChild)(definitionNode, child => context.ts.isStringLiteralLike(child) && child.text === tagName);
                if (stringLiteralNode != null) {
                    locations.push({
                        fileName,
                        range: (0, range_util_js_1.makeSourceFileRange)({ start: stringLiteralNode.getStart() + 1, end: stringLiteralNode.getEnd() - 1 })
                    });
                }
            }
        }
    }
    return locations;
}
function visitHtmlNode(node, context) {
    if (node.tagName === context.tagName) {
        context.emitRenameLocation({
            range: (0, range_util_js_1.documentRangeToSFRange)(context.document, node.location.name),
            fileName: context.document.virtualDocument.fileName
        });
        if (node.location.endTag != null) {
            const { start, end } = node.location.endTag;
            context.emitRenameLocation({
                range: (0, range_util_js_1.documentRangeToSFRange)(context.document, { start: start + 2, end: end - 1 }),
                fileName: context.document.virtualDocument.fileName
            });
        }
    }
    node.children.forEach(childNode => visitHtmlNode(childNode, context));
}
//# sourceMappingURL=rename-locations-for-tag-name.js.map