import type { Expression } from "typescript";
import type { Range } from "../../../../../types/range.js";
import type { HtmlDocument } from "../html-document.js";

export interface ParseHtmlContext {
	html: string;
	document: HtmlDocument;
	getPartsAtOffsetRange(range: Range): (string | Expression)[];
}
