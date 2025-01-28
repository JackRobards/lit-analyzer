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
exports.findBestMatch = findBestMatch;
exports.findBestStringMatch = findBestStringMatch;
// @ts-expect-error - need to upgrade to type module in package.json
const didyoumean2_1 = __importStar(require("didyoumean2")), dym = didyoumean2_1;
/**
 * Finds the best match between a string and elements in a list.
 * @param find
 * @param elements
 * @param options
 */
function findBestMatch(find, elements, options) {
    options.caseSensitive = "caseSensitive" in options ? options.caseSensitive : false;
    options.threshold = "threshold" in options ? options.threshold : 0.5;
    return ((0, didyoumean2_1.default)(find, elements, {
        caseSensitive: options.caseSensitive,
        threshold: options.threshold,
        matchPath: [options.matchKey],
        returnType: dym.ReturnTypeEnums.FIRST_CLOSEST_MATCH,
        trimSpaces: false
    }) || undefined);
}
function findBestStringMatch(find, elements, { caseSensitive = true, threshold = 0.5 } = {}) {
    const matches = (0, didyoumean2_1.default)(find, elements, { caseSensitive, threshold });
    return typeof matches === "string" ? matches : Array.isArray(matches) ? matches[0] : undefined;
}
//# sourceMappingURL=find-best-match.js.map