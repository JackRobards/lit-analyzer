import type { SourceFileRange } from "./range.js";

export interface LitCodeFixAction {
	range: SourceFileRange;
	newText: string;
}
