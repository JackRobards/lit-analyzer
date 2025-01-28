import type * as tsMod from "typescript";
import type { Program, SourceFile } from "typescript";
import type { LitAnalyzerConfig } from "../../lit-analyzer-config.js";
import type { LitAnalyzerLogger } from "../../lit-analyzer-logger.js";
import type { AnalyzerDefinitionStore } from "../../store/analyzer-definition-store.js";
import type { AnalyzerDependencyStore } from "../../store/analyzer-dependency-store.js";
import type { AnalyzerDocumentStore } from "../../store/analyzer-document-store.js";
import type { AnalyzerHtmlStore } from "../../store/analyzer-html-store.js";
import type { RuleDiagnostic } from "./rule-diagnostic.js";
export interface RuleModuleContext {
    readonly ts: typeof tsMod;
    readonly program: Program;
    readonly file: SourceFile;
    readonly htmlStore: AnalyzerHtmlStore;
    readonly dependencyStore: AnalyzerDependencyStore;
    readonly documentStore: AnalyzerDocumentStore;
    readonly definitionStore: AnalyzerDefinitionStore;
    readonly logger: LitAnalyzerLogger;
    readonly config: LitAnalyzerConfig;
    report(diagnostic: RuleDiagnostic): void;
    break(): void;
}
//# sourceMappingURL=rule-module-context.d.ts.map