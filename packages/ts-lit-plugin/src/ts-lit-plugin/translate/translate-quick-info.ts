import type { LitQuickInfo } from "@jackolope/lit-analyzer";
import type { QuickInfo } from "typescript";
import { tsModule } from "../../ts-module.js";
import { translateRange } from "./translate-range.js";

export function translateQuickInfo(quickInfo: LitQuickInfo): QuickInfo {
	return {
		kind: tsModule.ts.ScriptElementKind.label,
		kindModifiers: "",
		textSpan: translateRange(quickInfo.range),
		displayParts: [
			{
				text: quickInfo.primaryInfo,
				kind: "text"
			}
		],
		documentation:
			quickInfo.secondaryInfo == null
				? []
				: [
						{
							kind: "text",
							text: quickInfo.secondaryInfo
						}
					]
	};
}
