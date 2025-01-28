"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completionsForHtmlAttrs = completionsForHtmlAttrs;
const ts_simple_type_1 = require("ts-simple-type");
const constants_js_1 = require("../../../constants.js");
const html_tag_js_1 = require("../../../parse/parse-html-data/html-tag.js");
const iterable_util_js_1 = require("../../../util/iterable-util.js");
const general_util_js_1 = require("../../../util/general-util.js");
function completionsForHtmlAttrs(htmlNode, location, { htmlStore }) {
    const onTagName = htmlNode.tagName;
    // Code completions for ".[...]";
    if (location.word.startsWith(constants_js_1.LIT_HTML_PROP_ATTRIBUTE_MODIFIER)) {
        const alreadyUsedPropNames = htmlNode.attributes.filter(a => a.modifier === constants_js_1.LIT_HTML_PROP_ATTRIBUTE_MODIFIER).map(a => a.name);
        const unusedProps = (0, iterable_util_js_1.iterableFilter)(htmlStore.getAllPropertiesForTag(htmlNode), prop => !alreadyUsedPropNames.includes(prop.name));
        return Array.from((0, iterable_util_js_1.iterableMap)(unusedProps, prop => targetToCompletion(prop, {
            modifier: constants_js_1.LIT_HTML_PROP_ATTRIBUTE_MODIFIER,
            onTagName
        })));
    }
    // Code completions for "?[...]";
    else if (location.word.startsWith(constants_js_1.LIT_HTML_BOOLEAN_ATTRIBUTE_MODIFIER)) {
        const alreadyUsedAttrNames = htmlNode.attributes
            .filter(a => a.modifier === constants_js_1.LIT_HTML_BOOLEAN_ATTRIBUTE_MODIFIER || a.modifier == null)
            .map(a => a.name);
        const unusedAttrs = (0, iterable_util_js_1.iterableFilter)(htmlStore.getAllAttributesForTag(htmlNode), prop => !alreadyUsedAttrNames.includes(prop.name));
        const booleanAttributes = (0, iterable_util_js_1.iterableFilter)(unusedAttrs, prop => isAssignableToBoolean(prop.getType()));
        return Array.from((0, iterable_util_js_1.iterableMap)(booleanAttributes, attr => targetToCompletion(attr, {
            modifier: constants_js_1.LIT_HTML_BOOLEAN_ATTRIBUTE_MODIFIER,
            onTagName
        })));
    }
    // Code completions for "@[...]";
    else if (location.word.startsWith(constants_js_1.LIT_HTML_EVENT_LISTENER_ATTRIBUTE_MODIFIER)) {
        const alreadyUsedEventNames = htmlNode.attributes.filter(a => a.modifier === constants_js_1.LIT_HTML_EVENT_LISTENER_ATTRIBUTE_MODIFIER).map(a => a.name);
        const unusedEvents = (0, iterable_util_js_1.iterableFilter)(htmlStore.getAllEventsForTag(htmlNode), prop => !alreadyUsedEventNames.includes(prop.name));
        return Array.from((0, iterable_util_js_1.iterableMap)(unusedEvents, prop => targetToCompletion(prop, {
            modifier: constants_js_1.LIT_HTML_EVENT_LISTENER_ATTRIBUTE_MODIFIER,
            onTagName
        })));
    }
    const alreadyUsedAttrNames = htmlNode.attributes.filter(a => a.modifier == null).map(a => a.name);
    const unusedAttrs = (0, iterable_util_js_1.iterableFilter)(htmlStore.getAllAttributesForTag(htmlNode), prop => !alreadyUsedAttrNames.includes(prop.name));
    return Array.from((0, iterable_util_js_1.iterableMap)(unusedAttrs, prop => targetToCompletion(prop, { modifier: "", onTagName })));
}
function isAssignableToBoolean(type, { matchAny } = { matchAny: true }) {
    return (0, ts_simple_type_1.isAssignableToSimpleTypeKind)(type, ["BOOLEAN", "BOOLEAN_LITERAL"], {
        matchAny
    });
}
function targetToCompletion(target, { modifier, insertModifier, onTagName }) {
    if (modifier == null) {
        if ((0, html_tag_js_1.isHtmlAttr)(target)) {
            if (isAssignableToBoolean(target.getType(), { matchAny: false })) {
                modifier = constants_js_1.LIT_HTML_BOOLEAN_ATTRIBUTE_MODIFIER;
            }
            else {
                modifier = "";
            }
        }
        else if ((0, html_tag_js_1.isHtmlProp)(target)) {
            modifier = constants_js_1.LIT_HTML_PROP_ATTRIBUTE_MODIFIER;
        }
        else if ((0, html_tag_js_1.isHtmlEvent)(target)) {
            modifier = constants_js_1.LIT_HTML_EVENT_LISTENER_ATTRIBUTE_MODIFIER;
        }
    }
    const isMember = onTagName && target.fromTagName === onTagName;
    const isBuiltIn = target.builtIn;
    return {
        name: `${modifier || ""}${target.name}${"required" in target && target.required ? "!" : ""}`,
        insert: `${insertModifier ? modifier : ""}${target.name}`,
        kind: isBuiltIn ? "enumElement" : isMember ? "member" : "label",
        importance: isBuiltIn ? "low" : isMember ? "high" : "medium",
        documentation: (0, general_util_js_1.lazy)(() => (0, html_tag_js_1.documentationForTarget)(target, { modifier }))
    };
}
//# sourceMappingURL=completions-for-html-attrs.js.map