"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTaggedTemplates = findTaggedTemplates;
exports.visitTaggedTemplateNodes = visitTaggedTemplateNodes;
const ts_module_js_1 = require("../../ts-module.js");
const ast_util_js_1 = require("../../util/ast-util.js");
function findTaggedTemplates(sourceFile, templateTags, position) {
    if (position != null) {
        const token = (0, ast_util_js_1.getNodeAtPosition)(sourceFile, position);
        const node = (0, ast_util_js_1.findParent)(token, ts_module_js_1.tsModule.ts.isTaggedTemplateExpression);
        if (node != null && ts_module_js_1.tsModule.ts.isTaggedTemplateExpression(node)) {
            if (templateTags.includes(node.tag.getText())) {
                return node;
            }
        }
        return undefined;
    }
    else {
        const taggedTemplates = [];
        visitTaggedTemplateNodes(sourceFile, {
            shouldCheckTemplateTag(templateTag) {
                return templateTags.includes(templateTag);
            },
            emitTaggedTemplateNode(node) {
                taggedTemplates.push(node);
            }
        });
        return taggedTemplates;
    }
}
function visitTaggedTemplateNodes(astNode, context) {
    const newContext = { ...context };
    if (ts_module_js_1.tsModule.ts.isTaggedTemplateExpression(astNode) && context.shouldCheckTemplateTag(astNode.tag.getText())) {
        // Only visit the template expression if the leading comments does not include the ts-ignore flag.
        //if (!leadingCommentsIncludes(astNode.getSourceFile().getText(), astNode.getFullStart(), TS_IGNORE_FLAG)) {
        newContext.parent = astNode;
        context.emitTaggedTemplateNode(astNode);
    }
    astNode.forEachChild(child => visitTaggedTemplateNodes(child, context));
}
//# sourceMappingURL=find-tagged-templates.js.map