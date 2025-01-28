"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUndefinedFromType = removeUndefinedFromType;
const ts_simple_type_1 = require("ts-simple-type");
function removeUndefinedFromType(type) {
    switch (type.kind) {
        case "ALIAS":
            return {
                ...type,
                target: removeUndefinedFromType(type.target)
            };
        case "UNION":
            return {
                ...type,
                types: type.types.filter(t => !(0, ts_simple_type_1.isAssignableToSimpleTypeKind)(t, "UNDEFINED"))
            };
    }
    return type;
}
//# sourceMappingURL=remove-undefined-from-type.js.map