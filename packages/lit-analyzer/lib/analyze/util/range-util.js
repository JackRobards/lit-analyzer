"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSourceFileRange = makeSourceFileRange;
exports.makeDocumentRange = makeDocumentRange;
exports.rangeFromHtmlNodeAttr = rangeFromHtmlNodeAttr;
exports.rangeFromHtmlNode = rangeFromHtmlNode;
exports.rangeFromNode = rangeFromNode;
exports.documentRangeToSFRange = documentRangeToSFRange;
exports.sfRangeToDocumentRange = sfRangeToDocumentRange;
exports.intersects = intersects;
function makeSourceFileRange(range) {
    return range;
}
function makeDocumentRange(range) {
    return range;
}
function rangeFromHtmlNodeAttr(htmlAttr) {
    return documentRangeToSFRange(htmlAttr.document, htmlAttr.location.name);
    //return { document: htmlAttr.document, ...htmlAttr.location.name };
}
function rangeFromHtmlNode(htmlNode) {
    return documentRangeToSFRange(htmlNode.document, htmlNode.location.name);
    //return { document: htmlNode.document, ...htmlNode.location.name };
}
function rangeFromNode(node) {
    //return { file: node.getSourceFile(), start: node.getStart(), end: node.getEnd() };
    return makeSourceFileRange({ start: node.getStart(), end: node.getEnd() });
}
function documentRangeToSFRange(document, range) {
    return makeSourceFileRange({
        start: document.virtualDocument.documentOffsetToSFPosition(range.start),
        end: document.virtualDocument.documentOffsetToSFPosition(range.end)
    });
}
function sfRangeToDocumentRange(document, range) {
    return makeDocumentRange({
        start: document.virtualDocument.sfPositionToDocumentOffset(range.start),
        end: document.virtualDocument.sfPositionToDocumentOffset(range.end)
    });
}
/**
 * Returns if a position is within start and end.
 * @param position
 * @param start
 * @param end
 */
//export function intersects(position: SourceFilePosition | SourceFileRange, { start, end }: SourceFileRange): boolean;
//export function intersects(position: DocumentOffset | DocumentRange, { start, end }: DocumentRange): boolean;
function intersects(position, { start, end }) {
    if (typeof position === "number") {
        return start <= position && position <= end;
    }
    else {
        return start <= position.start && position.end <= end;
    }
}
//# sourceMappingURL=range-util.js.map