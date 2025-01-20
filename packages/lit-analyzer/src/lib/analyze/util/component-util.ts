import type { SourceFile } from "typescript";
import type { ComponentDeclaration, ComponentDefinition } from "@jackolope/web-component-analyzer";
import { visitAllHeritageClauses } from "@jackolope/web-component-analyzer";

export function getDeclarationsInFile(definition: ComponentDefinition, sourceFile: SourceFile): ComponentDeclaration[] {
	const declarations = new Set<ComponentDeclaration>();
	emitDeclarationsInFile(definition, sourceFile, decl => declarations.add(decl));
	return Array.from(declarations);
}

function emitDeclarationsInFile(definition: ComponentDefinition, sourceFile: SourceFile, emit: (decl: ComponentDeclaration) => unknown): void {
	const declaration = definition.declaration;

	if (declaration == null) {
		return;
	}

	if (declaration.sourceFile.fileName === sourceFile.fileName) {
		if (emit(declaration) === false) {
			return;
		}
	}

	visitAllHeritageClauses(declaration, clause => {
		if (clause.declaration && clause.declaration.sourceFile === sourceFile) {
			if (emit(clause.declaration) === false) {
				return;
			}
		}
	});
}
