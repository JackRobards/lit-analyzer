import type { SourceFile } from "typescript";
import type { LitDiagnostic } from "../../analyze/types/lit-diagnostic.js";
import type { AnalysisStats, DiagnosticFormatter } from "./diagnostic-formatter.mjs";
import { markdownHeader, markdownHighlight, markdownTable } from "./markdown-util.mjs";
import { relativeFileName } from "./util.mjs";

export class MarkdownDiagnosticFormatter implements DiagnosticFormatter {
	report(stats: AnalysisStats): string | undefined {
		return `
${markdownHeader(2, "Summary")}
${markdownTable([
	["Files analyzed", "Files with problems", "Problems", "Errors", "Warnings"],
	[stats.totalFiles, stats.filesWithProblems, stats.diagnostics, stats.errors, stats.warnings].map(v => v.toString())
])}`;
	}

	diagnosticTextForFile(file: SourceFile, diagnostics: LitDiagnostic[]): string | undefined {
		if (diagnostics.length === 0) return undefined;

		return `
${markdownHeader(2, `${relativeFileName(file.fileName)}`)}
${markdownDiagnosticTable(file, diagnostics)}`;
	}
}

function markdownDiagnosticTable(file: SourceFile, diagnostics: LitDiagnostic[]): string {
	const headerRow: string[] = ["Line", "Column", "Type", "Rule", "Message"];

	const rows: string[][] = diagnostics.map((diagnostic): string[] => {
		const lineContext = file.getLineAndCharacterOfPosition(diagnostic.location.start);

		return [
			(lineContext.line + 1).toString(),
			(lineContext.character + 1).toString(),
			diagnostic.severity === "error" ? markdownHighlight("error") : "warning",
			diagnostic.source || "",
			diagnostic.message
		];
	});

	return markdownTable([headerRow, ...rows], { removeEmptyColumns: true });
}
