"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHtmlMember = isHtmlMember;
exports.isHtmlAttr = isHtmlAttr;
exports.isHtmlProp = isHtmlProp;
exports.isHtmlEvent = isHtmlEvent;
exports.litAttributeModifierForTarget = litAttributeModifierForTarget;
exports.documentationForCssPart = documentationForCssPart;
exports.documentationForCssProperty = documentationForCssProperty;
exports.documentationForHtmlTag = documentationForHtmlTag;
exports.documentationForTarget = documentationForTarget;
exports.descriptionForTarget = descriptionForTarget;
exports.targetKindAndTypeText = targetKindAndTypeText;
exports.targetKindText = targetKindText;
exports.mergeHtmlAttrs = mergeHtmlAttrs;
exports.mergeHtmlProps = mergeHtmlProps;
exports.mergeHtmlEvents = mergeHtmlEvents;
exports.mergeHtmlSlots = mergeHtmlSlots;
exports.mergeCssParts = mergeCssParts;
exports.mergeCssProperties = mergeCssProperties;
exports.mergeHtmlTags = mergeHtmlTags;
const ts_simple_type_1 = require("ts-simple-type");
const constants_js_1 = require("../../constants.js");
const iterable_util_js_1 = require("../../util/iterable-util.js");
function isHtmlMember(target) {
    return "kind" in target;
}
function isHtmlAttr(target) {
    return isHtmlMember(target) && target.kind === "attribute";
}
function isHtmlProp(target) {
    return isHtmlMember(target) && target.kind === "property";
}
function isHtmlEvent(target) {
    return !isHtmlMember(target);
}
function litAttributeModifierForTarget(target) {
    if (isHtmlAttr(target)) {
        if ((0, ts_simple_type_1.isAssignableToSimpleTypeKind)(target.getType(), "BOOLEAN")) {
            return constants_js_1.LIT_HTML_BOOLEAN_ATTRIBUTE_MODIFIER;
        }
        return "";
    }
    else if (isHtmlProp(target)) {
        return constants_js_1.LIT_HTML_PROP_ATTRIBUTE_MODIFIER;
    }
    else {
        return constants_js_1.LIT_HTML_EVENT_LISTENER_ATTRIBUTE_MODIFIER;
    }
}
function descriptionHeader(title, titleLevel = 0, { markdown }) {
    return markdown ? (titleLevel === 0 ? `**${title.trim()}**` : `${"#".repeat(titleLevel)} ${title}`) : title;
}
function descriptionListItem(item, { markdown }) {
    return markdown ? ` * ${item.replace("\n", " ")}` : ` * ${item}`;
}
function descriptionList(title, items, toString, options) {
    const itemsDesc = items.map(item => descriptionListItem(toString(item), options)).join("\n");
    return `${descriptionHeader(`${title}:`, 0, options)}\n${itemsDesc}`;
}
function documentationForCssPart(cssPart, options = {}) {
    const relatedText = (() => {
        if ((cssPart.related?.length || 0) > 0) {
            return `From multiple elements: ${cssPart.related.map(p => `<${p.fromTagName}>`).join(", ")}`;
        }
        else if (cssPart.fromTagName != null) {
            return `From: <${cssPart.fromTagName}>`;
        }
        return undefined;
    })();
    return (0, iterable_util_js_1.iterableDefined)([cssPart.description, relatedText]).join("\n\n");
}
function documentationForCssProperty(cssProperty, options = {}) {
    const relatedText = (() => {
        if ((cssProperty.related?.length || 0) > 0) {
            return `From multiple elements: ${cssProperty.related.map(p => `<${p.fromTagName}>`).join(", ")}`;
        }
        else if (cssProperty.fromTagName != null) {
            return `From: <${cssProperty.fromTagName}>`;
        }
        return undefined;
    })();
    return (0, iterable_util_js_1.iterableDefined)([cssProperty.description, cssProperty.typeHint, relatedText]).join("\n\n");
}
function documentationForHtmlTag(htmlTag, options = {}) {
    let desc = htmlTag.description || "";
    if (htmlTag.slots.length > 0) {
        const items = htmlTag.slots.sort((a, b) => a.name.localeCompare(b.name));
        desc += `\n\n${descriptionList("Slots", items, slot => `${descriptionHeader(`@slot ${slot.name}`, 0, options)}${slot.description ? ` - ${slot.description}` : ""}`, options)}`;
    }
    if (htmlTag.events.length > 0) {
        const items = htmlTag.events.sort((a, b) => a.name.localeCompare(b.name));
        desc += `\n\n${descriptionList("Events", items, event => `${descriptionHeader(`@fires ${event.name}`, 0, options)}${event.description ? ` - ${event.description}` : ""}`, options)}`;
    }
    return desc || undefined;
}
function documentationForTarget(target, options = {}) {
    const typeText = targetKindAndTypeText(target, options);
    const documentation = descriptionForTarget(target, options);
    return `${typeText}${documentation != null ? ` \n\n${documentation}` : ""}`;
}
function descriptionForTarget(target, options = {}) {
    if (target.related != null && target.related.length > 1) {
        const subDocumentation = target.related
            .map(t => `${t.fromTagName ? `<${t.fromTagName}>: ` : "(global): "}${t.description || "[no documentation]"}`)
            .map((doc, i) => `${i + 1}. ${doc}`);
        return `${descriptionHeader("Multiple declarations (best match first):", 0, options)}\n${subDocumentation.join("\n")}`;
    }
    return target.description;
}
function targetKindAndTypeText(target, options = {}) {
    const prefix = `(${targetKindText(target)}) ${options.modifier || ""}${target.name}`;
    if ((0, ts_simple_type_1.isAssignableToSimpleTypeKind)(target.getType(), "ANY")) {
        if (target.declaration?.typeHint) {
            return `${prefix}: ${target.declaration.typeHint}`;
        }
        return `${prefix}`;
    }
    return `${prefix}: ${(0, ts_simple_type_1.typeToString)(target.getType())}`;
}
function targetKindText(target) {
    if (isHtmlMember(target)) {
        return target.kind === "property" ? "property" : "attribute";
    }
    else if (isHtmlEvent(target)) {
        return "event";
    }
    return "unknown";
}
function mergeFirstUnique(items, uniqueOn) {
    const unique = new Set();
    return items.filter(item => {
        const identity = uniqueOn(item);
        if (!unique.has(identity)) {
            unique.add(identity);
            return true;
        }
        return false;
    });
}
function mergeHtmlAttrs(attrs) {
    return mergeFirstUnique(attrs, attr => attr.name);
}
function mergeHtmlProps(props) {
    return mergeFirstUnique(props, prop => prop.name);
}
function mergeHtmlEvents(events) {
    return mergeFirstUnique(events, event => event.name);
}
function mergeHtmlSlots(slots) {
    return mergeFirstUnique(slots, event => event.name);
}
function mergeCssParts(cssParts) {
    return mergeFirstUnique(cssParts, cssPart => cssPart.name);
}
function mergeCssProperties(cssProperties) {
    return mergeFirstUnique(cssProperties, cssProp => cssProp.name);
}
function mergeHtmlTags(tags) {
    const mergedTags = new Map();
    for (const tag of tags) {
        const existingTag = mergedTags.get(tag.tagName);
        if (existingTag != null) {
            mergedTags.set(tag.tagName, {
                ...tag,
                builtIn: tag.builtIn || existingTag.builtIn,
                global: tag.global || existingTag.global,
                declaration: tag.declaration || existingTag.declaration,
                description: tag.description || existingTag.description,
                attributes: mergeHtmlAttrs([...tag.attributes, ...existingTag.attributes]),
                properties: mergeHtmlProps([...tag.properties, ...existingTag.properties]),
                events: mergeHtmlEvents([...tag.events, ...existingTag.events]),
                slots: mergeHtmlSlots([...tag.slots, ...existingTag.slots])
            });
        }
        else {
            mergedTags.set(tag.tagName, tag);
        }
    }
    return Array.from(mergedTags.values());
}
//# sourceMappingURL=html-tag.js.map