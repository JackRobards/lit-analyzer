"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLitAnalyzerContext = void 0;
const typescript_1 = __importDefault(require("typescript"));
const web_component_analyzer_1 = require("@jackolope/web-component-analyzer");
const all_rules_js_1 = require("../rules/all-rules.js");
const constants_js_1 = require("./constants.js");
const get_built_in_html_collection_js_1 = require("./data/get-built-in-html-collection.js");
const get_user_config_html_collection_js_1 = require("./data/get-user-config-html-collection.js");
const lit_analyzer_config_js_1 = require("./lit-analyzer-config.js");
const lit_analyzer_logger_js_1 = require("./lit-analyzer-logger.js");
const convert_component_definitions_to_html_collection_js_1 = require("./parse/convert-component-definitions-to-html-collection.js");
const parse_dependencies_js_1 = require("./parse/parse-dependencies/parse-dependencies.js");
const rule_collection_js_1 = require("./rule-collection.js");
const default_analyzer_definition_store_js_1 = require("./store/definition-store/default-analyzer-definition-store.js");
const default_analyzer_dependency_store_js_1 = require("./store/dependency-store/default-analyzer-dependency-store.js");
const default_analyzer_document_store_js_1 = require("./store/document-store/default-analyzer-document-store.js");
const default_analyzer_html_store_js_1 = require("./store/html-store/default-analyzer-html-store.js");
const html_data_source_merged_js_1 = require("./store/html-store/html-data-source-merged.js");
const changed_source_file_iterator_js_1 = require("./util/changed-source-file-iterator.js");
class DefaultLitAnalyzerContext {
    handler;
    componentSourceFileIterator = (0, changed_source_file_iterator_js_1.changedSourceFileIterator)();
    hasAnalyzedSubclassExtensions = false;
    _config = (0, lit_analyzer_config_js_1.makeConfig)({});
    get ts() {
        return this.handler.ts || typescript_1.default;
    }
    get program() {
        return this.handler.getProgram();
    }
    get project() {
        return this.handler.getProject != null ? this.handler.getProject() : undefined;
    }
    get config() {
        return this._config;
    }
    _currentStartTime = Date.now();
    _currentTimeout = constants_js_1.MAX_RUNNING_TIME_PER_OPERATION;
    get currentRunningTime() {
        return Date.now() - this._currentStartTime;
    }
    _currentCancellationToken = undefined;
    _hasRequestedCancellation = false;
    _throwOnRequestedCancellation = false;
    get isCancellationRequested() {
        if (this._hasRequestedCancellation) {
            return true;
        }
        if (this._currentCancellationToken == null) {
            // Never cancel if "cancellation token" is not present
            // This means that we are in a CLI context, and are willing to wait for the operation to finish for correctness reasons
            return false;
        }
        if (this._currentCancellationToken?.isCancellationRequested()) {
            if (!this._hasRequestedCancellation) {
                this.logger.error("Cancelling current operation because project host has requested cancellation");
            }
            this._hasRequestedCancellation = true;
        }
        if (this.currentRunningTime > this._currentTimeout) {
            if (!this._hasRequestedCancellation) {
                this.logger.error(`Cancelling current operation because it has been running for more than ${this._currentTimeout}ms (${this.currentRunningTime}ms)`);
            }
            this._hasRequestedCancellation = true;
        }
        // Throw if necessary
        if (this._hasRequestedCancellation && this._throwOnRequestedCancellation) {
            throw new this.ts.OperationCanceledException();
        }
        return this._hasRequestedCancellation;
    }
    _currentFile;
    get currentFile() {
        if (this._currentFile == null) {
            throw new Error("Current file is not set");
        }
        return this._currentFile;
    }
    htmlStore = new default_analyzer_html_store_js_1.DefaultAnalyzerHtmlStore();
    dependencyStore = new default_analyzer_dependency_store_js_1.DefaultAnalyzerDependencyStore();
    documentStore = new default_analyzer_document_store_js_1.DefaultAnalyzerDocumentStore();
    definitionStore = new default_analyzer_definition_store_js_1.DefaultAnalyzerDefinitionStore();
    logger = new lit_analyzer_logger_js_1.DefaultLitAnalyzerLogger();
    _rules;
    get rules() {
        if (this._rules == null) {
            this._rules = new rule_collection_js_1.RuleCollection();
            this._rules.push(...all_rules_js_1.ALL_RULES);
        }
        return this._rules;
    }
    setContextBase({ file, timeout, throwOnCancellation }) {
        this._currentFile = file;
        this._currentStartTime = Date.now();
        this._currentTimeout = timeout ?? constants_js_1.MAX_RUNNING_TIME_PER_OPERATION;
        this._currentCancellationToken = this.project?.getCancellationToken();
        this._throwOnRequestedCancellation = throwOnCancellation ?? false;
        this._hasRequestedCancellation = false;
    }
    updateConfig(config) {
        this._config = config;
        this.logger.level = (() => {
            switch (config.logging) {
                case "off":
                    return lit_analyzer_logger_js_1.LitAnalyzerLoggerLevel.OFF;
                case "error":
                    return lit_analyzer_logger_js_1.LitAnalyzerLoggerLevel.ERROR;
                case "warn":
                    return lit_analyzer_logger_js_1.LitAnalyzerLoggerLevel.WARN;
                case "debug":
                    return lit_analyzer_logger_js_1.LitAnalyzerLoggerLevel.DEBUG;
                case "verbose":
                    return lit_analyzer_logger_js_1.LitAnalyzerLoggerLevel.VERBOSE;
                default:
                    return lit_analyzer_logger_js_1.LitAnalyzerLoggerLevel.OFF;
            }
        })();
        // Add user configured HTML5 collection
        const collection = (0, get_user_config_html_collection_js_1.getUserConfigHtmlCollection)(config);
        this.htmlStore.absorbCollection(collection, html_data_source_merged_js_1.HtmlDataSourceKind.USER);
    }
    updateDependencies(file) {
        this.findDependenciesInFile(file);
    }
    updateComponents(file) {
        this.findInvalidatedComponents();
        this.analyzeSubclassExtensions();
    }
    get checker() {
        return this.program.getTypeChecker();
    }
    constructor(handler) {
        this.handler = handler;
        // Add all HTML5 tags and attributes
        const builtInCollection = (0, get_built_in_html_collection_js_1.getBuiltInHtmlCollection)();
        this.htmlStore.absorbCollection(builtInCollection, html_data_source_merged_js_1.HtmlDataSourceKind.BUILT_IN);
    }
    findInvalidatedComponents() {
        const startTime = Date.now();
        const seenFiles = new Set();
        const invalidatedFiles = new Set();
        const getRunningTime = () => {
            return Date.now() - startTime;
        };
        // Find components in all changed files
        for (const sourceFile of this.componentSourceFileIterator(this.program.getSourceFiles())) {
            if (this.isCancellationRequested) {
                break;
            }
            seenFiles.add(sourceFile);
            // All components definitions that use this file must be invidalited
            this.definitionStore.getDefinitionsWithDeclarationInFile(sourceFile).forEach(definition => {
                const sf = this.program.getSourceFile(definition.sourceFile.fileName);
                if (sf != null) {
                    invalidatedFiles.add(sf);
                }
            });
            this.logger.debug(`Analyzing components in ${sourceFile.fileName} (changed) (${getRunningTime()}ms total)`);
            this.findComponentsInFile(sourceFile);
        }
        for (const sourceFile of invalidatedFiles) {
            if (this.isCancellationRequested) {
                break;
            }
            if (!seenFiles.has(sourceFile)) {
                seenFiles.add(sourceFile);
                this.logger.debug(`Analyzing components in ${sourceFile.fileName} (invalidated) (${getRunningTime()}ms total)`);
                this.findComponentsInFile(sourceFile);
            }
        }
        this.logger.verbose(`Analyzed ${seenFiles.size} files (${invalidatedFiles.size} invalidated) in ${getRunningTime()}ms`);
    }
    findComponentsInFile(sourceFile) {
        const isDefaultLibrary = this.program.isSourceFileDefaultLibrary(sourceFile);
        const isExternalLibrary = this.program.isSourceFileFromExternalLibrary(sourceFile);
        // Only analyzing specific default libs of interest can save us up to 500ms in startup time
        if ((isDefaultLibrary && sourceFile.fileName.match(/(lib\.dom\.d\.ts)/) == null) ||
            (isExternalLibrary && sourceFile.fileName.match(/(@types\/node)/) != null)) {
            return;
        }
        const analyzeResult = (0, web_component_analyzer_1.analyzeSourceFile)(sourceFile, {
            program: this.program,
            ts: this.ts,
            config: {
                features: ["event", "member", "slot", "csspart", "cssproperty"],
                analyzeGlobalFeatures: !isDefaultLibrary, // Don't analyze global features in lib.dom.d.ts
                analyzeDefaultLib: true,
                analyzeDependencies: true,
                analyzeAllDeclarations: false,
                excludedDeclarationNames: ["HTMLElement"]
            }
        });
        const reg = isDefaultLibrary ? html_data_source_merged_js_1.HtmlDataSourceKind.BUILT_IN_DECLARED : html_data_source_merged_js_1.HtmlDataSourceKind.DECLARED;
        // Forget
        const existingResult = this.definitionStore.getAnalysisResultForFile(sourceFile);
        if (existingResult != null) {
            this.htmlStore.forgetCollection({
                tags: existingResult.componentDefinitions.map(d => d.tagName),
                global: {
                    events: existingResult.globalFeatures?.events.map(e => e.name),
                    slots: existingResult.globalFeatures?.slots.map(s => s.name || ""),
                    cssParts: existingResult.globalFeatures?.cssParts.map(s => s.name || ""),
                    cssProperties: existingResult.globalFeatures?.cssProperties.map(s => s.name || ""),
                    attributes: existingResult.globalFeatures?.members.filter(m => m.kind === "attribute").map(m => m.attrName || ""),
                    properties: existingResult.globalFeatures?.members.filter(m => m.kind === "property").map(m => m.propName || "")
                }
            }, reg);
            this.definitionStore.forgetAnalysisResultForFile(sourceFile);
        }
        // Absorb
        this.definitionStore.absorbAnalysisResult(sourceFile, analyzeResult);
        const htmlCollection = (0, convert_component_definitions_to_html_collection_js_1.convertAnalyzeResultToHtmlCollection)(analyzeResult, {
            checker: this.checker,
            addDeclarationPropertiesAsAttributes: this.program.isSourceFileFromExternalLibrary(sourceFile)
        });
        this.htmlStore.absorbCollection(htmlCollection, reg);
    }
    analyzeSubclassExtensions() {
        if (this.hasAnalyzedSubclassExtensions)
            return;
        const result = (0, web_component_analyzer_1.analyzeHTMLElement)(this.program, this.ts);
        if (result != null) {
            const extension = (0, convert_component_definitions_to_html_collection_js_1.convertComponentDeclarationToHtmlTag)(result, undefined, { checker: this.checker });
            this.htmlStore.absorbSubclassExtension("HTMLElement", extension);
            this.hasAnalyzedSubclassExtensions = true;
        }
    }
    findDependenciesInFile(file) {
        if ((0, lit_analyzer_config_js_1.isRuleDisabled)(this.config, "no-missing-import"))
            return;
        // Build a graph of component dependencies
        const res = (0, parse_dependencies_js_1.parseDependencies)(file, this);
        this.dependencyStore.absorbComponentDefinitionsForFile(file, res);
    }
}
exports.DefaultLitAnalyzerContext = DefaultLitAnalyzerContext;
//# sourceMappingURL=default-lit-analyzer-context.js.map