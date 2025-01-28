"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAnalyzerDocumentStore = void 0;
const parse_documents_in_source_file_js_1 = require("../../parse/document/parse-documents-in-source-file.js");
class DefaultAnalyzerDocumentStore {
    getDocumentAtPosition(sourceFile, position, options) {
        return (0, parse_documents_in_source_file_js_1.parseDocumentsInSourceFile)(sourceFile, {
            htmlTags: options.htmlTemplateTags,
            cssTags: options.cssTemplateTags
        }, position);
    }
    getDocumentsInFile(sourceFile, config) {
        return (0, parse_documents_in_source_file_js_1.parseDocumentsInSourceFile)(sourceFile, {
            htmlTags: config.htmlTemplateTags,
            cssTags: config.cssTemplateTags
        });
    }
}
exports.DefaultAnalyzerDocumentStore = DefaultAnalyzerDocumentStore;
//# sourceMappingURL=default-analyzer-document-store.js.map