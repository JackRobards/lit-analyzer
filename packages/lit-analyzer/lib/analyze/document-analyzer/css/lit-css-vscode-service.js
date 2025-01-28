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
exports.LitCssVscodeService = void 0;
const vscode = __importStar(require("vscode-css-languageservice"));
const lit_analyzer_config_js_1 = require("../../lit-analyzer-config.js");
const html_tag_js_1 = require("../../parse/parse-html-data/html-tag.js");
const general_util_js_1 = require("../../util/general-util.js");
const get_position_context_in_document_js_1 = require("../../util/get-position-context-in-document.js");
const iterable_util_js_1 = require("../../util/iterable-util.js");
const range_util_js_1 = require("../../util/range-util.js");
function makeVscTextDocument(cssDocument) {
    return vscode.TextDocument.create("untitled://embedded.css", "css", 1, cssDocument.virtualDocument.text);
}
class LitCssVscodeService {
    dataProvider = new LitVscodeCSSDataProvider();
    get cssService() {
        return vscode.getCSSLanguageService({ customDataProviders: [this.dataProvider.provider] });
    }
    get scssService() {
        return vscode.getSCSSLanguageService({ customDataProviders: [this.dataProvider.provider] });
    }
    getDiagnostics(document, context) {
        if ((0, lit_analyzer_config_js_1.isRuleDisabled)(context.config, "no-invalid-css")) {
            return [];
        }
        this.dataProvider.update(context.htmlStore);
        const vscTextDocument = makeVscTextDocument(document);
        // Return nothing if this is a one liner css snippet.
        // Example: css`100px`
        if (!vscTextDocument.getText().includes("\n")) {
            return [];
        }
        const vscStylesheet = this.makeVscStylesheet(vscTextDocument);
        const diagnostics = this.scssService.doValidation(vscTextDocument, vscStylesheet);
        return diagnostics
            .filter(diagnostic => diagnostic.range.start.line !== 0 && diagnostic.range.start.line < vscTextDocument.lineCount - 1)
            .map(diagnostic => ({
            severity: diagnostic.severity === vscode.DiagnosticSeverity.Error ? "error" : "warning",
            source: "no-invalid-css",
            location: (0, range_util_js_1.documentRangeToSFRange)(document, {
                start: vscTextDocument.offsetAt(diagnostic.range.start),
                end: vscTextDocument.offsetAt(diagnostic.range.end)
            }),
            message: diagnostic.message,
            file: context.currentFile
        }));
    }
    getQuickInfo(document, offset, context) {
        this.dataProvider.update(context.htmlStore);
        const vscTextDocument = makeVscTextDocument(document);
        const vscStylesheet = this.makeVscStylesheet(vscTextDocument);
        const vscPosition = vscTextDocument.positionAt(offset);
        const hover = this.scssService.doHover(vscTextDocument, vscPosition, vscStylesheet);
        if (hover == null || hover.range == null)
            return;
        const contents = Array.isArray(hover.contents) ? hover.contents : [hover.contents];
        let primaryInfo = undefined;
        let secondaryInfo = undefined;
        for (const content of contents) {
            const text = typeof content === "string" ? content : content.value;
            if (typeof content === "object" && "language" in content) {
                if (content.language === "html") {
                    primaryInfo = `${primaryInfo == null ? "" : "\n\n"}${text}`;
                }
            }
            else {
                secondaryInfo = text;
            }
        }
        return {
            primaryInfo: primaryInfo || "",
            secondaryInfo,
            range: (0, range_util_js_1.documentRangeToSFRange)(document, { start: vscTextDocument.offsetAt(hover.range.start), end: vscTextDocument.offsetAt(hover.range.end) })
        };
    }
    getCompletions(document, offset, context) {
        this.dataProvider.update(context.htmlStore);
        const positionContext = (0, get_position_context_in_document_js_1.getPositionContextInDocument)(document, offset);
        // If there is ":" before the word, treat them like it's a part of the "leftWord", because ":" is a part of the name, but also a separator
        if (positionContext.beforeWord === ":") {
            positionContext.leftWord =
                ":" +
                    (0, get_position_context_in_document_js_1.grabWordInDirection)({
                        startOffset: offset - positionContext.leftWord.length - 1,
                        stopChar: /[^:]/,
                        direction: "left",
                        text: document.virtualDocument.text
                    }) +
                    positionContext.leftWord;
        }
        const range = (0, range_util_js_1.documentRangeToSFRange)(document, {
            start: positionContext.offset - positionContext.leftWord.length,
            end: positionContext.offset + positionContext.rightWord.length
        });
        const vscTextDocument = makeVscTextDocument(document);
        const vscStylesheet = this.makeVscStylesheet(vscTextDocument);
        const vscPosition = vscTextDocument.positionAt(offset);
        const items = this.cssService.doComplete(vscTextDocument, vscPosition, vscStylesheet);
        // Get all completions from vscode html language service
        const completions = items.items.map(i => ({
            kind: i.kind == null ? "unknown" : translateCompletionItemKind(i.kind),
            name: i.label,
            insert: i.label, //replacePrefix(i.label, positionContext.leftWord),
            kindModifiers: i.kind === vscode.CompletionItemKind.Color ? "color" : undefined,
            documentation: (0, general_util_js_1.lazy)(() => (typeof i.documentation === "string" || i.documentation == null ? i.documentation : i.documentation.value)),
            sortText: i.sortText,
            range
        }));
        // Add completions for css custom properties
        for (const cssProp of context.htmlStore.getAllCssPropertiesForTag("")) {
            if (completions.some(c => c.name === cssProp.name)) {
                continue;
            }
            completions.push({
                kind: "variableElement",
                name: cssProp.name,
                insert: cssProp.name,
                sortText: positionContext.leftWord.startsWith("-") ? "0" : "e_0",
                documentation: (0, general_util_js_1.lazy)(() => (0, html_tag_js_1.documentationForCssProperty)(cssProp)),
                range
            });
        }
        if (positionContext.beforeWord === "(") {
            // Get the name of the pseudo element
            const pseudoElementName = (0, get_position_context_in_document_js_1.grabWordInDirection)({
                startOffset: offset - positionContext.leftWord.length - 1,
                stopChar: /[^-A-Za-z]/,
                direction: "left",
                text: document.virtualDocument.text
            });
            // Add completions for css shadow parts
            if (pseudoElementName === "part") {
                for (const cssPart of context.htmlStore.getAllCssPartsForTag("")) {
                    completions.push({
                        kind: "variableElement",
                        name: cssPart.name,
                        insert: cssPart.name,
                        sortText: "0",
                        documentation: (0, general_util_js_1.lazy)(() => (0, html_tag_js_1.documentationForCssPart)(cssPart)),
                        range
                    });
                }
            }
        }
        return completions;
    }
    makeVscStylesheet(vscTextDocument) {
        return this.scssService.parseStylesheet(vscTextDocument);
    }
}
exports.LitCssVscodeService = LitCssVscodeService;
function translateCompletionItemKind(kind) {
    switch (kind) {
        case vscode.CompletionItemKind.Method:
            return "memberFunctionElement";
        case vscode.CompletionItemKind.Function:
            return "functionElement";
        case vscode.CompletionItemKind.Constructor:
            return "constructorImplementationElement";
        case vscode.CompletionItemKind.Field:
        case vscode.CompletionItemKind.Variable:
            return "variableElement";
        case vscode.CompletionItemKind.Class:
            return "classElement";
        case vscode.CompletionItemKind.Interface:
            return "interfaceElement";
        case vscode.CompletionItemKind.Module:
            return "moduleElement";
        case vscode.CompletionItemKind.Property:
            return "memberVariableElement";
        case vscode.CompletionItemKind.Unit:
        case vscode.CompletionItemKind.Value:
            return "constElement";
        case vscode.CompletionItemKind.Enum:
            return "enumElement";
        case vscode.CompletionItemKind.Keyword:
            return "keyword";
        case vscode.CompletionItemKind.Color:
            return "constElement";
        case vscode.CompletionItemKind.Reference:
            return "alias";
        case vscode.CompletionItemKind.File:
            return "moduleElement";
        case vscode.CompletionItemKind.Snippet:
        case vscode.CompletionItemKind.Text:
        default:
            return "unknown";
    }
}
class LitVscodeCSSDataProvider {
    pseudoElementData = [];
    customDataProvider = (() => {
        const provider = this;
        return {
            providePseudoElements() {
                return [
                    {
                        browsers: [],
                        description: `Unlike ::part, ::theme matches elements parts with that theme name, anywhere in the document.`,
                        name: "::theme",
                        status: "nonstandard"
                    }
                ];
            },
            provideAtDirectives() {
                return [];
            },
            providePseudoClasses() {
                return provider.pseudoElementData;
            },
            provideProperties() {
                return [];
            }
        };
    })();
    get provider() {
        return this.customDataProvider;
    }
    update(htmlStore) {
        this.pseudoElementData = Array.from((0, iterable_util_js_1.iterableMap)((0, iterable_util_js_1.iterableFilter)(htmlStore.getGlobalTags(), tag => !tag.builtIn), tag => ({
            browsers: [],
            description: (0, html_tag_js_1.documentationForHtmlTag)(tag),
            name: tag.tagName,
            status: "standard"
        })));
    }
}
//# sourceMappingURL=lit-css-vscode-service.js.map