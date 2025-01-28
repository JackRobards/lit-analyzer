import type { SourceFile } from "typescript";
import type { LitDiagnostic } from "../../analyze/types/lit-diagnostic.js";
import type { LitAnalyzerCliConfig } from "../lit-analyzer-cli-config.mjs";
export interface AnalysisStats {
    diagnostics: number;
    errors: number;
    warnings: number;
    filesWithProblems: number;
    totalFiles: number;
}
export interface DiagnosticFormatter {
    report(stats: AnalysisStats, config: LitAnalyzerCliConfig): string | undefined;
    diagnosticTextForFile(file: SourceFile, diagnostics: LitDiagnostic[], config: LitAnalyzerCliConfig): string | undefined;
}
//# sourceMappingURL=diagnostic-formatter.d.mts.map