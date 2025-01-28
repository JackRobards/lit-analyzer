"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRuleDiagnosticToLitDiagnostic = convertRuleDiagnosticToLitDiagnostic;
const lit_analyzer_config_js_1 = require("../lit-analyzer-config.js");
function convertRuleDiagnosticToLitDiagnostic(reported, context) {
    const source = reported.source;
    const { message, location, fixMessage, suggestion } = reported.diagnostic;
    return {
        fixMessage,
        location,
        suggestion,
        message,
        source,
        file: context.currentFile,
        severity: (0, lit_analyzer_config_js_1.litDiagnosticRuleSeverity)(context.config, source),
        code: (0, lit_analyzer_config_js_1.ruleIdCode)(source)
    };
}
//# sourceMappingURL=rule-diagnostic-util.js.map