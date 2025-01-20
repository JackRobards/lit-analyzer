import type { Range } from "@jackolope/lit-analyzer";
import type { TextSpan } from "typescript";

export function translateRange(range: Range): TextSpan {
	return {
		start: range.start,
		length: range.end - range.start
	};
}
