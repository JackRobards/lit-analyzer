"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlDataSourceMerged = exports.HtmlDataSourceKind = void 0;
const html_tag_js_1 = require("../../parse/parse-html-data/html-tag.js");
const general_util_js_1 = require("../../util/general-util.js");
const iterable_util_js_1 = require("../../util/iterable-util.js");
const html_data_source_js_1 = require("./html-data-source.js");
var HtmlDataSourceKind;
(function (HtmlDataSourceKind) {
    HtmlDataSourceKind[HtmlDataSourceKind["DECLARED"] = 0] = "DECLARED";
    HtmlDataSourceKind[HtmlDataSourceKind["USER"] = 1] = "USER";
    HtmlDataSourceKind[HtmlDataSourceKind["BUILT_IN"] = 2] = "BUILT_IN";
    HtmlDataSourceKind[HtmlDataSourceKind["BUILT_IN_DECLARED"] = 3] = "BUILT_IN_DECLARED";
})(HtmlDataSourceKind || (exports.HtmlDataSourceKind = HtmlDataSourceKind = {}));
class HtmlDataSourceMerged {
    subclassExtensions = new Map();
    htmlDataSources = (() => {
        const array = [];
        array[HtmlDataSourceKind.BUILT_IN] = new html_data_source_js_1.HtmlDataSource();
        array[HtmlDataSourceKind.BUILT_IN_DECLARED] = new html_data_source_js_1.HtmlDataSource();
        array[HtmlDataSourceKind.USER] = new html_data_source_js_1.HtmlDataSource();
        array[HtmlDataSourceKind.DECLARED] = new html_data_source_js_1.HtmlDataSource();
        return array;
    })();
    combinedHtmlDataSource = new html_data_source_js_1.HtmlDataSource();
    relatedForTagName = {
        attrs: new Map(),
        events: new Map(),
        slots: new Map(),
        props: new Map(),
        cssParts: new Map(),
        cssProperties: new Map()
    };
    get globalTags() {
        return this.combinedHtmlDataSource.globalTags;
    }
    invalidateCache(collection) {
        const { tags, global: { attributes, events, cssParts } } = collection;
        if (tags && tags.length > 0) {
            const allCaches = Object.values(this.relatedForTagName);
            for (const tagName of tags) {
                // Clear caches for the tag name
                for (const map of allCaches) {
                    map.delete(tagName);
                }
                // "events", "css parts" and "css custom properties" are all considered "global" when returning matches
                // Therefore we clear all caches if any invalidated tag included those
                const tag = this.getHtmlTag(tagName);
                if (tag != null) {
                    if ((tag.events.length || 0) > 0) {
                        this.relatedForTagName.events.clear();
                    }
                    if ((tag.cssParts.length || 0) > 0) {
                        this.relatedForTagName.cssParts.clear();
                    }
                    if ((tag.cssProperties.length || 0) > 0) {
                        this.relatedForTagName.cssProperties.clear();
                    }
                }
            }
        }
        if (attributes && attributes.length > 0) {
            this.relatedForTagName.attrs.clear();
        }
        if (events && events.length > 0) {
            this.relatedForTagName.events.clear();
        }
        if (cssParts && cssParts.length > 0) {
            this.relatedForTagName.cssParts.clear();
        }
    }
    mergeDataSourcesAndInvalidate(collection) {
        const { tags, global: { events, attributes, properties, slots, cssParts, cssProperties } } = collection;
        this.invalidateCache(collection);
        if (tags != null) {
            for (const tagName of tags) {
                const allTags = (0, iterable_util_js_1.iterableDefined)(this.htmlDataSources.map(r => r.getGlobalTag(tagName)));
                if (allTags.length > 0) {
                    const mergedTags = allTags.length === 1 ? allTags : (0, html_tag_js_1.mergeHtmlTags)(allTags);
                    this.combinedHtmlDataSource.absorbCollection({ tags: mergedTags });
                }
            }
        }
        if (attributes != null) {
            for (const attrName of attributes) {
                const allAttrs = (0, iterable_util_js_1.iterableDefined)(this.htmlDataSources.map(r => r.getGlobalAttribute(attrName)));
                if (allAttrs.length > 0) {
                    const mergedAttrs = allAttrs.length === 1 ? allAttrs : (0, html_tag_js_1.mergeHtmlAttrs)(allAttrs);
                    this.combinedHtmlDataSource.absorbCollection({ global: { attributes: mergedAttrs } });
                }
            }
        }
        if (events != null) {
            for (const eventName of events) {
                const allEvents = (0, iterable_util_js_1.iterableDefined)(this.htmlDataSources.map(r => r.getGlobalEvent(eventName)));
                if (allEvents.length > 0) {
                    const mergedEvents = allEvents.length === 1 ? allEvents : (0, html_tag_js_1.mergeHtmlEvents)(allEvents);
                    this.combinedHtmlDataSource.absorbCollection({ global: { events: mergedEvents } });
                }
            }
        }
        if (properties != null) {
            for (const propName of properties) {
                const allProps = (0, iterable_util_js_1.iterableDefined)(this.htmlDataSources.map(r => r.getGlobalProperty(propName)));
                if (allProps.length > 0) {
                    const mergedProps = allProps.length === 1 ? allProps : (0, html_tag_js_1.mergeHtmlProps)(allProps);
                    this.combinedHtmlDataSource.absorbCollection({ global: { properties: mergedProps } });
                }
            }
        }
        if (slots != null) {
            for (const slotName of slots) {
                const allSlots = (0, iterable_util_js_1.iterableDefined)(this.htmlDataSources.map(r => r.getGlobalSlot(slotName)));
                if (allSlots.length > 0) {
                    const mergedSlots = allSlots.length === 1 ? allSlots : (0, html_tag_js_1.mergeHtmlSlots)(allSlots);
                    this.combinedHtmlDataSource.absorbCollection({ global: { slots: mergedSlots } });
                }
            }
        }
        if (cssProperties != null) {
            for (const cssPartName of cssProperties) {
                const allCssProps = (0, iterable_util_js_1.iterableDefined)(this.htmlDataSources.map(r => r.getGlobalCssProperty(cssPartName)));
                if (allCssProps.length > 0) {
                    const mergedCssProps = allCssProps.length === 1 ? allCssProps : (0, html_tag_js_1.mergeCssProperties)(allCssProps);
                    this.combinedHtmlDataSource.absorbCollection({ global: { cssProperties: mergedCssProps } });
                }
            }
        }
        if (cssParts != null) {
            for (const cssPartName of cssParts) {
                const allCssParts = (0, iterable_util_js_1.iterableDefined)(this.htmlDataSources.map(r => r.getGlobalCssPart(cssPartName)));
                if (allCssParts.length > 0) {
                    const mergedCssParts = allCssParts.length === 1 ? allCssParts : (0, html_tag_js_1.mergeCssParts)(allCssParts);
                    this.combinedHtmlDataSource.absorbCollection({ global: { cssParts: mergedCssParts } });
                }
            }
        }
    }
    forgetCollection(collection, dataSource) {
        if (dataSource == null) {
            this.htmlDataSources.forEach(ds => ds.forgetCollection(collection));
        }
        else {
            this.htmlDataSources[dataSource].forgetCollection(collection);
        }
        this.mergeDataSourcesAndInvalidate(collection);
        this.combinedHtmlDataSource.forgetCollection(collection);
    }
    absorbCollection(collection, register) {
        this.htmlDataSources[register].absorbCollection(collection);
        this.mergeDataSourcesAndInvalidate({
            tags: collection.tags.map(t => t.tagName),
            global: {
                events: collection.global?.events?.map(t => t.name),
                attributes: collection.global?.attributes?.map(a => a.name),
                properties: collection.global?.properties?.map(p => p.name),
                slots: collection.global?.slots?.map(s => s.name),
                cssParts: collection.global?.cssParts?.map(s => s.name),
                cssProperties: collection.global?.cssProperties?.map(s => s.name)
            }
        });
    }
    getHtmlTag(tagName) {
        return this.combinedHtmlDataSource.getGlobalTag(tagName);
    }
    absorbSubclassExtension(name, extension) {
        this.subclassExtensions.set(name, extension);
    }
    getSubclassExtensions(tagName) {
        // Right now, always return "HTMLElement" subclass extension
        const extension = this.subclassExtensions.get("HTMLElement");
        return extension != null ? [extension] : [];
    }
    getAllAttributesForTag(tagName) {
        if (!this.relatedForTagName.attrs.has(tagName)) {
            this.relatedForTagName.attrs.set(tagName, mergeRelatedMembers(this.iterateAllAttributesForNode(tagName)));
        }
        return this.relatedForTagName.attrs.get(tagName);
    }
    getAllPropertiesForTag(tagName) {
        if (!this.relatedForTagName.props.has(tagName)) {
            this.relatedForTagName.props.set(tagName, mergeRelatedMembers(this.iterateAllPropertiesForNode(tagName)));
        }
        return this.relatedForTagName.props.get(tagName);
    }
    getAllEventsForTag(tagName) {
        if (!this.relatedForTagName.events.has(tagName)) {
            this.relatedForTagName.events.set(tagName, mergeRelatedEvents(this.iterateAllEventsForNode(tagName)));
        }
        return this.relatedForTagName.events.get(tagName);
    }
    getAllSlotForTag(tagName) {
        if (!this.relatedForTagName.slots.has(tagName)) {
            this.relatedForTagName.slots.set(tagName, mergeRelatedSlots(this.iterateAllSlotsForNode(tagName)));
        }
        return this.relatedForTagName.slots.get(tagName);
    }
    getAllCssPartsForTag(tagName) {
        if (!this.relatedForTagName.cssParts.has(tagName)) {
            this.relatedForTagName.cssParts.set(tagName, mergeRelatedCssParts(this.iterateAllCssPartsForNode(tagName)));
        }
        return this.relatedForTagName.cssParts.get(tagName);
    }
    getAllCssPropertiesForTag(tagName) {
        if (!this.relatedForTagName.cssProperties.has(tagName)) {
            this.relatedForTagName.cssProperties.set(tagName, mergeRelatedCssProperties(this.iterateAllCssPropertiesForNode(tagName)));
        }
        return this.relatedForTagName.cssProperties.get(tagName);
    }
    iterateGlobalAttributes() {
        return this.combinedHtmlDataSource.globalAttributes.values();
    }
    iterateGlobalEvents() {
        return this.combinedHtmlDataSource.globalEvents.values();
    }
    iterateGlobalProperties() {
        return this.combinedHtmlDataSource.globalProperties.values();
    }
    iterateGlobalSlots() {
        return this.combinedHtmlDataSource.globalSlots.values();
    }
    iterateGlobalCssParts() {
        return this.combinedHtmlDataSource.globalCssParts.values();
    }
    iterateGlobalCssProperties() {
        return this.combinedHtmlDataSource.globalCssProperties.values();
    }
    *iterateAllPropertiesForNode(tagName) {
        // Html tag properties
        const htmlTag = this.getHtmlTag(tagName);
        if (htmlTag != null)
            yield* htmlTag.properties;
        // Extension properties
        const extensions = this.getSubclassExtensions(tagName);
        for (const extTag of extensions) {
            yield* extTag.properties;
        }
        // Global propertjes
        yield* this.iterateGlobalProperties();
    }
    *iterateAllEventsForNode(tagName) {
        // Html tag events
        const htmlTag = this.getHtmlTag(tagName);
        if (htmlTag != null)
            yield* htmlTag.events;
        // Extension events
        const extensions = this.getSubclassExtensions(tagName);
        for (const extTag of extensions) {
            yield* extTag.events;
        }
        // All events on other tags (because they bubble)
        if (htmlTag == null || htmlTag.events.length === 0) {
            for (const tag of this.globalTags.values()) {
                if (tag.tagName !== tagName) {
                    yield* tag.events;
                }
            }
            // Global events
            yield* this.iterateGlobalEvents();
        }
        else {
            // If we emitted some events from the main html tag, don't emit these events again
            const eventNameSet = new Set(htmlTag.events.map(e => e.name));
            for (const tag of this.globalTags.values()) {
                if (tag.tagName !== tagName) {
                    for (const evt of tag.events) {
                        if (!eventNameSet.has(evt.name)) {
                            yield evt;
                        }
                    }
                }
            }
            // Global events
            for (const evt of this.iterateGlobalEvents()) {
                if (!eventNameSet.has(evt.name)) {
                    yield evt;
                }
            }
        }
    }
    *iterateAllAttributesForNode(tagName) {
        // Html tag attributes
        const htmlTag = this.getHtmlTag(tagName);
        if (htmlTag != null)
            yield* htmlTag.attributes;
        // Extension attributes
        const extensions = this.getSubclassExtensions(tagName);
        for (const extTag of extensions) {
            yield* extTag.attributes;
        }
        // Global attributes
        yield* this.iterateGlobalAttributes();
    }
    *iterateAllSlotsForNode(tagName) {
        // Html tag attributes
        const htmlTag = this.getHtmlTag(tagName);
        if (htmlTag != null)
            yield* htmlTag.slots;
        // Extension attributes
        const extensions = this.getSubclassExtensions(tagName);
        for (const extTag of extensions) {
            yield* extTag.slots;
        }
        // Global slots
        yield* this.iterateGlobalSlots();
    }
    *iterateAllCssPartsForNode(tagName) {
        if (tagName === "") {
            // Iterate all css parts for all tags if no tag name has been given
            for (const tag of this.combinedHtmlDataSource.globalTags.values()) {
                yield* tag.cssParts;
            }
        }
        else {
            const htmlTag = this.getHtmlTag(tagName);
            if (htmlTag != null)
                yield* htmlTag.cssParts;
        }
        // Extension attributes
        const extensions = this.getSubclassExtensions(tagName);
        for (const extTag of extensions) {
            yield* extTag.cssParts;
        }
        // Global slots
        yield* this.iterateGlobalCssParts();
    }
    *iterateAllCssPropertiesForNode(tagName) {
        if (tagName === "") {
            // Iterate all css custom properties for all tags
            for (const tag of this.combinedHtmlDataSource.globalTags.values()) {
                yield* tag.cssProperties;
            }
        }
        else {
            const htmlTag = this.getHtmlTag(tagName);
            if (htmlTag != null)
                yield* htmlTag.cssProperties;
        }
        // Extension attributes
        const extensions = this.getSubclassExtensions(tagName);
        for (const extTag of extensions) {
            yield* extTag.cssProperties;
        }
        // Global slots
        yield* this.iterateGlobalCssProperties();
    }
}
exports.HtmlDataSourceMerged = HtmlDataSourceMerged;
function mergeRelatedMembers(members) {
    const mergedMembers = new Map();
    for (const member of members) {
        // For now, lowercase all names because "parse5" doesn't distinguish between uppercase and lowercase
        const name = member.name.toLowerCase();
        const existingMember = mergedMembers.get(name);
        if (existingMember == null) {
            mergedMembers.set(name, member);
        }
        else {
            const prevType = existingMember.getType;
            mergedMembers.set(name, {
                ...existingMember,
                description: undefined,
                required: existingMember.required && member.required,
                builtIn: existingMember.required && member.required,
                fromTagName: existingMember.fromTagName || member.fromTagName,
                getType: (0, general_util_js_1.lazy)(() => mergeRelatedTypeToUnion(prevType(), member.getType())),
                related: existingMember.related == null ? [existingMember, member] : [...existingMember.related, member]
            });
        }
    }
    return mergedMembers;
}
function mergeRelatedTypeToUnion(typeA, typeB) {
    if (typeA.kind === typeB.kind) {
        switch (typeA.kind) {
            case "ANY":
                return typeA;
        }
    }
    switch (typeA.kind) {
        case "UNION":
            if (typeB.kind === "ANY" && typeA.types.find(t => t.kind === "ANY") != null) {
                return typeA;
            }
            else {
                return {
                    ...typeA,
                    types: [...typeA.types, typeB]
                };
            }
    }
    return {
        kind: "UNION",
        types: [typeA, typeB]
    };
}
function mergeNamedRelated(items) {
    const merged = new Map();
    for (const item of items) {
        // For now, lowercase all names because "parse5" doesn't distinguish between uppercase and lowercase
        const name = item.name.toLowerCase();
        const existingItem = merged.get(name);
        if (existingItem != null) {
            merged.set(name, {
                ...item,
                related: existingItem.related == null ? [existingItem, item] : [existingItem.related, item]
            });
        }
        else {
            merged.set(name, item);
        }
    }
    return merged;
}
function mergeRelatedSlots(slots) {
    return mergeNamedRelated(slots);
}
function mergeRelatedCssParts(cssParts) {
    return mergeNamedRelated(cssParts);
}
function mergeRelatedCssProperties(cssProperties) {
    return mergeNamedRelated(cssProperties);
}
function mergeRelatedEvents(events) {
    const mergedAttrs = new Map();
    for (const event of events) {
        // For now, lowercase all names because "parse5" doesn't distinguish between uppercase and lowercase
        const name = event.name.toLowerCase();
        const existingEvent = mergedAttrs.get(name);
        if (existingEvent == null) {
            mergedAttrs.set(name, event);
        }
        else {
            const prevType = existingEvent.getType;
            mergedAttrs.set(name, {
                ...existingEvent,
                global: existingEvent.global && event.global,
                description: undefined,
                getType: (0, general_util_js_1.lazy)(() => mergeRelatedTypeToUnion(prevType(), event.getType())),
                related: existingEvent.related == null ? [existingEvent, event] : [...existingEvent.related, event],
                fromTagName: existingEvent.fromTagName || event.fromTagName
            });
        }
    }
    return mergedAttrs;
}
//# sourceMappingURL=html-data-source-merged.js.map