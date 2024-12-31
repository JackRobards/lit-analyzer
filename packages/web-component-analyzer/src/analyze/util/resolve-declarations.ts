import type * as tsModule from "typescript";
import type { Declaration, Node, Symbol, TypeChecker, Identifier } from "typescript";

/**
 * Returns if the symbol has "alias" flag
 * @param symbol
 * @param ts
 */
export function isAliasSymbol(symbol: Symbol, ts: typeof tsModule): boolean {
	return hasFlag(symbol.flags, ts.SymbolFlags.Alias);
}

/**
 * Returns if a number has a flag
 * @param num
 * @param flag
 */
export function hasFlag(num: number, flag: number): boolean {
	return (num & flag) !== 0;
}

/**
 * Returns the symbol of a node.
 * This function follows aliased symbols.
 * @param node
 * @param context
 */
export function getSymbol(node: Node, context: { checker: TypeChecker; ts: typeof tsModule }): Symbol | undefined {
	if (node == null) return undefined;
	const { checker, ts } = context;

	// Get the symbol
	let symbol = checker.getSymbolAtLocation(node);

	if (symbol == null) {
		const identifier = getNodeIdentifier(node, context);
		symbol = identifier != null ? checker.getSymbolAtLocation(identifier) : undefined;
	}

	// Resolve aliased symbols
	if (symbol != null && isAliasSymbol(symbol, ts)) {
		symbol = checker.getAliasedSymbol(symbol);
		if (symbol == null) return undefined;
	}

	return symbol;
}

/**
 * Resolves the declarations of a symbol. A valueDeclaration is always the first entry in the array
 * @param symbol
 */
export function resolveSymbolDeclarations(symbol: Symbol): Declaration[] {
	// Filters all declarations
	const valueDeclaration = symbol.valueDeclaration;
	const declarations = symbol.getDeclarations() || [];

	if (valueDeclaration == null) {
		return declarations;
	} else {
		// Make sure that "valueDeclaration" is always the first entry
		return [valueDeclaration, ...declarations.filter(decl => decl !== valueDeclaration)];
	}
}

/**
 * Resolve a declaration by trying to find the real value by following assignments.
 * @param node
 * @param context
 */
export function resolveDeclarationsDeep(node: Node, context: { checker: TypeChecker; ts: typeof tsModule }): Node[] {
	const declarations: Node[] = [];
	const allDeclarations = resolveDeclarations(node, context);

	for (const declaration of allDeclarations) {
		if (context.ts.isVariableDeclaration(declaration) && declaration.initializer != null && context.ts.isIdentifier(declaration.initializer)) {
			declarations.push(...resolveDeclarationsDeep(declaration.initializer, context));
		} else if (context.ts.isTypeAliasDeclaration(declaration) && declaration.type != null && context.ts.isIdentifier(declaration.type)) {
			declarations.push(...resolveDeclarationsDeep(declaration.type, context));
		} else {
			declarations.push(declaration);
		}
	}

	return declarations;
}

/**
 * Resolves all relevant declarations of a specific node.
 * @param node
 * @param context
 */
export function resolveDeclarations(node: Node, context: { checker: TypeChecker; ts: typeof tsModule }): Declaration[] {
	if (node == null) return [];

	const symbol = getSymbol(node, context);
	if (symbol == null) return [];

	return resolveSymbolDeclarations(symbol);
}

/**
 * Returns the declaration name of a given node if possible.
 * @param node
 * @param context
 */
export function getNodeName(node: Node, context: { ts: typeof tsModule }): string | undefined {
	return getNodeIdentifier(node, context)?.getText();
}

/**
 * Returns the declaration name of a given node if possible.
 * @param node
 * @param context
 */
export function getNodeIdentifier(node: Node, context: { ts: typeof tsModule }): Identifier | undefined {
	if (context.ts.isIdentifier(node)) {
		return node;
	} else if (
		(context.ts.isClassLike(node) ||
			context.ts.isInterfaceDeclaration(node) ||
			context.ts.isVariableDeclaration(node) ||
			context.ts.isMethodDeclaration(node) ||
			context.ts.isPropertyDeclaration(node) ||
			context.ts.isFunctionDeclaration(node)) &&
		node.name != null &&
		context.ts.isIdentifier(node.name)
	) {
		return node.name;
	}

	return undefined;
}
