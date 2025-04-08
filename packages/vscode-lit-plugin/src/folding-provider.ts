import * as vscode from "vscode";
import { getLanguageService as getHtmlLanguageService, TextDocument as HTMLTextDocument, FoldingRangeKind } from "vscode-html-languageservice";
import { getCSSLanguageService, TextDocument as CSSTextDocument } from "vscode-css-languageservice";
import { getRegexMatches } from "./utils.js";

// Also support `svg` tagged template literals using the vscode-html-languageservice
const HTML_SECTION_REGEX = /(html|svg)`([\s\S]*?)`/gi;
const CSS_SECTION_REGEX = /(css)`([\s\S]*?)`/gi;

const htmlLanguageService = getHtmlLanguageService();
const cssLanguageService = getCSSLanguageService();

// Html and CSS language services share the same enums
const htmlOrCSSToVSCodeFoldingRangeKind = {
	[FoldingRangeKind.Comment]: vscode.FoldingRangeKind.Comment,
	[FoldingRangeKind.Imports]: vscode.FoldingRangeKind.Imports,
	[FoldingRangeKind.Region]: vscode.FoldingRangeKind.Region
};

/**
 * Exports a color provider that makes it possible to highlight colors within "css" and "html" tagged templates.
 */
export class FoldingProvider implements vscode.FoldingRangeProvider {
	provideFoldingRanges(document: vscode.TextDocument, context: vscode.FoldingContext, token: vscode.CancellationToken): vscode.FoldingRange[] {
		const documentText = document.getText();
		const foldingRanges: vscode.FoldingRange[] = [];

		// Find all html template literals to calculate folding regions for
		const htmlTemplateLiterals = getRegexMatches(HTML_SECTION_REGEX, documentText);

		for (const { text: taggedTemplateText, start: taggedTemplateOffset } of htmlTemplateLiterals) {
			const templateLineStart = document.positionAt(taggedTemplateOffset).line;
			const htmlContent = HTMLTextDocument.create(document.uri.toString(), document.languageId, document.version, taggedTemplateText);

			const htmlFoldingRanges = htmlLanguageService.getFoldingRanges(htmlContent, context);
			htmlFoldingRanges.forEach(({ startLine, endLine, kind }) => {
				const vscodeKind =
					kind && kind in htmlOrCSSToVSCodeFoldingRangeKind
						? htmlOrCSSToVSCodeFoldingRangeKind[kind as keyof typeof htmlOrCSSToVSCodeFoldingRangeKind]
						: undefined;

				const foldingRange = new vscode.FoldingRange(startLine + templateLineStart, endLine + templateLineStart, vscodeKind);
				foldingRanges.push(foldingRange);
			});
		}

		// Find all css template literals to calculate folding regions for
		const cssTemplateLiterals = getRegexMatches(CSS_SECTION_REGEX, documentText);

		for (const { text: taggedTemplateText, start: taggedTemplateOffset } of cssTemplateLiterals) {
			const templateLineStart = document.positionAt(taggedTemplateOffset).line;
			const htmlContent = CSSTextDocument.create(document.uri.toString(), document.languageId, document.version, taggedTemplateText);

			const cssFoldingRanges = cssLanguageService.getFoldingRanges(htmlContent, context);
			cssFoldingRanges.forEach(({ startLine, endLine, kind }) => {
				const vscodeKind =
					kind && kind in htmlOrCSSToVSCodeFoldingRangeKind
						? htmlOrCSSToVSCodeFoldingRangeKind[kind as keyof typeof htmlOrCSSToVSCodeFoldingRangeKind]
						: undefined;

				const foldingRange = new vscode.FoldingRange(startLine + templateLineStart, endLine + templateLineStart, vscodeKind);
				foldingRanges.push(foldingRange);
			});
		}

		return foldingRanges;
	}
}
