import { existsSync, readFileSync } from "fs";
import type { SimpleType } from "ts-simple-type";
import type { HTMLDataV1 } from "vscode-html-languageservice";
import type { LitAnalyzerConfig } from "../lit-analyzer-config.js";
import type { HtmlAttr, HtmlDataCollection, HtmlEvent, HtmlTag } from "../parse/parse-html-data/html-tag.js";
import { mergeHtmlAttrs, mergeHtmlEvents, mergeHtmlTags } from "../parse/parse-html-data/html-tag.js";
import { parseVscodeHtmlData } from "../parse/parse-html-data/parse-vscode-html-data.js";
import { lazy } from "../util/general-util.js";
import type { LitAnalyzerContext } from "../lit-analyzer-context.js";

export function getUserConfigHtmlCollection(config: LitAnalyzerConfig, context: LitAnalyzerContext): HtmlDataCollection {
	const collection = (() => {
		let collection: HtmlDataCollection = { tags: [], global: {} };
		for (const customHtmlData of Array.isArray(config.customHtmlData) ? config.customHtmlData : [config.customHtmlData]) {
			try {
				const data: HTMLDataV1 =
					typeof customHtmlData === "string" && existsSync(customHtmlData)
						? JSON.parse(readFileSync(customHtmlData, "utf8").toString())
						: customHtmlData;
				const parsedCollection = parseVscodeHtmlData(data, context);
				collection = {
					tags: mergeHtmlTags([...collection.tags, ...parsedCollection.tags]),
					global: {
						attributes: mergeHtmlAttrs([...(collection.global.attributes || []), ...(parsedCollection.global.attributes || [])]),
						events: mergeHtmlEvents([...(collection.global.events || []), ...(parsedCollection.global.events || [])])
					}
				};
			} catch (e) {
				context.logger.error("Error parsing user configuration 'customHtmlData'", e, customHtmlData);
			}
		}
		return collection;
	})();

	const tags = config.globalTags.map(
		tagName =>
			({
				tagName: tagName,
				properties: [],
				attributes: [],
				events: [],
				slots: [],
				cssParts: [],
				cssProperties: []
			}) as HtmlTag
	);

	const attrs = config.globalAttributes.map(
		attrName =>
			({
				name: attrName,
				kind: "attribute",
				getType: lazy(() => ({ kind: "ANY" }) as SimpleType)
			}) as HtmlAttr
	);

	const events = config.globalEvents.map(
		eventName =>
			({
				name: eventName,
				kind: "event",
				getType: lazy(() => ({ kind: "ANY" }) as SimpleType)
			}) as HtmlEvent
	);

	return {
		tags: [...tags, ...collection.tags],
		global: {
			attributes: [...attrs, ...(collection.global.attributes || [])],
			events: [...events, ...(collection.global.events || [])]
		}
	};
}
