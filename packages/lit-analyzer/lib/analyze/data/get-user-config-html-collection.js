"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserConfigHtmlCollection = getUserConfigHtmlCollection;
const fs_1 = require("fs");
const html_tag_js_1 = require("../parse/parse-html-data/html-tag.js");
const parse_vscode_html_data_js_1 = require("../parse/parse-html-data/parse-vscode-html-data.js");
const general_util_js_1 = require("../util/general-util.js");
function getUserConfigHtmlCollection(config) {
    const collection = (() => {
        let collection = { tags: [], global: {} };
        for (const customHtmlData of Array.isArray(config.customHtmlData) ? config.customHtmlData : [config.customHtmlData]) {
            try {
                const data = typeof customHtmlData === "string" && (0, fs_1.existsSync)(customHtmlData)
                    ? JSON.parse((0, fs_1.readFileSync)(customHtmlData, "utf8").toString())
                    : customHtmlData;
                const parsedCollection = (0, parse_vscode_html_data_js_1.parseVscodeHtmlData)(data);
                collection = {
                    tags: (0, html_tag_js_1.mergeHtmlTags)([...collection.tags, ...parsedCollection.tags]),
                    global: {
                        attributes: (0, html_tag_js_1.mergeHtmlAttrs)([...(collection.global.attributes || []), ...(parsedCollection.global.attributes || [])]),
                        events: (0, html_tag_js_1.mergeHtmlEvents)([...(collection.global.events || []), ...(parsedCollection.global.events || [])])
                    }
                };
            }
            catch (e) {
                //logger.error("Error parsing user configuration 'customHtmlData'", e, customHtmlData);
            }
        }
        return collection;
    })();
    const tags = config.globalTags.map(tagName => ({
        tagName: tagName,
        properties: [],
        attributes: [],
        events: [],
        slots: [],
        cssParts: [],
        cssProperties: []
    }));
    const attrs = config.globalAttributes.map(attrName => ({
        name: attrName,
        kind: "attribute",
        getType: (0, general_util_js_1.lazy)(() => ({ kind: "ANY" }))
    }));
    const events = config.globalEvents.map(eventName => ({
        name: eventName,
        kind: "event",
        getType: (0, general_util_js_1.lazy)(() => ({ kind: "ANY" }))
    }));
    return {
        tags: [...tags, ...collection.tags],
        global: {
            attributes: [...attrs, ...(collection.global.attributes || [])],
            events: [...events, ...(collection.global.events || [])]
        }
    };
}
//# sourceMappingURL=get-user-config-html-collection.js.map