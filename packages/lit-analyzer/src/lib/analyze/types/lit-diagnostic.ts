import type { SourceFile } from "typescript";
import type { LitAnalyzerRuleId } from "../lit-analyzer-config.js";
import type { SourceFileRange } from "./range.js";

export type LitDiagnosticSeverity = "error" | "warning";

export interface LitDiagnostic {
	location: SourceFileRange;
	code?: number;
	message: string;
	fixMessage?: string;
	suggestion?: string;
	source: LitAnalyzerRuleId;
	severity: LitDiagnosticSeverity;
	file: SourceFile;
}
