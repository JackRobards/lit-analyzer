"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentAnalyzer = void 0;
const array_util_js_1 = require("../util/array-util.js");
const range_util_js_1 = require("../util/range-util.js");
const rule_diagnostic_util_js_1 = require("../util/rule-diagnostic-util.js");
const rule_fix_util_js_1 = require("../util/rule-fix-util.js");
class ComponentAnalyzer {
    getDiagnostics(definitionOrDeclaration, context) {
        return this.getRuleDiagnostics(definitionOrDeclaration, context).map(d => (0, rule_diagnostic_util_js_1.convertRuleDiagnosticToLitDiagnostic)(d, context));
    }
    getCodeFixesAtOffsetRange(definitionOrDeclaration, range, context) {
        return (0, array_util_js_1.arrayFlat)((0, array_util_js_1.arrayDefined)(this.getRuleDiagnostics(definitionOrDeclaration, context)
            .filter(({ diagnostic }) => (0, range_util_js_1.intersects)(range, diagnostic.location))
            .map(({ diagnostic }) => diagnostic.fix?.()))).map(ruleFix => (0, rule_fix_util_js_1.converRuleFixToLitCodeFix)(ruleFix));
    }
    getRuleDiagnostics(definitionOrDeclaration, context) {
        if ("tagName" in definitionOrDeclaration) {
            return context.rules.getDiagnosticsFromDefinition(definitionOrDeclaration, context);
        }
        else {
            return context.rules.getDiagnosticsFromDeclaration(definitionOrDeclaration, context);
        }
    }
}
exports.ComponentAnalyzer = ComponentAnalyzer;
//# sourceMappingURL=component-analyzer.js.map