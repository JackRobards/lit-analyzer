"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlNodeKind = void 0;
exports.isHTMLNode = isHTMLNode;
var HtmlNodeKind;
(function (HtmlNodeKind) {
    HtmlNodeKind["NODE"] = "NODE";
    HtmlNodeKind["SVG"] = "SVG";
    HtmlNodeKind["STYLE"] = "STYLE";
})(HtmlNodeKind || (exports.HtmlNodeKind = HtmlNodeKind = {}));
function isHTMLNode(obj) {
    return "tagName" in obj && "location" in obj && "attributes" in obj;
}
//# sourceMappingURL=html-node-types.js.map