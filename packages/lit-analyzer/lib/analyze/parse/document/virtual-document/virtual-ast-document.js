"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualAstDocument = void 0;
const ts_module_js_1 = require("../../../ts-module.js");
const range_util_js_1 = require("../../../util/range-util.js");
function getPartLength(part) {
    const end = part.parent && ts_module_js_1.tsModule.ts.isTemplateSpan(part.parent) ? part.parent.literal.getStart() : part.getEnd();
    return end - part.getFullStart();
}
class VirtualAstDocument {
    fileName;
    location;
    parts;
    _text;
    get text() {
        if (this._text == null) {
            let str = "";
            let prevPart = "";
            this.parts.forEach((part, i) => {
                const isLastPart = i >= this.parts.length - 1;
                if (typeof part === "string") {
                    str += part.substring(i === 0 ? 0 : 1, part.length - (isLastPart ? 0 : 2));
                    prevPart = part;
                }
                else {
                    const length = getPartLength(part) + 3;
                    const expressionIndex = (i - 1) / 2;
                    const substitution = this.substituteExpression(length, part, prevPart, this.parts[i + 1], expressionIndex);
                    str += substitution;
                }
            });
            this._text = str;
        }
        return this._text;
    }
    getPartsAtDocumentRange(range) {
        if (range == null) {
            return this.parts;
        }
        const resultParts = [];
        let offset = 0;
        this.parts.forEach((part, i) => {
            const isLastPart = i >= this.parts.length - 1;
            const startOffset = offset;
            if (typeof part === "string") {
                const startPadding = i === 0 ? 0 : 1;
                const endPadding = isLastPart ? 0 : 2;
                offset += part.length;
                const literalPartRange = {
                    start: startOffset + startPadding,
                    end: offset - endPadding
                };
                if ((range.start < literalPartRange.start && range.end > literalPartRange.end) ||
                    (0, range_util_js_1.intersects)(range.start + 1, literalPartRange) ||
                    (0, range_util_js_1.intersects)(range.end - 1, literalPartRange)) {
                    const strStart = Math.max(literalPartRange.start, range.start);
                    const strEnd = Math.min(literalPartRange.end, range.end);
                    const substr = this.text.substring(strStart, strEnd);
                    resultParts.push(substr);
                }
            }
            else {
                offset += getPartLength(part);
                const expressionPartRange = {
                    start: startOffset,
                    end: offset
                };
                if ((0, range_util_js_1.intersects)(expressionPartRange, range)) {
                    resultParts.push(part);
                }
            }
        });
        return resultParts;
    }
    sfPositionToDocumentOffset(position) {
        return position - this.location.start;
    }
    documentOffsetToSFPosition(offset) {
        return this.location.start + offset;
    }
    constructor(astNodeOrParts, location, fileName) {
        if (Array.isArray(astNodeOrParts)) {
            this.parts = astNodeOrParts.map((p, i) => typeof p === "string" ? `${i !== 0 ? "}" : ""}${p}${i !== astNodeOrParts.length - 1 ? "${" : ""}` : p);
            this.location = location;
            this.fileName = fileName;
        }
        else {
            const { expressionParts, literalParts } = getPartsFromTaggedTemplate(astNodeOrParts);
            // Text contains both the ` of the template string and ${  +  }.
            // Strip these chars and make it possible to substitute even ${ and }!
            this.parts = [];
            literalParts.forEach((p, i) => {
                const expressionPart = expressionParts[i];
                this.parts.push(p.getText().slice(i === 0 ? 1 : 0, expressionPart == null ? -1 : undefined));
                if (expressionPart != null)
                    this.parts.push(expressionPart);
            });
            this.location = (0, range_util_js_1.makeSourceFileRange)({
                start: astNodeOrParts.template.getStart() + 1,
                end: astNodeOrParts.template.getEnd() - 1
            });
            this.fileName = this.fileName = astNodeOrParts.getSourceFile().fileName;
        }
    }
    substituteExpression(length, expression, prev, next, index) {
        if (length < 4) {
            throw new Error("Internal error: unexpected expression length: " + length);
        }
        const indexString = index.toString(36);
        if (indexString.length > length - 2) {
            throw new Error("Too many expressions in this template: " + indexString);
        }
        // To support element expressions, where we substitute into attribute name
        // position, we create a unique substitution by using the expression index
        //
        // We need this substitution to be valid in HTML for all valid lit-html
        // expression positions - so it must be a valid unquoted attribute value,
        // attribute name, and text content. Ideally the substitution would also
        // be a valid tag name to support some analysis of Lit 2 static templates.
        //
        // Example substitution:
        //
        //     html`<a href=${u}>${text}</a>`
        //
        // becomes:
        //
        //     html`<a href=__0_>_____1_</a>`
        return "_".repeat(length - indexString.length - 1) + indexString + "_";
    }
}
exports.VirtualAstDocument = VirtualAstDocument;
function getPartsFromTaggedTemplate(astNode) {
    const expressionParts = [];
    const literalParts = [];
    const template = astNode.template;
    if (ts_module_js_1.tsModule.ts.isTemplateExpression(template)) {
        literalParts.push(template.head);
        for (const templateSpan of template.templateSpans) {
            const expression = templateSpan.expression;
            expressionParts.push(expression);
            literalParts.push(templateSpan.literal);
        }
    }
    else if (ts_module_js_1.tsModule.ts.isNoSubstitutionTemplateLiteral(template)) {
        literalParts.push(template);
    }
    return { expressionParts, literalParts };
}
//# sourceMappingURL=virtual-ast-document.js.map