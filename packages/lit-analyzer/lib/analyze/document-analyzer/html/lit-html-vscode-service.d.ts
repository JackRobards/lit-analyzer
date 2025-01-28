import type * as ts from "typescript";
import type { HtmlDocument } from "../../parse/document/text-document/html-document/html-document.js";
import type { LitClosingTagInfo } from "../../types/lit-closing-tag-info.js";
import type { LitFormatEdit } from "../../types/lit-format-edit.js";
import type { DocumentOffset } from "../../types/range.js";
export declare class LitHtmlVscodeService {
    getClosingTagAtOffset(document: HtmlDocument, offset: DocumentOffset): LitClosingTagInfo | undefined;
    format(document: HtmlDocument, settings: ts.FormatCodeSettings): LitFormatEdit[];
}
//# sourceMappingURL=lit-html-vscode-service.d.ts.map