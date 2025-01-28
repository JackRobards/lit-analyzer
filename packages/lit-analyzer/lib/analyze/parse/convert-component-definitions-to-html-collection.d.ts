import type { TypeChecker } from "typescript";
import type { AnalyzerResult, ComponentDeclaration, ComponentDefinition, ComponentFeatures } from "@jackolope/web-component-analyzer";
import type { HtmlDataCollection, HtmlDataFeatures, HtmlTag } from "./parse-html-data/html-tag.js";
export interface AnalyzeResultConversionOptions {
    addDeclarationPropertiesAsAttributes?: boolean;
    checker: TypeChecker;
}
export declare function convertAnalyzeResultToHtmlCollection(result: AnalyzerResult, options: AnalyzeResultConversionOptions): HtmlDataCollection;
export declare function convertComponentDeclarationToHtmlTag(declaration: ComponentDeclaration | undefined, definition: ComponentDefinition | undefined, { checker, addDeclarationPropertiesAsAttributes }: AnalyzeResultConversionOptions): HtmlTag;
export declare function convertComponentFeaturesToHtml(features: ComponentFeatures, { checker, builtIn, fromTagName }: {
    checker: TypeChecker;
    builtIn?: boolean;
    fromTagName?: string;
}): HtmlDataFeatures;
//# sourceMappingURL=convert-component-definitions-to-html-collection.d.ts.map