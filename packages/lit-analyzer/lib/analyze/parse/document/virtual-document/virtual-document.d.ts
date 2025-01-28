import type { Expression } from "typescript";
import type { DocumentOffset, DocumentRange, Range, SourceFilePosition, SourceFileRange } from "../../../types/range.js";
export interface VirtualDocument {
    fileName: string;
    location: SourceFileRange;
    text: string;
    getPartsAtDocumentRange(range?: DocumentRange): (Expression | string)[];
    sfPositionToDocumentOffset(position: SourceFilePosition): DocumentOffset;
    documentOffsetToSFPosition(offset: DocumentOffset): SourceFilePosition;
}
export declare function textPartsToRanges(parts: (Expression | string)[]): Range[];
//# sourceMappingURL=virtual-document.d.ts.map