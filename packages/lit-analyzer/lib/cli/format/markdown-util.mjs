/**
 * Highlights some text
 * @param text
 */
export function markdownHighlight(text) {
    return `\`${text}\``;
}
/**
 * Returns a markdown header with a specific level
 * @param level
 * @param title
 */
export function markdownHeader(level, title) {
    return `${"#".repeat(level)} ${title}`;
}
const DEFAULT_MARKDOWN_TABLE_OPTIONS = {
    removeEmptyColumns: true,
    minCellWidth: 3,
    maxCellWidth: 50,
    cellPadding: 1
};
/**
 * Returns a markdown table representation of the rows.
 * Strips unused columns.
 * @param rows
 * @param options
 */
export function markdownTable(rows, options = {}) {
    // Constants for pretty printing the markdown tables
    const MIN_CELL_WIDTH = options.minCellWidth || DEFAULT_MARKDOWN_TABLE_OPTIONS.minCellWidth;
    const MAX_CELL_WIDTH = options.maxCellWidth || DEFAULT_MARKDOWN_TABLE_OPTIONS.maxCellWidth;
    const CELL_PADDING = options.cellPadding || DEFAULT_MARKDOWN_TABLE_OPTIONS.cellPadding;
    // Count the number of columns
    let columnCount = Math.max(...rows.map(r => r.length));
    if (options.removeEmptyColumns) {
        // Create a boolean array where each entry tells if a column is used or not (excluding the header)
        const emptyColumns = Array(columnCount)
            .fill(false)
            .map((b, i) => i !== 0 && rows.slice(1).find(r => r[i] != null && r[i].length > 0) == null);
        // Remove unused columns if necessary
        if (emptyColumns.includes(true)) {
            // Filter out the unused columns in each row
            rows = rows.map(row => row.filter((column, i) => !emptyColumns[i]));
            // Adjust the column count
            columnCount = Math.max(...rows.map(r => r.length));
        }
    }
    // Escape all cells in the markdown output
    rows = rows.map(r => r.map(markdownEscapeTableCell));
    // Create a boolean array where each entry corresponds to the preferred column width.
    // This is done by taking the largest width of all cells in each column.
    const columnWidths = Array(columnCount)
        .fill(0)
        .map((c, i) => Math.min(MAX_CELL_WIDTH, Math.max(MIN_CELL_WIDTH, ...rows.map(r => (r[i] || "").length)) + CELL_PADDING * 2));
    // Build up the table
    return `
|${rows[0].map((r, i) => fillWidth(r, columnWidths[i], CELL_PADDING)).join("|")}|
|${columnWidths.map(c => "-".repeat(c)).join("|")}|
${rows
        .slice(1)
        .map(r => `|${r.map((r, i) => fillWidth(r, columnWidths[i], CELL_PADDING)).join("|")}|`)
        .join("\n")}
`;
}
/**
 * Escape a text so it can be used in a markdown table
 * @param text
 */
function markdownEscapeTableCell(text) {
    return (text
        // Change newlines
        .replace(/\n/g, "<br />")
        // Change "@property" to "`@property`" (so eg. Github doesn't treat it as tagging a user)
        .replace(/(@\S+)/g, "`$1`")
        // Escape |, < and >
        .replace(/([|<>])/g, "\\$1"));
}
/**
 * Creates padding around some text with a target width.
 * @param text
 * @param width
 * @param paddingStart
 */
function fillWidth(text, width, paddingStart) {
    return " ".repeat(paddingStart) + text + " ".repeat(Math.max(1, width - text.length - paddingStart));
}
//# sourceMappingURL=markdown-util.mjs.map