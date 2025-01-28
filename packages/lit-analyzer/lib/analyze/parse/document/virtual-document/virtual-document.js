"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textPartsToRanges = textPartsToRanges;
function textPartsToRanges(parts) {
    let offset = 0;
    return parts
        .map(p => {
        if (typeof p === "string") {
            const startOffset = offset;
            offset += p.length;
            return {
                start: startOffset,
                end: offset
            };
        }
        else {
            offset += p.getText().length + 3;
        }
        return;
    })
        .filter((r) => r != null);
}
//# sourceMappingURL=virtual-document.js.map