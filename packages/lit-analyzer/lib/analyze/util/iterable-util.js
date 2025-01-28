"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterableFlatten = iterableFlatten;
exports.iterableMap = iterableMap;
exports.iterableFilter = iterableFilter;
exports.iterableFind = iterableFind;
exports.iterableUnique = iterableUnique;
exports.iterableDefined = iterableDefined;
exports.iterableFirst = iterableFirst;
function* iterableFlatten(...iterables) {
    for (const iterable of iterables) {
        for (const item of iterable) {
            yield item;
        }
    }
}
function* iterableMap(iterable, map) {
    for (const item of iterable) {
        yield map(item);
    }
}
function* iterableFilter(iterable, filter) {
    for (const item of iterable) {
        if (filter(item)) {
            yield item;
        }
    }
}
function iterableFind(iterable, match) {
    for (const item of iterable) {
        if (match(item)) {
            return item;
        }
    }
    return;
}
function* iterableUnique(iterable, on) {
    const unique = new Set();
    for (const item of iterable) {
        const u = on(item);
        if (!unique.has(u)) {
            unique.add(u);
            yield item;
        }
    }
}
function iterableDefined(iterable) {
    return iterable.filter((i) => i != null);
}
function iterableFirst(iterable) {
    if (iterable == null) {
        return iterable;
    }
    if (iterable instanceof Map || iterable instanceof Set) {
        return iterableFirst(iterable.values());
    }
    return iterable.next().value;
}
//# sourceMappingURL=iterable-util.js.map