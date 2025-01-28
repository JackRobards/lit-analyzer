import type { ComponentDeclaration, ComponentDefinition } from "@jackolope/web-component-analyzer";
import type { LitAnalyzerContext } from "../lit-analyzer-context.js";
import type { LitCodeFix } from "../types/lit-code-fix.js";
import type { LitDiagnostic } from "../types/lit-diagnostic.js";
import type { SourceFileRange } from "../types/range.js";
export declare class ComponentAnalyzer {
    getDiagnostics(definitionOrDeclaration: ComponentDefinition | ComponentDeclaration, context: LitAnalyzerContext): LitDiagnostic[];
    getCodeFixesAtOffsetRange(definitionOrDeclaration: ComponentDefinition | ComponentDeclaration, range: SourceFileRange, context: LitAnalyzerContext): LitCodeFix[];
    private getRuleDiagnostics;
}
//# sourceMappingURL=component-analyzer.d.ts.map