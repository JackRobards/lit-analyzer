import type { ComponentDeclaration, ComponentDefinition } from "@jackolope/web-component-analyzer";
import type { LitAnalyzerContext } from "../lit-analyzer-context.js";
import type { ReportedRuleDiagnostic } from "../rule-collection.js";
import type { LitCodeFix } from "../types/lit-code-fix.js";
import type { LitDiagnostic } from "../types/lit-diagnostic.js";
import type { SourceFileRange } from "../types/range.js";
import { arrayDefined, arrayFlat } from "../util/array-util.js";
import { intersects } from "../util/range-util.js";
import { convertRuleDiagnosticToLitDiagnostic } from "../util/rule-diagnostic-util.js";
import { converRuleFixToLitCodeFix } from "../util/rule-fix-util.js";

export class ComponentAnalyzer {
	getDiagnostics(definitionOrDeclaration: ComponentDefinition | ComponentDeclaration, context: LitAnalyzerContext): LitDiagnostic[] {
		return this.getRuleDiagnostics(definitionOrDeclaration, context).map(d => convertRuleDiagnosticToLitDiagnostic(d, context));
	}

	getCodeFixesAtOffsetRange(
		definitionOrDeclaration: ComponentDefinition | ComponentDeclaration,
		range: SourceFileRange,
		context: LitAnalyzerContext
	): LitCodeFix[] {
		return arrayFlat(
			arrayDefined(
				this.getRuleDiagnostics(definitionOrDeclaration, context)
					.filter(({ diagnostic }) => intersects(range, diagnostic.location))
					.map(({ diagnostic }) => diagnostic.fix?.())
			)
		).map(ruleFix => converRuleFixToLitCodeFix(ruleFix));
	}

	private getRuleDiagnostics(
		definitionOrDeclaration: ComponentDefinition | ComponentDeclaration,
		context: LitAnalyzerContext
	): ReportedRuleDiagnostic[] {
		if ("tagName" in definitionOrDeclaration) {
			return context.rules.getDiagnosticsFromDefinition(definitionOrDeclaration, context);
		} else {
			return context.rules.getDiagnosticsFromDeclaration(definitionOrDeclaration, context);
		}
	}
}
