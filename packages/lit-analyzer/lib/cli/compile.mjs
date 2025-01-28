import { existsSync, readFileSync } from "fs";
// Since we use the project version of TypeScript `typescript`, we must use a default import here for compatibility. Not all of these modules are exported by name in older versions.
// If we only supported TypeScript >= 5.5, then we could change this back to a normal, non-default, import.
// The update that fixed this: https://devblogs.microsoft.com/typescript/announcing-typescript-5-5/#easier-api-consumption-from-ecmascript-modules
//
// Without this, the error message we can run into is:
// SyntaxError: Named export 'ModuleKind' not found. The requested module 'typescript' is a CommonJS module, which may not support all module.exports as named exports.
// CommonJS modules can always be imported via the default export, for example using:
import pkg from "typescript";
const { parseJsonConfigFileContent, sys, createProgram, findConfigFile, ModuleKind, ModuleResolutionKind, readConfigFile, ScriptTarget } = pkg;
const requiredCompilerOptions = {
    noEmitOnError: false,
    noEmit: true,
    allowJs: true,
    //maxNodeModuleJsDepth: 3,
    strictNullChecks: true, // Type checking will remove all "null" and "undefined" from types if "strictNullChecks" is false
    skipLibCheck: true
};
/**
 * The most general version of compiler options.
 */
const defaultCompilerOptions = {
    ...requiredCompilerOptions,
    experimentalDecorators: true,
    target: ScriptTarget.Latest,
    downlevelIteration: true,
    module: ModuleKind.ESNext,
    //module: ModuleKind.CommonJS,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    allowUnreachableCode: true,
    allowUnusedLabels: true,
    lib: ["lib.es2023.d.ts", "lib.dom.d.ts"]
};
/**
 * Compiles an array of file paths using typescript.
 * @param filePaths
 */
export function compileTypescript(filePaths) {
    const options = getCompilerOptions();
    filePaths = Array.isArray(filePaths) ? filePaths : [filePaths];
    const program = createProgram(filePaths, options);
    const files = program
        .getSourceFiles()
        .filter(sf => filePaths.includes(sf.fileName))
        .sort((sfA, sfB) => (sfA.fileName > sfB.fileName ? 1 : -1));
    return { program, files };
}
/**
 * Returns compiler options to be used
 */
export function getCompilerOptions() {
    // Get compiler options from files
    const compilerOptions = resolveTsConfigCompilerOptions();
    // If we found existing compiler options, merged "required compiler options" into it.
    if (compilerOptions != null) {
        const options = {
            ...compilerOptions,
            ...requiredCompilerOptions
        };
        // set module resolution to nodejs if it is classic
        // but if the user has set it to something else, don't override it
        if (!options.moduleResolution || options.moduleResolution === ModuleResolutionKind.Classic) {
            options.moduleResolution = ModuleResolutionKind.NodeNext;
        }
        return options;
    }
    // Return default compiler options if no compiler options were found
    return defaultCompilerOptions;
}
/**
 * Resolves "tsconfig.json" file and returns its CompilerOptions
 */
export function resolveTsConfigCompilerOptions() {
    // Find the nearest tsconfig.json file if possible
    const tsConfigFilePath = findConfigFile(process.cwd(), existsSync, "tsconfig.json");
    if (tsConfigFilePath != null) {
        // Read the tsconfig.json file
        const parsedConfig = readConfigFile(tsConfigFilePath, path => readFileSync(path, "utf8"));
        if (parsedConfig != null && parsedConfig.config != null) {
            // Parse the tsconfig.json file
            const parsedJson = parseJsonConfigFileContent(parsedConfig.config, sys, process.cwd());
            return parsedJson?.options;
        }
    }
    return undefined;
}
/**
 * Resolves the nearest tsconfig.json and returns the configuration seed within the plugins section for "@jackolope/ts-lit-plugin"
 */
export function readLitAnalyzerConfigFromTsConfig() {
    const compilerOptions = resolveTsConfigCompilerOptions();
    // Finds the plugin section
    if (compilerOptions != null && "plugins" in compilerOptions) {
        const plugins = compilerOptions.plugins;
        const tsLitPluginOptions = plugins.find(plugin => plugin.name === "@jackolope/ts-lit-plugin");
        if (tsLitPluginOptions != null) {
            return tsLitPluginOptions;
        }
    }
    return undefined;
}
//# sourceMappingURL=compile.mjs.map