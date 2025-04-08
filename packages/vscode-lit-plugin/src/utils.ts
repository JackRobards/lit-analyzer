/**
 * Matches a regex on a text and returns all positions where a match was found
 * @param regex
 * @param text
 * @param callback
 */
export function getRegexMatches(regex: RegExp, text: string): { start: number; text: string }[] {
	let match: RegExpExecArray | null = null;

	const matches: { start: number; text: string }[] = [];

	while ((match = regex.exec(text)) != null) {
		const start = match.index;
		matches.push({ start, text: match[0] });
	}

	return matches;
}
