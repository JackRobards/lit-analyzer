"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestTargetForHtmlAttr = suggestTargetForHtmlAttr;
const html_node_attr_types_js_1 = require("../types/html-node/html-node-attr-types.js");
const find_best_match_js_1 = require("./find-best-match.js");
function suggestTargetForHtmlAttr(htmlNodeAttr, htmlStore) {
    const properties = htmlStore.getAllPropertiesForTag(htmlNodeAttr.htmlNode);
    const attributes = htmlStore.getAllAttributesForTag(htmlNodeAttr.htmlNode);
    const events = htmlStore.getAllEventsForTag(htmlNodeAttr.htmlNode);
    switch (htmlNodeAttr.kind) {
        case html_node_attr_types_js_1.HtmlNodeAttrKind.EVENT_LISTENER:
            return findSuggestedTarget(htmlNodeAttr.name, [events]);
        case html_node_attr_types_js_1.HtmlNodeAttrKind.PROPERTY:
            return findSuggestedTarget(htmlNodeAttr.name, [properties, attributes]);
        case html_node_attr_types_js_1.HtmlNodeAttrKind.ATTRIBUTE:
        case html_node_attr_types_js_1.HtmlNodeAttrKind.BOOLEAN_ATTRIBUTE:
            return findSuggestedTarget(htmlNodeAttr.name, [attributes, properties]);
    }
}
function findSuggestedTarget(name, tests) {
    for (const test of tests) {
        let items = [...test];
        // If the search string starts with "on"/"aria", only check members starting with "on"/"aria"
        // If not, remove members starting with "on"/"aria" from the list of items
        if (name.startsWith("on")) {
            items = items.filter(item => item.name.startsWith("on"));
        }
        else if (name.startsWith("aria")) {
            items = items.filter(item => item.name.startsWith("aria"));
        }
        else {
            items = items.filter(item => !item.name.startsWith("on") && !item.name.startsWith("aria"));
        }
        const match = (0, find_best_match_js_1.findBestMatch)(name, items, { matchKey: "name", caseSensitive: false });
        if (match != null) {
            return match;
        }
    }
    return;
}
//# sourceMappingURL=attribute-util.js.map