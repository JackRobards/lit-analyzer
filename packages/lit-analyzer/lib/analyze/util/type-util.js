"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePrimitiveArrayType = makePrimitiveArrayType;
exports.isPrimitiveArrayType = isPrimitiveArrayType;
const PRIMITIVE_STRING_ARRAY_TYPE_BRAND = Symbol("PRIMITIVE_STRING_ARRAY_TYPE");
/**
 * Brands a union as a primitive array type
 * This type is used for the "role" attribute that is a whitespace separated list
 * @param union
 */
function makePrimitiveArrayType(union) {
    const extendedUnion = {
        ...union
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extendedUnion[PRIMITIVE_STRING_ARRAY_TYPE_BRAND] = true;
    return extendedUnion;
}
/**
 * Returns if a simple type is branded as a primitive array type
 * @param simpleType
 */
function isPrimitiveArrayType(simpleType) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return simpleType.kind === "UNION" && simpleType[PRIMITIVE_STRING_ARRAY_TYPE_BRAND] === true;
}
//# sourceMappingURL=type-util.js.map