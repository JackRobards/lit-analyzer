import type { SourceFile } from "typescript";
import type { LitDiagnostic } from "../../analyze/types/lit-diagnostic.js";
import type { AnalysisStats, DiagnosticFormatter } from "./diagnostic-formatter.mjs";
export declare class CodeDiagnosticFormatter implements DiagnosticFormatter {
    report(stats: AnalysisStats): string | undefined;
    diagnosticTextForFile(file: SourceFile, diagnostics: LitDiagnostic[]): string | undefined;
}
//# sourceMappingURL=code-diagnostic-formatter.d.mts.map