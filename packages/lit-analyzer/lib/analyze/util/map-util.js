"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapMerge = mapMerge;
exports.mapMap = mapMap;
exports.arrayToMap = arrayToMap;
function mapMerge(...maps) {
    return new Map((function* () {
        for (const map of maps) {
            if (Array.isArray(map)) {
                for (const m of map) {
                    yield* m;
                }
            }
            else {
                yield* map;
            }
        }
    })());
}
function mapMap(map, callback) {
    return new Map((function* () {
        for (const [key, val] of map.entries()) {
            yield [key, callback(key, val)];
        }
    })());
}
function arrayToMap(array, callback) {
    return new Map((function* () {
        for (const val of array) {
            yield [callback(val), val];
        }
    })());
}
//# sourceMappingURL=map-util.js.map