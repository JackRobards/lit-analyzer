"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAssignableToType = isAssignableToType;
const ts_simple_type_1 = require("ts-simple-type");
function isAssignableToType({ typeA, typeB }, context, options) {
    const inJsFile = context.file.fileName.endsWith(".js");
    const expandedOptions = {
        ...(inJsFile ? { strict: false } : {}),
        options: context.ts,
        ...(options || {})
    };
    return (0, ts_simple_type_1.isAssignableToType)(typeA, typeB, context.program, expandedOptions);
}
//# sourceMappingURL=is-assignable-to-type.js.map