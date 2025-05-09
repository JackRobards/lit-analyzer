import type { SourceFileRange } from "../range.js";
import type { RuleFix } from "./rule-fix.js";

export interface RuleDiagnostic {
	location: SourceFileRange;
	message: string;
	fixMessage?: string;
	suggestion?: string;
	fix?: () => RuleFix[] | RuleFix;
}
