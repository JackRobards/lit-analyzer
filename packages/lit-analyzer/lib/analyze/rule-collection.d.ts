import type { ComponentDeclaration, ComponentDefinition } from "@jackolope/web-component-analyzer";
import type { LitAnalyzerRuleId } from "./lit-analyzer-config.js";
import type { LitAnalyzerContext } from "./lit-analyzer-context.js";
import type { HtmlDocument } from "./parse/document/text-document/html-document/html-document.js";
import type { RuleDiagnostic } from "./types/rule/rule-diagnostic.js";
import type { RuleModule } from "./types/rule/rule-module.js";
export interface ReportedRuleDiagnostic {
    source: LitAnalyzerRuleId;
    diagnostic: RuleDiagnostic;
}
export declare class RuleCollection {
    private rules;
    push(...rule: RuleModule[]): void;
    private invokeRules;
    getDiagnosticsFromDeclaration(declaration: ComponentDeclaration, baseContext: LitAnalyzerContext): ReportedRuleDiagnostic[];
    getDiagnosticsFromDefinition(definition: ComponentDefinition, baseContext: LitAnalyzerContext): ReportedRuleDiagnostic[];
    getDiagnosticsFromDocument(htmlDocument: HtmlDocument, baseContext: LitAnalyzerContext): ReportedRuleDiagnostic[];
}
//# sourceMappingURL=rule-collection.d.ts.map