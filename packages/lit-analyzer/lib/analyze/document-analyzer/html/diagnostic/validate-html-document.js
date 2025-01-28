"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHTMLDocument = validateHTMLDocument;
const rule_diagnostic_util_js_1 = require("../../../util/rule-diagnostic-util.js");
function validateHTMLDocument(htmlDocument, context) {
    return context.rules.getDiagnosticsFromDocument(htmlDocument, context).map(d => (0, rule_diagnostic_util_js_1.convertRuleDiagnosticToLitDiagnostic)(d, context));
}
//# sourceMappingURL=validate-html-document.js.map