import type { SourceFile } from "typescript";
import type { SourceFilePosition } from "../../types/range.js";
import type { TextDocument } from "./text-document/text-document.js";
export interface ParseDocumentOptions {
    cssTags: string[];
    htmlTags: string[];
}
export declare function parseDocumentsInSourceFile(sourceFile: SourceFile, options: ParseDocumentOptions): TextDocument[];
export declare function parseDocumentsInSourceFile(sourceFile: SourceFile, options: ParseDocumentOptions, position: SourceFilePosition): TextDocument | undefined;
//# sourceMappingURL=parse-documents-in-source-file.d.ts.map