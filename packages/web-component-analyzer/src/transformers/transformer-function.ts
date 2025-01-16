import type { Program } from "typescript";
import type { AnalyzerResult } from "../analyze/types/analyzer-result";
import type { TransformerConfig } from "./transformer-config";

export type TransformerFunction = (results: AnalyzerResult[], program: Program, config: TransformerConfig) => string;
