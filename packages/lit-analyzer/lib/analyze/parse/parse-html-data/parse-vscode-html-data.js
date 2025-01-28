"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseVscodeHtmlData = parseVscodeHtmlData;
const general_util_js_1 = require("../../util/general-util.js");
function parseVscodeHtmlData(data, config = {}) {
    switch (data.version) {
        case 1:
        case 1.1:
            return parseVscodeDataV1(data, config);
    }
}
function parseVscodeDataV1(data, config) {
    const valueSetTypeMap = valueSetsToTypeMap(data.valueSets || []);
    valueSetTypeMap.set("v", { kind: "BOOLEAN" });
    // Transfer existing typemap to new typemap
    if (config.typeMap != null) {
        for (const [k, v] of config.typeMap.entries()) {
            valueSetTypeMap.set(k, v);
        }
    }
    const newConfig = {
        ...config,
        typeMap: valueSetTypeMap
    };
    const globalAttributes = (data.globalAttributes || []).map(tagDataAttr => tagDataToHtmlTagAttr(tagDataAttr, newConfig));
    const globalEvents = attrsToEvents(globalAttributes).map(evt => ({ ...evt, global: true }));
    return {
        tags: (data.tags || []).map(tagData => tagDataToHtmlTag(tagData, newConfig)),
        global: {
            attributes: globalAttributes,
            events: globalEvents
        }
    };
}
function tagDataToHtmlTag(tagData, config) {
    const { name, description } = tagData;
    const attributes = tagData.attributes.map(tagDataAttr => tagDataToHtmlTagAttr(tagDataAttr, config, name));
    const events = attrsToEvents(attributes);
    return {
        tagName: name,
        description: stringOrMarkupContentToString(description),
        attributes,
        events,
        properties: [],
        slots: [],
        builtIn: config.builtIn,
        cssParts: [],
        cssProperties: []
    };
}
function tagDataToHtmlTagAttr(tagDataAttr, config, fromTagName) {
    const { name, description, valueSet, values } = tagDataAttr;
    const type = valueSet != null ? config.typeMap?.get(valueSet) : values != null ? attrValuesToUnion(values) : undefined;
    return {
        kind: "attribute",
        name,
        description: stringOrMarkupContentToString(description),
        fromTagName,
        getType: (0, general_util_js_1.lazy)(() => type || { kind: "ANY" }),
        builtIn: config.builtIn
    };
}
function valueSetsToTypeMap(valueSets) {
    const entries = valueSets.map(valueSet => [valueSet.name, attrValuesToUnion(valueSet.values)]);
    return new Map(entries);
}
function attrValuesToUnion(attrValues) {
    return {
        kind: "UNION",
        types: attrValues.map(value => ({
            value: value.name,
            kind: "STRING_LITERAL"
        }))
    };
}
function stringOrMarkupContentToString(str) {
    if (str == null || typeof str === "string") {
        return str;
    }
    return str.value;
}
function attrsToEvents(htmlAttrs) {
    return htmlAttrs
        .filter(htmlAttr => htmlAttr.name.startsWith("on"))
        .map(htmlAttr => ({
        name: htmlAttr.name.replace(/^on/, ""),
        description: htmlAttr.description,
        fromTagName: htmlAttr.fromTagName,
        getType: (0, general_util_js_1.lazy)(() => ({ kind: "ANY" })),
        builtIn: htmlAttr.builtIn
    }));
}
//# sourceMappingURL=parse-vscode-html-data.js.map