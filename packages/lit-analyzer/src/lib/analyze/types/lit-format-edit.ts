import type { SourceFileRange } from "./range.js";

export interface LitFormatEdit {
	range: SourceFileRange;
	newText: string;
}
