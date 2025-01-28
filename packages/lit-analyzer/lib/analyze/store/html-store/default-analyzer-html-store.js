"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAnalyzerHtmlStore = void 0;
const html_node_attr_types_js_1 = require("../../types/html-node/html-node-attr-types.js");
const html_data_source_merged_js_1 = require("./html-data-source-merged.js");
class DefaultAnalyzerHtmlStore {
    dataSource = new html_data_source_merged_js_1.HtmlDataSourceMerged();
    absorbSubclassExtension(name, extension) {
        this.dataSource.absorbSubclassExtension(name, extension);
    }
    absorbCollection(collection, register) {
        this.dataSource.absorbCollection(collection, register);
    }
    forgetCollection(collection, register) {
        this.dataSource.forgetCollection(collection, register);
    }
    getHtmlTag(htmlNode) {
        return this.dataSource.getHtmlTag(typeof htmlNode === "string" ? htmlNode : htmlNode.tagName);
    }
    getGlobalTags() {
        return this.dataSource.globalTags.values();
    }
    getAllAttributesForTag(htmlNode) {
        return this.dataSource.getAllAttributesForTag(typeof htmlNode === "string" ? htmlNode : htmlNode.tagName).values();
    }
    getAllPropertiesForTag(htmlNode) {
        return this.dataSource.getAllPropertiesForTag(typeof htmlNode === "string" ? htmlNode : htmlNode.tagName).values();
    }
    getAllEventsForTag(htmlNode) {
        return this.dataSource.getAllEventsForTag(typeof htmlNode === "string" ? htmlNode : htmlNode.tagName).values();
    }
    getAllSlotsForTag(htmlNode) {
        return this.dataSource.getAllSlotForTag(typeof htmlNode === "string" ? htmlNode : htmlNode.tagName).values();
    }
    getAllCssPartsForTag(htmlNode) {
        return this.dataSource.getAllCssPartsForTag(typeof htmlNode === "string" ? htmlNode : htmlNode.tagName).values();
    }
    getAllCssPropertiesForTag(htmlNode) {
        return this.dataSource.getAllCssPropertiesForTag(typeof htmlNode === "string" ? htmlNode : htmlNode.tagName).values();
    }
    getHtmlAttrTarget(htmlNodeAttr) {
        const name = htmlNodeAttr.name.toLowerCase();
        switch (htmlNodeAttr.kind) {
            case html_node_attr_types_js_1.HtmlNodeAttrKind.EVENT_LISTENER:
                return this.dataSource.getAllEventsForTag(htmlNodeAttr.htmlNode.tagName).get(name);
            case html_node_attr_types_js_1.HtmlNodeAttrKind.BOOLEAN_ATTRIBUTE:
            case html_node_attr_types_js_1.HtmlNodeAttrKind.ATTRIBUTE:
                return this.dataSource.getAllAttributesForTag(htmlNodeAttr.htmlNode.tagName).get(name);
            case html_node_attr_types_js_1.HtmlNodeAttrKind.PROPERTY:
                return this.dataSource.getAllPropertiesForTag(htmlNodeAttr.htmlNode.tagName).get(name);
        }
    }
}
exports.DefaultAnalyzerHtmlStore = DefaultAnalyzerHtmlStore;
//# sourceMappingURL=default-analyzer-html-store.js.map