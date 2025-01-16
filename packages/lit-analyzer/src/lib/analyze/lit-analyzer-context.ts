import type * as tsMod from "typescript";
import type { Program, SourceFile } from "typescript";
import type * as tsServer from "typescript/lib/tsserverlibrary.js";
import type { LitAnalyzerConfig } from "./lit-analyzer-config.js";
import type { LitAnalyzerLogger } from "./lit-analyzer-logger.js";
import type { RuleCollection } from "./rule-collection.js";
import type { AnalyzerDefinitionStore } from "./store/analyzer-definition-store.js";
import type { AnalyzerDependencyStore } from "./store/analyzer-dependency-store.js";
import type { AnalyzerDocumentStore } from "./store/analyzer-document-store.js";
import type { AnalyzerHtmlStore } from "./store/analyzer-html-store.js";

export interface LitAnalyzerContext {
	readonly ts: typeof tsMod;
	readonly program: Program;
	readonly project: tsServer.server.Project | undefined;
	readonly config: LitAnalyzerConfig;

	// Stores
	readonly htmlStore: AnalyzerHtmlStore;
	readonly dependencyStore: AnalyzerDependencyStore;
	readonly documentStore: AnalyzerDocumentStore;
	readonly definitionStore: AnalyzerDefinitionStore;

	readonly logger: LitAnalyzerLogger;
	readonly rules: RuleCollection;

	readonly currentFile: SourceFile;
	readonly currentRunningTime: number;
	readonly isCancellationRequested: boolean;

	updateConfig(config: LitAnalyzerConfig): void;
	updateDependencies(file: SourceFile): void;
	updateComponents(file: SourceFile): void;

	setContextBase(contextBase: LitAnalyzerContextBaseOptions): void;
}

export interface LitAnalyzerContextBaseOptions {
	file: SourceFile | undefined;
	timeout?: number;
	throwOnCancellation?: boolean;
}

export interface LitPluginContextHandler {
	ts?: typeof tsMod;
	getProgram(): Program;
	getProject?(): tsServer.server.Project;
}
