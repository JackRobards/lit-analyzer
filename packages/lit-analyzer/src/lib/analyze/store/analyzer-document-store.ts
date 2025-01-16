import type { SourceFile } from "typescript";
import type { LitAnalyzerConfig } from "../lit-analyzer-config.js";
import type { TextDocument } from "../parse/document/text-document/text-document.js";
import type { SourceFilePosition } from "../types/range.js";

export interface AnalyzerDocumentStore {
	getDocumentAtPosition(sourceFile: SourceFile, position: SourceFilePosition, options: LitAnalyzerConfig): TextDocument | undefined;
	getDocumentsInFile(sourceFile: SourceFile, config: LitAnalyzerConfig): TextDocument[];
}
