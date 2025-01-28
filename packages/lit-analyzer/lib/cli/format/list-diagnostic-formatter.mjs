import chalk from "chalk";
import { generalReport, relativeFileName, textPad } from "./util.mjs";
export class ListDiagnosticFormatter {
    report(stats) {
        return generalReport(stats);
    }
    diagnosticTextForFile(file, diagnostics) {
        if (diagnostics.length === 0)
            return undefined;
        return diagnosticTextForFile(file, diagnostics);
    }
}
function diagnosticTextForFile(file, diagnostics) {
    const diagnosticText = diagnostics.map(diagnostic => litDiagnosticToErrorText(file, diagnostic)).join("\n");
    return `
${chalk.underline(`${relativeFileName(file.fileName)}`)}
${diagnosticText}`;
}
function litDiagnosticToErrorText(file, diagnostic) {
    const lineContext = file.getLineAndCharacterOfPosition(diagnostic.location.start);
    const linePart = `${textPad(`${lineContext.line + 1}`, { width: 5 })}:${textPad(`${lineContext.character}`, {
        width: 4,
        dir: "right"
    })}`;
    const severityPart = `${textPad(diagnostic.severity === "warning" ? chalk.yellow("warning") : chalk.red("error"), {
        width: 18,
        dir: "right"
    })}`;
    const messagePart = diagnostic.message;
    return `${linePart} ${severityPart} ${messagePart}`;
}
//# sourceMappingURL=list-diagnostic-formatter.mjs.map