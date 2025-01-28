"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeFixesForHtmlDocument = codeFixesForHtmlDocument;
const array_util_js_1 = require("../../../util/array-util.js");
const range_util_js_1 = require("../../../util/range-util.js");
const rule_fix_util_js_1 = require("../../../util/rule-fix-util.js");
function codeFixesForHtmlDocument(htmlDocument, range, context) {
    return (0, array_util_js_1.arrayFlat)((0, array_util_js_1.arrayDefined)(context.rules
        .getDiagnosticsFromDocument(htmlDocument, context)
        .filter(({ diagnostic }) => (0, range_util_js_1.intersects)((0, range_util_js_1.documentRangeToSFRange)(htmlDocument, range), diagnostic.location))
        .map(({ diagnostic }) => diagnostic.fix?.()))).map(ruleFix => (0, rule_fix_util_js_1.converRuleFixToLitCodeFix)(ruleFix));
}
//# sourceMappingURL=code-fixes-for-html-document.js.map