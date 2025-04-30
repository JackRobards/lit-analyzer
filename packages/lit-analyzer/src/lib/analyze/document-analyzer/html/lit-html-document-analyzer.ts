import type { FormatCodeSettings } from "typescript";
import type { LitAnalyzerContext } from "../../lit-analyzer-context.js";
import type { HtmlDocument } from "../../parse/document/text-document/html-document/html-document.js";
import type { HtmlNodeAttr } from "../../types/html-node/html-node-attr-types.js";
import { isHTMLAttr } from "../../types/html-node/html-node-attr-types.js";
import type { HtmlNode } from "../../types/html-node/html-node-types.js";
import { isHTMLNode } from "../../types/html-node/html-node-types.js";
import type { LitClosingTagInfo } from "../../types/lit-closing-tag-info.js";
import type { LitCodeFix } from "../../types/lit-code-fix.js";
import type { LitCompletion } from "../../types/lit-completion.js";
import type { LitCompletionDetails } from "../../types/lit-completion-details.js";
import type { LitDefinition } from "../../types/lit-definition.js";
import type { LitDiagnostic } from "../../types/lit-diagnostic.js";
import type { LitFormatEdit } from "../../types/lit-format-edit.js";
import type { LitQuickInfo } from "../../types/lit-quick-info.js";
import type { LitRenameInfo } from "../../types/lit-rename-info.js";
import type { LitRenameLocation } from "../../types/lit-rename-location.js";
import type { DocumentOffset, DocumentRange } from "../../types/range.js";
import { documentRangeToSFRange } from "../../util/range-util.js";
import { codeFixesForHtmlDocument } from "./code-fix/code-fixes-for-html-document.js";
import { completionsAtOffset } from "./completion/completions-at-offset.js";
import { definitionForHtmlAttr } from "./definition/definition-for-html-attr.js";
import { definitionForHtmlNode } from "./definition/definition-for-html-node.js";
import { validateHTMLDocument } from "./diagnostic/validate-html-document.js";
import { LitHtmlVscodeService } from "./lit-html-vscode-service.js";
import { quickInfoForHtmlAttr } from "./quick-info/quick-info-for-html-attr.js";
import { quickInfoForHtmlNode } from "./quick-info/quick-info-for-html-node.js";
import { renameLocationsAtOffset } from "./rename-locations/rename-locations-at-offset.js";

export class LitHtmlDocumentAnalyzer {
	private vscodeHtmlService = new LitHtmlVscodeService();
	private completionsCache: LitCompletion[] = [];

	getCompletionDetailsAtOffset(
		document: HtmlDocument,
		offset: DocumentOffset,
		name: string,
		context: LitAnalyzerContext
	): LitCompletionDetails | undefined {
		const completionWithName = this.completionsCache.find(completion => completion.name === name);

		if (completionWithName == null || completionWithName.documentation == null) return undefined;

		const primaryInfo = completionWithName.documentation();
		if (primaryInfo == null) return undefined;

		return {
			name,
			kind: completionWithName.kind,
			primaryInfo
		};
	}

	getCompletionsAtOffset(document: HtmlDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitCompletion[] {
		this.completionsCache = completionsAtOffset(document, offset, context);
		return completionsAtOffset(document, offset, context);
	}

	getDiagnostics(document: HtmlDocument, context: LitAnalyzerContext): LitDiagnostic[] {
		return validateHTMLDocument(document, context);
	}

	getClosingTagAtOffset(document: HtmlDocument, offset: DocumentOffset): LitClosingTagInfo | undefined {
		return this.vscodeHtmlService.getClosingTagAtOffset(document, offset);
	}

	getCodeFixesAtOffsetRange(document: HtmlDocument, offsetRange: DocumentRange, context: LitAnalyzerContext): LitCodeFix[] {
		const hit = document.htmlNodeOrAttrAtOffset(offsetRange);
		if (hit == null) return [];

		return codeFixesForHtmlDocument(document, offsetRange, context);
	}

	getDefinitionAtOffset(document: HtmlDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitDefinition | undefined {
		const hit = document.htmlNodeOrAttrAtOffset(offset);
		if (hit == null) return undefined;

		if (isHTMLNode(hit)) {
			return definitionForHtmlNode(hit, context);
		} else if (isHTMLAttr(hit)) {
			return definitionForHtmlAttr(hit, context);
		}
		return;
	}

	getRenameInfoAtOffset(document: HtmlDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitRenameInfo | undefined {
		const hit = document.htmlNodeOrAttrAtOffset(offset);
		if (hit == null) return undefined;

		if (isHTMLNode(hit)) {
			return {
				kind: "memberVariableElement",
				fullDisplayName: hit.tagName,
				displayName: hit.tagName,
				range: documentRangeToSFRange(document, { ...hit.location.name }),
				document,
				target: hit
			};
		}
		return;
	}

	getRenameLocationsAtOffset(document: HtmlDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitRenameLocation[] {
		return renameLocationsAtOffset(document, offset, context);
	}

	getQuickInfoAtOffset(document: HtmlDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitQuickInfo | undefined {
		const hit = document.htmlNodeOrAttrAtOffset(offset);
		if (hit == null) return undefined;

		if (isHTMLNode(hit)) {
			return quickInfoForHtmlNode(hit, context);
		}

		if (isHTMLAttr(hit)) {
			return quickInfoForHtmlAttr(hit, context);
		}
		return;
	}

	getFormatEdits(document: HtmlDocument, settings: FormatCodeSettings): LitFormatEdit[] {
		return this.vscodeHtmlService.format(document, settings);
	}

	*indexFile(document: HtmlDocument, context: LitAnalyzerContext): IterableIterator<LitIndexEntry> {
		for (const node of document.nodes()) {
			const definition = definitionForHtmlNode(node, context);
			if (definition != null) {
				yield { kind: "NODE-REFERENCE", node, document, definition };
			}
			for (const attribute of node.attributes) {
				const definition = definitionForHtmlAttr(attribute, context);
				if (definition != null) {
					yield { kind: "ATTRIBUTE-REFERENCE", attribute, document, definition };
				}
			}
		}
	}
}

export type LitIndexEntry = HtmlNodeIndexEntry | HtmlNodeAttrIndexEntry;
interface HtmlNodeIndexEntry {
	kind: "NODE-REFERENCE";
	node: HtmlNode;
	document: HtmlDocument;
	definition: LitDefinition;
}
interface HtmlNodeAttrIndexEntry {
	kind: "ATTRIBUTE-REFERENCE";
	attribute: HtmlNodeAttr;
	document: HtmlDocument;
	definition: LitDefinition;
}
