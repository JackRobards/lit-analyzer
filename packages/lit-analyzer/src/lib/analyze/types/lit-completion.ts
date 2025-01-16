import type { LitTargetKind } from "./lit-target-kind.js";
import type { SourceFileRange } from "./range.js";

export interface LitCompletion {
	name: string;
	kind: LitTargetKind;
	kindModifiers?: "color";
	insert: string;
	range?: SourceFileRange;
	importance?: "high" | "medium" | "low";
	sortText?: string;
	documentation?(): string | undefined;
}
