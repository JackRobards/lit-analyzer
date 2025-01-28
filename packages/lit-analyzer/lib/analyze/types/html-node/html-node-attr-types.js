"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlNodeAttrKind = void 0;
exports.isHTMLAttr = isHTMLAttr;
var HtmlNodeAttrKind;
(function (HtmlNodeAttrKind) {
    HtmlNodeAttrKind["EVENT_LISTENER"] = "EVENT_LISTENER";
    HtmlNodeAttrKind["ATTRIBUTE"] = "ATTRIBUTE";
    HtmlNodeAttrKind["BOOLEAN_ATTRIBUTE"] = "BOOLEAN_ATTRIBUTE";
    HtmlNodeAttrKind["PROPERTY"] = "PROPERTY";
})(HtmlNodeAttrKind || (exports.HtmlNodeAttrKind = HtmlNodeAttrKind = {}));
function isHTMLAttr(obj) {
    return "name" in obj && "location" in obj && "htmlNode" in obj;
}
//# sourceMappingURL=html-node-attr-types.js.map