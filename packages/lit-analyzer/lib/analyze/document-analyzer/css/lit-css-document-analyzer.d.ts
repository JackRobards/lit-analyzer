import type { LitAnalyzerContext } from "../../lit-analyzer-context.js";
import type { CssDocument } from "../../parse/document/text-document/css-document/css-document.js";
import type { LitCompletion } from "../../types/lit-completion.js";
import type { LitCompletionDetails } from "../../types/lit-completion-details.js";
import type { LitDefinition } from "../../types/lit-definition.js";
import type { LitDiagnostic } from "../../types/lit-diagnostic.js";
import type { LitQuickInfo } from "../../types/lit-quick-info.js";
import type { DocumentOffset } from "../../types/range.js";
export declare class LitCssDocumentAnalyzer {
    private vscodeCssService;
    private completionsCache;
    getCompletionDetailsAtOffset(document: CssDocument, offset: DocumentOffset, name: string, context: LitAnalyzerContext): LitCompletionDetails | undefined;
    getCompletionsAtOffset(document: CssDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitCompletion[];
    getQuickInfoAtOffset(document: CssDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitQuickInfo | undefined;
    getDiagnostics(document: CssDocument, context: LitAnalyzerContext): LitDiagnostic[];
    getDefinitionAtOffset(document: CssDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitDefinition | undefined;
}
//# sourceMappingURL=lit-css-document-analyzer.d.ts.map