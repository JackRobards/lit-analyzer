"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caseInsensitiveEquals = caseInsensitiveEquals;
exports.replacePrefix = replacePrefix;
/**
 * Compares two strings case insensitive.
 * @param strA
 * @param strB
 */
function caseInsensitiveEquals(strA, strB) {
    return strA.localeCompare(strB, undefined, { sensitivity: "accent" }) === 0;
}
function replacePrefix(str, prefix) {
    return str.replace(new RegExp("^" + escapeRegExp(prefix)), "");
}
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
//# sourceMappingURL=str-util.js.map