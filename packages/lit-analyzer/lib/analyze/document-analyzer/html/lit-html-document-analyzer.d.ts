import type { FormatCodeSettings } from "typescript";
import type { LitAnalyzerContext } from "../../lit-analyzer-context.js";
import type { HtmlDocument } from "../../parse/document/text-document/html-document/html-document.js";
import type { HtmlNodeAttr } from "../../types/html-node/html-node-attr-types.js";
import type { HtmlNode } from "../../types/html-node/html-node-types.js";
import type { LitClosingTagInfo } from "../../types/lit-closing-tag-info.js";
import type { LitCodeFix } from "../../types/lit-code-fix.js";
import type { LitCompletion } from "../../types/lit-completion.js";
import type { LitCompletionDetails } from "../../types/lit-completion-details.js";
import type { LitDefinition } from "../../types/lit-definition.js";
import type { LitDiagnostic } from "../../types/lit-diagnostic.js";
import type { LitFormatEdit } from "../../types/lit-format-edit.js";
import type { LitOutliningSpan } from "../../types/lit-outlining-span.js";
import type { LitQuickInfo } from "../../types/lit-quick-info.js";
import type { LitRenameInfo } from "../../types/lit-rename-info.js";
import type { LitRenameLocation } from "../../types/lit-rename-location.js";
import type { DocumentOffset, DocumentRange } from "../../types/range.js";
export declare class LitHtmlDocumentAnalyzer {
    private vscodeHtmlService;
    private completionsCache;
    getCompletionDetailsAtOffset(document: HtmlDocument, offset: DocumentOffset, name: string, context: LitAnalyzerContext): LitCompletionDetails | undefined;
    getCompletionsAtOffset(document: HtmlDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitCompletion[];
    getDiagnostics(document: HtmlDocument, context: LitAnalyzerContext): LitDiagnostic[];
    getClosingTagAtOffset(document: HtmlDocument, offset: DocumentOffset): LitClosingTagInfo | undefined;
    getCodeFixesAtOffsetRange(document: HtmlDocument, offsetRange: DocumentRange, context: LitAnalyzerContext): LitCodeFix[];
    getDefinitionAtOffset(document: HtmlDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitDefinition | undefined;
    getRenameInfoAtOffset(document: HtmlDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitRenameInfo | undefined;
    getRenameLocationsAtOffset(document: HtmlDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitRenameLocation[];
    getQuickInfoAtOffset(document: HtmlDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitQuickInfo | undefined;
    getOutliningSpans(document: HtmlDocument): LitOutliningSpan[];
    getFormatEdits(document: HtmlDocument, settings: FormatCodeSettings): LitFormatEdit[];
    indexFile(document: HtmlDocument, context: LitAnalyzerContext): IterableIterator<LitIndexEntry>;
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
export {};
//# sourceMappingURL=lit-html-document-analyzer.d.ts.map