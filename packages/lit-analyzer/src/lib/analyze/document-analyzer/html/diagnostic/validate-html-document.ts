import type { LitAnalyzerContext } from "../../../lit-analyzer-context.js";
import type { HtmlDocument } from "../../../parse/document/text-document/html-document/html-document.js";
import type { LitDiagnostic } from "../../../types/lit-diagnostic.js";
import { convertRuleDiagnosticToLitDiagnostic } from "../../../util/rule-diagnostic-util.js";

export function validateHTMLDocument(htmlDocument: HtmlDocument, context: LitAnalyzerContext): LitDiagnostic[] {
	return context.rules.getDiagnosticsFromDocument(htmlDocument, context).map(d => convertRuleDiagnosticToLitDiagnostic(d, context));
}
