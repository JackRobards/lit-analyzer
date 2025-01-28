"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayFlat = arrayFlat;
exports.arrayDefined = arrayDefined;
exports.joinArray = joinArray;
/**
 * Flattens an array.
 * Use this function to keep support for node 10
 * @param items
 */
function arrayFlat(items) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ("flat" in items) {
        return items.flat();
    }
    const flattenArray = [];
    for (const item of items) {
        if (Array.isArray(item)) {
            flattenArray.push(...item);
        }
        else {
            flattenArray.push(item);
        }
    }
    return flattenArray;
}
/**
 * Filters an array returning only defined items
 * @param array
 */
function arrayDefined(array) {
    return array.filter((item) => item != null);
}
/**
 * Joins an array with a custom final splitter
 * @param items
 * @param splitter
 * @param finalSplitter
 */
function joinArray(items, splitter = ", ", finalSplitter = "or") {
    return items.join(splitter).replace(/, ([^,]*)$/, ` ${finalSplitter} $1`);
}
//# sourceMappingURL=array-util.js.map