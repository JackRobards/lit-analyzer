import type { LitCompletionDetails } from "@jackolope/lit-analyzer";
import type { CompletionEntryDetails } from "typescript";
import type { LitPluginContext } from "../lit-plugin-context.js";

export function translateCompletionDetails(completionDetails: LitCompletionDetails, context: LitPluginContext): CompletionEntryDetails {
	return {
		name: completionDetails.name,
		kind: context.ts.ScriptElementKind.label,
		kindModifiers: "",
		displayParts: [
			{
				text: completionDetails.primaryInfo,
				kind: "text"
			}
		],
		documentation:
			completionDetails.secondaryInfo == null
				? []
				: [
						{
							kind: "text",
							text: completionDetails.secondaryInfo
						}
					]
	};
}
