/**
 * Flattens an array.
 * Use this function to keep support for node 10
 * @param items
 */
export function arrayFlat<T>(items: (T[] | T)[]): T[] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if ("flat" in (items as any)) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (items as any).flat();
	}

	const flattenArray: T[] = [];
	for (const item of items) {
		if (Array.isArray(item)) {
			flattenArray.push(...item);
		} else {
			flattenArray.push(item);
		}
	}
	return flattenArray;
}

/**
 * Filters an array returning only defined items
 * @param array
 */
export function arrayDefined<T>(array: (T | undefined)[]): T[] {
	return array.filter((item): item is NonNullable<typeof item> => item != null);
}
