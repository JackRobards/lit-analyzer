"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlDataSource = void 0;
class HtmlDataSource {
    _globalTags = new Map();
    get globalTags() {
        return this._globalTags;
    }
    _globalAttributes = new Map();
    get globalAttributes() {
        return this._globalAttributes;
    }
    _globalEvents = new Map();
    get globalEvents() {
        return this._globalEvents;
    }
    _globalProperties = new Map();
    get globalProperties() {
        return this._globalProperties;
    }
    _globalSlots = new Map();
    get globalSlots() {
        return this._globalSlots;
    }
    _globalCssParts = new Map();
    get globalCssParts() {
        return this._globalCssParts;
    }
    _globalCssProperties = new Map();
    get globalCssProperties() {
        return this._globalCssProperties;
    }
    absorbCollection(collection) {
        if (collection.tags != null) {
            // For now, lowercase all names because "parse5" doesn't distinguish when parsing
            collection.tags.forEach(tag => this._globalTags.set(tag.tagName.toLowerCase(), tag));
        }
        if (collection.global?.attributes != null) {
            // For now, lowercase all names because "parse5" doesn't distinguish when parsing
            collection.global.attributes.forEach(attr => this._globalAttributes.set(attr.name.toLowerCase(), attr));
        }
        if (collection.global?.events != null) {
            // For now, lowercase all names because "parse5" doesn't distinguish when parsing
            collection.global.events.forEach(evt => this._globalEvents.set(evt.name.toLowerCase(), evt));
        }
        if (collection.global?.properties != null) {
            // For now, lowercase all names because "parse5" doesn't distinguish when parsing
            collection.global.properties.forEach(prop => this._globalProperties.set(prop.name.toLowerCase(), prop));
        }
        if (collection.global?.slots != null) {
            // For now, lowercase all names because "parse5" doesn't distinguish when parsing
            collection.global.slots.forEach(slot => this._globalSlots.set(slot.name.toLowerCase(), slot));
        }
        if (collection.global?.cssParts != null) {
            // For now, lowercase all names because "parse5" doesn't distinguish when parsing
            collection.global.cssParts.forEach(cssPart => this._globalCssParts.set(cssPart.name.toLowerCase(), cssPart));
        }
        if (collection.global?.cssProperties != null) {
            // For now, lowercase all names because "parse5" doesn't distinguish when parsing
            collection.global.cssProperties.forEach(cssProperty => this._globalCssProperties.set(cssProperty.name.toLowerCase(), cssProperty));
        }
    }
    forgetCollection({ tags, global: { events, attributes, slots, properties, cssParts, cssProperties } }) {
        if (tags != null)
            tags.forEach(tagName => this._globalTags.delete(tagName.toLowerCase()));
        if (events != null)
            events.forEach(eventName => this._globalEvents.delete(eventName.toLowerCase()));
        if (attributes != null)
            attributes.forEach(attrName => this._globalAttributes.delete(attrName.toLowerCase()));
        if (properties != null)
            properties.forEach(propName => this._globalProperties.delete(propName.toLowerCase()));
        if (slots != null)
            slots.forEach(slotName => this._globalSlots.delete(slotName.toLowerCase()));
        if (cssParts != null)
            cssParts.forEach(partName => this._globalCssParts.delete(partName.toLowerCase()));
        if (cssProperties != null)
            cssProperties.forEach(cssPropName => this._globalCssProperties.delete(cssPropName.toLowerCase()));
    }
    getGlobalTag(tagName) {
        return this._globalTags.get(tagName.toLowerCase());
    }
    getGlobalAttribute(attrName) {
        return this._globalAttributes.get(attrName.toLowerCase());
    }
    getGlobalEvent(eventName) {
        return this._globalEvents.get(eventName.toLowerCase());
    }
    getGlobalProperty(propName) {
        return this._globalProperties.get(propName.toLowerCase());
    }
    getGlobalSlot(slotName) {
        return this._globalSlots.get(slotName.toLowerCase());
    }
    getGlobalCssPart(partName) {
        return this._globalCssParts.get(partName.toLowerCase());
    }
    getGlobalCssProperty(propName) {
        return this._globalCssProperties.get(propName.toLowerCase());
    }
}
exports.HtmlDataSource = HtmlDataSource;
//# sourceMappingURL=html-data-source.js.map