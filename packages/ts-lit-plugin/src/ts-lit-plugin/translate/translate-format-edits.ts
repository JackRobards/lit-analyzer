import type { LitFormatEdit } from "lit-analyzer-fork";
import type * as ts from "typescript";
import { translateRange } from "./translate-range.js";

export function translateFormatEdits(formatEdits: LitFormatEdit[]): ts.TextChange[] {
	return formatEdits.map(formatEdit => translateFormatEdit(formatEdit));
}

function translateFormatEdit(formatEdit: LitFormatEdit): ts.TextChange {
	return {
		newText: formatEdit.newText,
		span: translateRange(formatEdit.range)
	};
}
