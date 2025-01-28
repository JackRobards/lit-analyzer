"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirective = getDirective;
const ts_simple_type_1 = require("ts-simple-type");
const html_node_attr_assignment_types_js_1 = require("../../../analyze/types/html-node/html-node-attr-assignment-types.js");
const general_util_js_1 = require("../../../analyze/util/general-util.js");
const remove_undefined_from_type_js_1 = require("../type/remove-undefined-from-type.js");
const is_lit_directive_js_1 = require("./is-lit-directive.js");
function getDirective(assignment, context) {
    const { ts, program } = context;
    const checker = program.getTypeChecker();
    if (assignment.kind !== html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.EXPRESSION)
        return;
    // Type check lit-html directives
    if (ts.isCallExpression(assignment.expression)) {
        const functionName = assignment.expression.expression.getText();
        const args = Array.from(assignment.expression.arguments);
        switch (functionName) {
            case "ifDefined": {
                // Example: html`<img src="${ifDefined(imageUrl)}">`;
                // Take the argument to ifDefined and remove undefined from the type union (if possible).
                // This new type becomes the actual type of the expression
                const actualType = (0, general_util_js_1.lazy)(() => {
                    if (args.length >= 1) {
                        const exprType = (0, ts_simple_type_1.toSimpleType)(checker.getTypeAtLocation(assignment.expression), checker);
                        if ((0, is_lit_directive_js_1.isLit1Directive)(exprType)) {
                            const returnType = (0, ts_simple_type_1.toSimpleType)(checker.getTypeAtLocation(args[0]), checker);
                            return (0, remove_undefined_from_type_js_1.removeUndefinedFromType)(returnType);
                        }
                        return (0, ts_simple_type_1.toSimpleType)(checker.getNonNullableType(checker.getTypeAtLocation(args[0])), checker);
                    }
                    return undefined;
                });
                return {
                    kind: "ifDefined",
                    actualType,
                    args
                };
            }
            case "live": {
                // Example: html`<input .value=${live(x)}>`
                // The actual type will be the type of the first argument to live
                const actualType = (0, general_util_js_1.lazy)(() => {
                    if (args.length >= 1) {
                        return (0, ts_simple_type_1.toSimpleType)(checker.getTypeAtLocation(args[0]), checker);
                    }
                    return undefined;
                });
                return {
                    kind: "live",
                    actualType,
                    args
                };
            }
            case "guard": {
                // Example: html`<img src="${guard([imageUrl], () => Math.random() > 0.5 ? imageUrl : "nothing.png")}>`;
                // The return type of the function becomes the actual type of the expression
                const actualType = (0, general_util_js_1.lazy)(() => {
                    if (args.length >= 2) {
                        let returnFunctionType = (0, ts_simple_type_1.toSimpleType)(checker.getTypeAtLocation(args[1]), checker);
                        if ("call" in returnFunctionType && returnFunctionType.call != null) {
                            returnFunctionType = returnFunctionType.call;
                        }
                        if (returnFunctionType.kind === "FUNCTION") {
                            return returnFunctionType.returnType;
                        }
                    }
                    return undefined;
                });
                return {
                    kind: "guard",
                    actualType,
                    args
                };
            }
            case "classMap":
            case "styleMap":
                return {
                    kind: functionName,
                    actualType: () => ({ kind: "STRING" }),
                    args
                };
            case "unsafeHTML":
            case "unsafeSVG":
            case "cache":
            case "repeat":
            case "templateContent":
            case "asyncReplace":
            case "asyncAppend":
                return {
                    kind: functionName,
                    args
                };
            default:
                // Grab the type of the expression and get a SimpleType
                if (assignment.kind === html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.EXPRESSION) {
                    const typeB = (0, ts_simple_type_1.toSimpleType)(checker.getTypeAtLocation(assignment.expression), checker);
                    if ((0, is_lit_directive_js_1.isLitDirective)(typeB)) {
                        // Factories can mark which parameters might be assigned to the property with the generic type in DirectiveFn<T>
                        // Here we get the actual type of the directive if the it is a generic directive with type. Example: DirectiveFn<string>
                        // Read more: https://github.com/Polymer/lit-html/pull/1151
                        const actualType = typeB.kind === "GENERIC_ARGUMENTS" && typeB.target.name === "DirectiveFn" && typeB.typeArguments.length > 0 // && typeB.typeArguments[0].kind !== "UNKNOWN"
                            ? () => typeB.typeArguments[0]
                            : undefined;
                        // Now we have an unknown (user defined) directive.
                        return {
                            kind: {
                                name: functionName
                            },
                            args,
                            actualType
                        };
                    }
                }
        }
    }
    return;
}
//# sourceMappingURL=get-directive.js.map