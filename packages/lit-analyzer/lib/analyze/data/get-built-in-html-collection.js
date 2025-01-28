"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuiltInHtmlCollection = getBuiltInHtmlCollection;
const browsers_html_data_json_1 = __importDefault(require("@vscode/web-custom-data/data/browsers.html-data.json"));
const parse_vscode_html_data_js_1 = require("../parse/parse-html-data/parse-vscode-html-data.js");
const general_util_js_1 = require("../util/general-util.js");
const extra_html_data_js_1 = require("./extra-html-data.js");
function getBuiltInHtmlCollection() {
    const vscodeHtmlData = browsers_html_data_json_1.default;
    const version = vscodeHtmlData.version;
    const globalAttributes = [...(vscodeHtmlData.globalAttributes ?? [])];
    // Modify valueSets
    const valueSets = (vscodeHtmlData.valueSets || []).map(valueSet => {
        // It seems like the autocompletion value map for <select>, <textarea> and <input> needs "on" and "off" values
        if (valueSet.name === "inputautocomplete") {
            return {
                ...valueSet,
                values: [{ name: "on" }, { name: "off" }, ...valueSet.values]
            };
        }
        return valueSet;
    });
    // Modify tags
    const tags = (vscodeHtmlData.tags || []).map(tag => {
        switch (tag.name) {
            case "audio":
                return {
                    ...tag,
                    attributes: [
                        ...tag.attributes,
                        {
                            name: "controlslist",
                            description: ""
                        }
                    ]
                };
            case "video":
                return {
                    ...tag,
                    attributes: [
                        ...tag.attributes,
                        {
                            name: "controlslist",
                            description: ""
                        },
                        {
                            name: "disablepictureinpicture",
                            valueSet: "v" // "v" is the undocumented boolean type
                        },
                        {
                            name: "playsinline",
                            description: 'The playsinline attribute is a boolean attribute. If present, it serves as a hint to the user agent that the video ought to be displayed "inline" in the document by default, constrained to the element\'s playback area, instead of being displayed fullscreen or in an independent resizable window.',
                            valueSet: "v" // "v" is the undocumented boolean type
                        }
                    ]
                };
        }
        return tag;
    });
    // Add missing html tags
    tags.push({
        name: "svg",
        attributes: []
    }, {
        name: "slot",
        description: "",
        attributes: [
            {
                name: "name",
                description: ""
            },
            {
                name: "onslotchange",
                description: "The slotchange event is fired on an HTMLSlotElement instance (<slot> element) when the node(s) contained in that slot change.\n\nNote: the slotchange event doesn't fire if the children of a slotted node change — only if you change (e.g. add or delete) the actual nodes themselves."
            }
        ]
    });
    // Add missing global attributes
    globalAttributes.push(
    // Combine data with extra html5 events because vscode-html-language-service hasn't included all events yet.
    ...extra_html_data_js_1.EXTRA_HTML5_EVENTS.filter(evt => globalAttributes.some(existingEvt => existingEvt.name === evt.name)), {
        name: "tabindex",
        description: ""
    }, {
        name: "slot",
        description: ""
    }, {
        name: "part",
        description: `This attribute specifies a "styleable" part on the element in your shadow tree.`
    }, {
        name: "theme",
        description: `This attribute specifies a global "styleable" part on the element.`
    }, {
        name: "exportparts",
        description: `This attribute is used to explicitly forward a child’s part to be styleable outside of the parent’s shadow tree.

The value must be a comma-separated list of part mappings:
  - "some-box, some-input"
  - "some-input: foo-input"
`
    });
    // Parse vscode html data
    const result = (0, parse_vscode_html_data_js_1.parseVscodeHtmlData)({
        version,
        globalAttributes,
        tags,
        valueSets
    }, {
        builtIn: true
    });
    // Add missing properties to the result, because they are not included in vscode html data
    for (const tag of result.tags) {
        switch (tag.tagName) {
            case "textarea":
                tag.properties.push({
                    kind: "property",
                    name: "value",
                    builtIn: true,
                    fromTagName: "textarea",
                    getType: (0, general_util_js_1.lazy)(() => ({
                        kind: "UNION",
                        types: [{ kind: "STRING" }, { kind: "NULL" }]
                    }))
                });
                break;
            case "img":
                tag.attributes.push({
                    kind: "attribute",
                    name: "loading",
                    builtIn: true,
                    fromTagName: "img",
                    getType: (0, general_util_js_1.lazy)(() => ({
                        kind: "UNION",
                        types: [
                            {
                                kind: "STRING_LITERAL",
                                value: "lazy"
                            },
                            {
                                kind: "STRING_LITERAL",
                                value: "auto"
                            },
                            { kind: "STRING_LITERAL", value: "eager" }
                        ]
                    }))
                });
                break;
            case "input":
                tag.properties.push({
                    kind: "property",
                    name: "value",
                    builtIn: true,
                    fromTagName: "input",
                    getType: (0, general_util_js_1.lazy)(() => ({
                        kind: "UNION",
                        types: [{ kind: "STRING" }, { kind: "NULL" }]
                    }))
                });
                break;
        }
    }
    // Add missing global properties to the result
    result.global.properties = [
        ...(result.global.properties || []),
        {
            builtIn: true,
            description: `This attribute specifies a "styleable" part on the element in your shadow tree.`,
            getType: () => ({ kind: "STRING" }),
            kind: "property",
            name: "part"
        }
    ];
    return {
        ...result,
        tags: result.tags.map(tag => ({
            ...tag,
            builtIn: true,
            attributes: addMissingAttrTypes(tag.attributes.map(attr => ({ ...attr, builtIn: true })))
        })),
        global: {
            ...result.global,
            attributes: addMissingAttrTypes(result.global.attributes?.map(attr => ({ ...attr, builtIn: true })) || []),
            events: result.global.events?.map(event => ({ ...event, builtIn: true }))
        }
    };
}
function addMissingAttrTypes(attrs) {
    return attrs.map(attr => {
        if ((0, extra_html_data_js_1.hasTypeForAttrName)(attr.name) || attr.getType().kind === "ANY") {
            const newType = (0, extra_html_data_js_1.html5TagAttrType)(attr.name);
            return {
                ...attr,
                getType: (0, general_util_js_1.lazy)(() => newType)
            };
        }
        return attr;
    });
}
//# sourceMappingURL=get-built-in-html-collection.js.map