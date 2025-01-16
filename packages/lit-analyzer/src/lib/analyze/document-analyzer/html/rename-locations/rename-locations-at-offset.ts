import type { LitAnalyzerContext } from "../../../lit-analyzer-context.js";
import type { HtmlDocument } from "../../../parse/document/text-document/html-document/html-document.js";
import { isHTMLNode } from "../../../types/html-node/html-node-types.js";
import type { LitRenameLocation } from "../../../types/lit-rename-location.js";
import type { DocumentOffset } from "../../../types/range.js";
import { renameLocationsForTagName } from "./rename-locations-for-tag-name.js";

export function renameLocationsAtOffset(document: HtmlDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitRenameLocation[] {
	const hit = document.htmlNodeOrAttrAtOffset(offset);
	if (hit == null) return [];

	if (isHTMLNode(hit)) {
		return renameLocationsForTagName(hit.tagName, context);
	}

	return [];
}
