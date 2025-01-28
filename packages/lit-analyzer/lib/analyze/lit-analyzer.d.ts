import type { FormatCodeSettings, SourceFile } from "typescript";
import type { LitIndexEntry } from "./document-analyzer/html/lit-html-document-analyzer.js";
import type { LitAnalyzerContext } from "./lit-analyzer-context.js";
import type { LitClosingTagInfo } from "./types/lit-closing-tag-info.js";
import type { LitCodeFix } from "./types/lit-code-fix.js";
import type { LitCompletion } from "./types/lit-completion.js";
import type { LitCompletionDetails } from "./types/lit-completion-details.js";
import type { LitDefinition } from "./types/lit-definition.js";
import type { LitDiagnostic } from "./types/lit-diagnostic.js";
import type { LitFormatEdit } from "./types/lit-format-edit.js";
import type { LitOutliningSpan } from "./types/lit-outlining-span.js";
import type { LitQuickInfo } from "./types/lit-quick-info.js";
import type { LitRenameInfo } from "./types/lit-rename-info.js";
import type { LitRenameLocation } from "./types/lit-rename-location.js";
import type { Range, SourceFilePosition } from "./types/range.js";
export declare class LitAnalyzer {
    private context;
    private litHtmlDocumentAnalyzer;
    private litCssDocumentAnalyzer;
    private componentAnalyzer;
    constructor(context: LitAnalyzerContext);
    getOutliningSpansInFile(file: SourceFile): LitOutliningSpan[];
    getDefinitionAtPosition(file: SourceFile, position: SourceFilePosition): LitDefinition | undefined;
    /**
     * Yields entries that describe regions of code in the given file, and
     * what the analyzer knows about them.
     *
     * This is useful for generating a static index of analysis output. Two such
     * indexing systems are Kythe and the Language Server Index Format.
     */
    indexFile(file: SourceFile): IterableIterator<LitIndexEntry>;
    getQuickInfoAtPosition(file: SourceFile, position: SourceFilePosition): LitQuickInfo | undefined;
    getRenameInfoAtPosition(file: SourceFile, position: SourceFilePosition): LitRenameInfo | undefined;
    getRenameLocationsAtPosition(file: SourceFile, position: SourceFilePosition): LitRenameLocation[];
    getClosingTagAtPosition(file: SourceFile, position: SourceFilePosition): LitClosingTagInfo | undefined;
    getCompletionDetailsAtPosition(file: SourceFile, position: SourceFilePosition, name: string): LitCompletionDetails | undefined;
    getCompletionsAtPosition(file: SourceFile, position: SourceFilePosition): LitCompletion[] | undefined;
    getDiagnosticsInFile(file: SourceFile): LitDiagnostic[];
    getCodeFixesAtPositionRange(file: SourceFile, sourceFileRange: Range): LitCodeFix[];
    getFormatEditsInFile(file: SourceFile, settings: FormatCodeSettings): LitFormatEdit[];
    private getDocumentAndOffsetAtPosition;
    private getDocumentsInFile;
}
//# sourceMappingURL=lit-analyzer.d.ts.map