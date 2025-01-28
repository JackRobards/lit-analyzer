"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LitHtmlVscodeService = void 0;
const vscode = __importStar(require("vscode-html-languageservice"));
const virtual_document_js_1 = require("../../parse/document/virtual-document/virtual-document.js");
const range_util_js_1 = require("../../util/range-util.js");
const htmlService = vscode.getLanguageService();
function makeVscTextDocument(htmlDocument) {
    return vscode.TextDocument.create("untitled://embedded.html", "html", 1, htmlDocument.virtualDocument.text);
}
function makeVscHtmlDocument(vscTextDocument) {
    return htmlService.parseHTMLDocument(vscTextDocument);
}
class LitHtmlVscodeService {
    getClosingTagAtOffset(document, offset) {
        const vscTextDocument = makeVscTextDocument(document);
        const vscHtmlDocument = makeVscHtmlDocument(vscTextDocument);
        const htmlLSPosition = vscTextDocument.positionAt(offset);
        const tagComplete = htmlService.doTagComplete(vscTextDocument, htmlLSPosition, vscHtmlDocument);
        if (tagComplete == null)
            return;
        // Html returns completions with snippet placeholders. Strip these out.
        return {
            newText: tagComplete.replace(/\$\d/g, "")
        };
    }
    format(document, settings) {
        const parts = document.virtualDocument.getPartsAtDocumentRange((0, range_util_js_1.makeDocumentRange)({
            start: 0,
            end: document.virtualDocument.location.end - document.virtualDocument.location.start
        }));
        const ranges = (0, virtual_document_js_1.textPartsToRanges)(parts);
        const originalHtml = parts.map(p => (typeof p === "string" ? p : `[#${"#".repeat(p.getText().length)}]`)).join("");
        const vscTextDocument = vscode.TextDocument.create("untitled://embedded.html", "html", 1, originalHtml);
        const edits = htmlService.format(vscTextDocument, undefined, {
            tabSize: settings.tabSize,
            insertSpaces: !!settings.convertTabsToSpaces,
            wrapLineLength: 90,
            unformatted: "",
            contentUnformatted: "pre,code,textarea",
            indentInnerHtml: true,
            preserveNewLines: true,
            maxPreserveNewLines: undefined,
            indentHandlebars: false,
            endWithNewline: false,
            extraLiners: "head, body, /html",
            wrapAttributes: "auto"
        });
        const hasLeadingNewline = originalHtml.startsWith("\n");
        const hasTrailingNewline = originalHtml.endsWith("\n");
        const newHtml = `${hasLeadingNewline ? "\n" : ""}${vscode.TextDocument.applyEdits(vscTextDocument, edits)}${hasTrailingNewline ? "\n" : ""}`;
        const splitted = newHtml.split(/\[#+\]/);
        return splitted.map((newText, i) => {
            const range = ranges[i];
            return { range: (0, range_util_js_1.documentRangeToSFRange)(document, range), newText };
        });
    }
}
exports.LitHtmlVscodeService = LitHtmlVscodeService;
//# sourceMappingURL=lit-html-vscode-service.js.map