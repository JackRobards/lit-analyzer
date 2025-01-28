"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAnalyzeResultToHtmlCollection = convertAnalyzeResultToHtmlCollection;
exports.convertComponentDeclarationToHtmlTag = convertComponentDeclarationToHtmlTag;
exports.convertComponentFeaturesToHtml = convertComponentFeaturesToHtml;
const ts_simple_type_1 = require("ts-simple-type");
const general_util_js_1 = require("../util/general-util.js");
function convertAnalyzeResultToHtmlCollection(result, options) {
    const tags = result.componentDefinitions.map(definition => convertComponentDeclarationToHtmlTag(definition.declaration, definition, options));
    const global = result.globalFeatures == null ? {} : convertComponentFeaturesToHtml(result.globalFeatures, { checker: options.checker });
    return {
        tags,
        global
    };
}
function convertComponentDeclarationToHtmlTag(declaration, definition, { checker, addDeclarationPropertiesAsAttributes }) {
    const tagName = definition?.tagName ?? "";
    const builtIn = definition == null || (declaration?.sourceFile || definition.sourceFile).fileName.endsWith("lib.dom.d.ts");
    if (declaration == null) {
        return {
            tagName,
            builtIn,
            attributes: [],
            events: [],
            properties: [],
            slots: [],
            cssParts: [],
            cssProperties: []
        };
    }
    const htmlTag = {
        declaration,
        tagName,
        builtIn,
        description: declaration.jsDoc?.description,
        ...convertComponentFeaturesToHtml(declaration, { checker, builtIn, fromTagName: tagName })
    };
    if (addDeclarationPropertiesAsAttributes && !builtIn) {
        for (const htmlProp of htmlTag.properties) {
            if (htmlProp.declaration != null && htmlProp.declaration.attrName == null && htmlProp.declaration.node.getSourceFile().isDeclarationFile) {
                htmlTag.attributes.push({
                    ...htmlProp,
                    kind: "attribute"
                });
            }
        }
    }
    return htmlTag;
}
function convertComponentFeaturesToHtml(features, { checker, builtIn, fromTagName }) {
    const result = {
        attributes: [],
        events: [],
        properties: [],
        slots: [],
        cssParts: [],
        cssProperties: []
    };
    for (const event of features.events) {
        result.events.push({
            declaration: event,
            description: event.jsDoc?.description,
            name: event.name,
            getType: (0, general_util_js_1.lazy)(() => {
                const type = event.type?.();
                if (type == null) {
                    return { kind: "ANY" };
                }
                return (0, ts_simple_type_1.isSimpleType)(type) ? type : (0, ts_simple_type_1.toSimpleType)(type, checker);
            }),
            fromTagName,
            builtIn
        });
        result.attributes.push({
            kind: "attribute",
            name: `on${event.name}`,
            description: event.jsDoc?.description,
            getType: (0, general_util_js_1.lazy)(() => ({ kind: "STRING" })),
            declaration: {
                attrName: `on${event.name}`,
                jsDoc: event.jsDoc,
                kind: "attribute",
                node: event.node,
                type: () => ({ kind: "ANY" })
            },
            builtIn,
            fromTagName
        });
    }
    for (const cssPart of features.cssParts) {
        result.cssParts.push({
            declaration: cssPart,
            description: cssPart.jsDoc?.description,
            name: cssPart.name || "",
            fromTagName
        });
    }
    for (const cssProp of features.cssProperties) {
        result.cssProperties.push({
            declaration: cssProp,
            description: cssProp.jsDoc?.description,
            name: cssProp.name || "",
            typeHint: cssProp.typeHint,
            fromTagName
        });
    }
    for (const slot of features.slots) {
        result.slots.push({
            declaration: slot,
            description: slot.jsDoc?.description,
            name: slot.name || "",
            fromTagName
        });
    }
    for (const member of features.members) {
        // Only add public members
        if (member.visibility != null && member.visibility !== "public") {
            continue;
        }
        // Only add non-static members
        if (member.modifiers?.has("static")) {
            continue;
        }
        // Only add writable members
        if (member.modifiers?.has("readonly")) {
            continue;
        }
        const base = {
            declaration: member,
            description: member.jsDoc?.description,
            getType: (0, general_util_js_1.lazy)(() => {
                const type = member.type?.();
                if (type == null) {
                    return { kind: "ANY" };
                }
                return (0, ts_simple_type_1.isSimpleType)(type) ? type : (0, ts_simple_type_1.toSimpleType)(type, checker);
            }),
            builtIn,
            fromTagName
        };
        if (member.kind === "property") {
            result.properties.push({
                ...base,
                kind: "property",
                name: member.propName,
                required: member.required
            });
        }
        if ("attrName" in member && member.attrName != null) {
            result.attributes.push({
                ...base,
                kind: "attribute",
                name: member.attrName,
                required: member.required
            });
        }
    }
    return result;
}
//# sourceMappingURL=convert-component-definitions-to-html-collection.js.map