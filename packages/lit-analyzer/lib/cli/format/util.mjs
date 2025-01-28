import chalk from "chalk";
export function generalReport(stats) {
    function numberStatText(n, text) {
        return `${n} ${text}${n === 1 ? "" : "s"}`;
    }
    if (stats.diagnostics > 0) {
        const message = `  ✖ ${numberStatText(stats.diagnostics, "problem")} in ${numberStatText(stats.filesWithProblems, "file")} (${numberStatText(stats.errors, "error")}, ${numberStatText(stats.warnings, "warning")})`;
        if (stats.errors > 0) {
            return `\n${chalk.red(message)}`;
        }
        else {
            return `\n${chalk.yellow(message)}`;
        }
    }
    else {
        return `\n${chalk.green(`  ✓ Found 0 problems in ${numberStatText(stats.totalFiles, "file")}`)}`;
    }
}
export function relativeFileName(fileName) {
    return fileName.replace(process.cwd(), ".");
}
export function markText(text, range, colorFunction = chalk.bgRedBright) {
    return (text.substring(0, range.start) + chalk.bold(colorFunction(text.substr(range.start, range.length))) + text.substring(range.start + range.length));
}
export function textPad(str, { width, fill, dir }) {
    const padding = (fill || " ").repeat(Math.max(0, width - str.length));
    return `${dir !== "right" ? padding : ""}${str}${dir === "right" ? padding : ""}`;
}
//# sourceMappingURL=util.mjs.map