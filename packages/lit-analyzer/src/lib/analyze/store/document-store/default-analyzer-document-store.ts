import type { SourceFile } from "typescript";
import type { LitAnalyzerConfig } from "../../lit-analyzer-config.js";
import { parseDocumentsInSourceFile } from "../../parse/document/parse-documents-in-source-file.js";
import type { TextDocument } from "../../parse/document/text-document/text-document.js";
import type { SourceFilePosition } from "../../types/range.js";
import type { AnalyzerDocumentStore } from "../analyzer-document-store.js";

export class DefaultAnalyzerDocumentStore implements AnalyzerDocumentStore {
	getDocumentAtPosition(sourceFile: SourceFile, position: SourceFilePosition, options: LitAnalyzerConfig): TextDocument | undefined {
		return parseDocumentsInSourceFile(
			sourceFile,
			{
				htmlTags: options.htmlTemplateTags,
				cssTags: options.cssTemplateTags
			},
			position
		);
	}

	getDocumentsInFile(sourceFile: SourceFile, config: LitAnalyzerConfig): TextDocument[] {
		return parseDocumentsInSourceFile(sourceFile, {
			htmlTags: config.htmlTemplateTags,
			cssTags: config.cssTemplateTags
		});
	}
}
