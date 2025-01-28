"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleCollection = void 0;
const lit_analyzer_config_js_1 = require("./lit-analyzer-config.js");
const html_node_types_js_1 = require("./types/html-node/html-node-types.js");
class RuleCollection {
    rules = [];
    push(...rule) {
        this.rules.push(...rule);
        // Sort rules by most important first
        this.rules.sort((ruleA, ruleB) => (getPriorityValue(ruleA) > getPriorityValue(ruleB) ? -1 : 1));
    }
    invokeRules(functionName, parameter, report, baseContext) {
        let shouldBreak = false;
        const { config, htmlStore, program, definitionStore, dependencyStore, documentStore, logger, ts } = baseContext;
        let currentRuleId = undefined;
        const context = {
            config,
            htmlStore,
            program,
            definitionStore,
            dependencyStore,
            documentStore,
            logger,
            ts,
            file: baseContext.currentFile,
            report(diagnostic) {
                if (currentRuleId != null) {
                    report({ diagnostic, source: currentRuleId });
                }
                shouldBreak = true;
            },
            break() {
                shouldBreak = true;
            }
        };
        for (const rule of this.rules) {
            if ((0, lit_analyzer_config_js_1.isRuleEnabled)(context.config, rule.id)) {
                const func = rule[functionName];
                if (func != null) {
                    currentRuleId = rule.id;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    func(parameter, context);
                }
            }
            if (shouldBreak) {
                break;
            }
        }
    }
    getDiagnosticsFromDeclaration(declaration, baseContext) {
        const file = baseContext.currentFile;
        const diagnostics = [];
        this.invokeRules("visitComponentDeclaration", declaration, d => diagnostics.push(d), baseContext);
        for (const member of declaration.members) {
            if (member.node.getSourceFile() === file) {
                this.invokeRules("visitComponentMember", member, d => diagnostics.push(d), baseContext);
            }
        }
        return diagnostics;
    }
    getDiagnosticsFromDefinition(definition, baseContext) {
        const file = baseContext.currentFile;
        const diagnostics = [];
        if (definition.sourceFile === file) {
            this.invokeRules("visitComponentDefinition", definition, d => diagnostics.push(d), baseContext);
        }
        return diagnostics;
    }
    getDiagnosticsFromDocument(htmlDocument, baseContext) {
        const diagnostics = [];
        const iterateNodes = (nodes) => {
            for (const childNode of nodes) {
                // Don't check SVG yet. We don't yet have all the data for it, and it hasn't been tested fully.
                if (childNode.kind === html_node_types_js_1.HtmlNodeKind.SVG) {
                    continue;
                }
                this.invokeRules("visitHtmlNode", childNode, d => diagnostics.push(d), baseContext);
                const iterateAttrs = (attrs) => {
                    for (const attr of attrs) {
                        this.invokeRules("visitHtmlAttribute", attr, d => diagnostics.push(d), baseContext);
                        if (attr.assignment != null) {
                            this.invokeRules("visitHtmlAssignment", attr.assignment, d => diagnostics.push(d), baseContext);
                        }
                    }
                };
                iterateAttrs(childNode.attributes);
                iterateNodes(childNode.children);
            }
        };
        iterateNodes(htmlDocument.rootNodes);
        return diagnostics;
    }
}
exports.RuleCollection = RuleCollection;
function getPriorityValue(rule) {
    if (rule.meta?.priority != null) {
        switch (rule.meta?.priority) {
            case "low":
                return 0;
            case "medium":
                return 1;
            case "high":
                return 2;
        }
    }
    return 0;
}
//# sourceMappingURL=rule-collection.js.map