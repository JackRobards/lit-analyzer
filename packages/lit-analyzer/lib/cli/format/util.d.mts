import type { TextSpan } from "typescript";
import type { AnalysisStats } from "./diagnostic-formatter.mjs";
export declare function generalReport(stats: AnalysisStats): string;
export declare function relativeFileName(fileName: string): string;
export declare function markText(text: string, range: TextSpan, colorFunction?: (str: string) => string): string;
export declare function textPad(str: string, { width, fill, dir }: {
    width: number;
    fill?: string;
    dir?: "left" | "right";
}): string;
//# sourceMappingURL=util.d.mts.map