import type { Node, SourceFile } from "typescript";
import type { ComponentDeclaration } from "./component-declaration";

export interface ComponentDefinition {
	sourceFile: SourceFile;

	identifierNodes: Set<Node>;
	tagNameNodes: Set<Node>;

	tagName: string;
	declaration?: ComponentDeclaration;
}
