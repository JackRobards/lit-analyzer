import { litDiagnosticRuleSeverity, ruleIdCode } from "../lit-analyzer-config.js";
import type { LitAnalyzerContext } from "../lit-analyzer-context.js";
import type { ReportedRuleDiagnostic } from "../rule-collection.js";
import type { LitDiagnostic } from "../types/lit-diagnostic.js";

export function convertRuleDiagnosticToLitDiagnostic(reported: ReportedRuleDiagnostic, context: LitAnalyzerContext): LitDiagnostic {
	const source = reported.source;
	const { message, location, fixMessage, suggestion } = reported.diagnostic;

	return {
		fixMessage,
		location,
		suggestion,
		message,
		source,
		file: context.currentFile,
		severity: litDiagnosticRuleSeverity(context.config, source),
		code: ruleIdCode(source)
	};
}
