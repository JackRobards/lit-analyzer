import type { ComponentDefinition } from "@jackolope/web-component-analyzer";
import type { HtmlDocument } from "../parse/document/text-document/html-document/html-document.js";
import type { HtmlNode } from "./html-node/html-node-types.js";
import type { LitTargetKind } from "./lit-target-kind.js";
import type { SourceFileRange } from "./range.js";

export interface RenameInfoBase {
	kind: LitTargetKind;
	displayName: string;
	fullDisplayName: string;
	range: SourceFileRange;
}

export interface RenameHtmlNodeInfo extends RenameInfoBase {
	document: HtmlDocument;
	target: ComponentDefinition | HtmlNode;
}

export interface RenameComponentDefinitionInfo extends RenameInfoBase {
	target: ComponentDefinition;
}

export type LitRenameInfo = RenameHtmlNodeInfo | RenameComponentDefinitionInfo;
