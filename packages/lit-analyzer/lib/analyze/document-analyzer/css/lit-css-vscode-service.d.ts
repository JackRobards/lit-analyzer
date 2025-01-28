import type { LitAnalyzerContext } from "../../lit-analyzer-context.js";
import type { CssDocument } from "../../parse/document/text-document/css-document/css-document.js";
import type { LitCompletion } from "../../types/lit-completion.js";
import type { LitDiagnostic } from "../../types/lit-diagnostic.js";
import type { LitQuickInfo } from "../../types/lit-quick-info.js";
import type { DocumentOffset } from "../../types/range.js";
export declare class LitCssVscodeService {
    private dataProvider;
    private get cssService();
    private get scssService();
    getDiagnostics(document: CssDocument, context: LitAnalyzerContext): LitDiagnostic[];
    getQuickInfo(document: CssDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitQuickInfo | undefined;
    getCompletions(document: CssDocument, offset: DocumentOffset, context: LitAnalyzerContext): LitCompletion[];
    private makeVscStylesheet;
}
//# sourceMappingURL=lit-css-vscode-service.d.ts.map