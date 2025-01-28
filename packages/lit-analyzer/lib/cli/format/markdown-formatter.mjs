import { markdownHeader, markdownHighlight, markdownTable } from "./markdown-util.mjs";
import { relativeFileName } from "./util.mjs";
export class MarkdownDiagnosticFormatter {
    report(stats) {
        return `
${markdownHeader(2, "Summary")}
${markdownTable([
            ["Files analyzed", "Files with problems", "Problems", "Errors", "Warnings"],
            [stats.totalFiles, stats.filesWithProblems, stats.diagnostics, stats.errors, stats.warnings].map(v => v.toString())
        ])}`;
    }
    diagnosticTextForFile(file, diagnostics) {
        if (diagnostics.length === 0)
            return undefined;
        return `
${markdownHeader(2, `${relativeFileName(file.fileName)}`)}
${markdownDiagnosticTable(file, diagnostics)}`;
    }
}
function markdownDiagnosticTable(file, diagnostics) {
    const headerRow = ["Line", "Column", "Type", "Rule", "Message"];
    const rows = diagnostics.map((diagnostic) => {
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
//# sourceMappingURL=markdown-formatter.mjs.map