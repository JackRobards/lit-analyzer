import type { LitRenameInfo } from "lit-analyzer-fork";
import type { RenameInfo } from "typescript";
import { translateTargetKind } from "./translate-target-kind.js";
import { translateRange } from "./translate-range.js";

export function translateRenameInfo({ displayName, fullDisplayName, kind, range }: LitRenameInfo): RenameInfo {
	const triggerSpan = translateRange(range);

	return {
		canRename: true,
		kind: translateTargetKind(kind),
		kindModifiers: "",
		displayName,
		fullDisplayName,
		triggerSpan
	};
}
