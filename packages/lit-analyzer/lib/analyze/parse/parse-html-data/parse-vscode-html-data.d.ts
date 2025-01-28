import type { SimpleType } from "ts-simple-type";
import type { HTMLDataV1 } from "vscode-html-languageservice";
import type { HtmlDataCollection } from "./html-tag.js";
export interface ParseVscodeHtmlDataConfig {
    builtIn?: boolean;
    typeMap?: Map<string, SimpleType>;
}
export declare function parseVscodeHtmlData(data: HTMLDataV1, config?: ParseVscodeHtmlDataConfig): HtmlDataCollection;
//# sourceMappingURL=parse-vscode-html-data.d.ts.map