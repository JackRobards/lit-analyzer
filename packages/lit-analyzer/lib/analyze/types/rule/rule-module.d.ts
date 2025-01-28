import type { ComponentDeclaration, ComponentDefinition, ComponentMember } from "@jackolope/web-component-analyzer";
import type { LitAnalyzerRuleId } from "../../lit-analyzer-config.js";
import type { HtmlNodeAttrAssignment } from "../html-node/html-node-attr-assignment-types.js";
import type { HtmlNodeAttr } from "../html-node/html-node-attr-types.js";
import type { HtmlNode } from "../html-node/html-node-types.js";
import type { RuleModuleContext } from "./rule-module-context.js";
export type RuleModulePriority = "low" | "medium" | "high";
export interface RuleModuleImplementation {
    visitHtmlNode?(node: HtmlNode, context: RuleModuleContext): void;
    visitHtmlAttribute?(attribute: HtmlNodeAttr, context: RuleModuleContext): void;
    visitHtmlAssignment?(assignment: HtmlNodeAttrAssignment, context: RuleModuleContext): void;
    visitComponentDefinition?(definition: ComponentDefinition, context: RuleModuleContext): void;
    visitComponentDeclaration?(declaration: ComponentDeclaration, context: RuleModuleContext): void;
    visitComponentMember?(declaration: ComponentMember, context: RuleModuleContext): void;
}
export interface RuleModule extends RuleModuleImplementation {
    id: LitAnalyzerRuleId;
    meta?: {
        priority?: RuleModulePriority;
    };
}
//# sourceMappingURL=rule-module.d.ts.map