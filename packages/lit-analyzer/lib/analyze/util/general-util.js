"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLitAttrName = parseLitAttrName;
exports.lazy = lazy;
/**
 * Parses an attribute name returning a name and eg. a modifier.
 * Examples:
 *  - ?disabled="..."
 *  - .myProp="..."
 *  - @click="..."
 * @param attributeName
 */
function parseLitAttrName(attributeName) {
    const [, modifier, name] = attributeName.match(/^([.?@])?(.*)/) || ["", "", ""];
    return { name, modifier: modifier };
}
function lazy(func) {
    let called = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((...args) => {
        if (called)
            return value;
        called = true;
        return (value = func(...args));
    });
}
//# sourceMappingURL=general-util.js.map