"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractBindingTypes = extractBindingTypes;
exports.inferTypeFromAssignment = inferTypeFromAssignment;
exports.relaxType = relaxType;
const ts_simple_type_1 = require("ts-simple-type");
const html_node_attr_assignment_types_js_1 = require("../../../analyze/types/html-node/html-node-attr-assignment-types.js");
const html_node_attr_types_js_1 = require("../../../analyze/types/html-node/html-node-attr-types.js");
const get_directive_js_1 = require("../directive/get-directive.js");
const cache = new WeakMap();
function extractBindingTypes(assignment, context) {
    if (cache.has(assignment)) {
        return cache.get(assignment);
    }
    const checker = context.program.getTypeChecker();
    // Relax the type we are looking at an expression in javascript files
    //const inJavascriptFile = request.file.fileName.endsWith(".js");
    //const shouldRelaxTypeB = 1 !== 1 && inJavascriptFile && assignment.kind === HtmlNodeAttrAssignmentKind.EXPRESSION;
    const shouldRelaxTypeB = false; // Disable for now while collecting requirements
    // Infer the type of the RHS
    //const typeBInferred = shouldRelaxTypeB ? ({ kind: "ANY" } as SimpleType) : inferTypeFromAssignment(assignment, checker);
    const typeBInferred = inferTypeFromAssignment(assignment, checker);
    // Convert typeB to SimpleType
    let typeB = (() => {
        const type = (0, ts_simple_type_1.isSimpleType)(typeBInferred) ? typeBInferred : (0, ts_simple_type_1.toSimpleType)(typeBInferred, checker);
        return shouldRelaxTypeB ? relaxType(type) : type;
    })();
    // Find a corresponding target for this attribute
    const htmlAttrTarget = context.htmlStore.getHtmlAttrTarget(assignment.htmlAttr);
    //if (htmlAttrTarget == null) return [];
    const typeA = htmlAttrTarget == null ? { kind: "ANY" } : htmlAttrTarget.getType();
    // Handle directives
    const directive = (0, get_directive_js_1.getDirective)(assignment, context);
    const directiveType = directive?.actualType?.();
    if (directiveType != null) {
        typeB = directiveType;
    }
    // Handle `nothing` and `noChange` symbols
    // Since it's not possible to check the details of a symbol due to various restrictions (it's treated as a `unique symbol` or `Symbol()`), all symbols are excluded.
    typeB = excludeSymbolsFromUnion(typeB);
    // Cache the result
    const result = { typeA, typeB };
    cache.set(assignment, result);
    return result;
}
function inferTypeFromAssignment(assignment, checker) {
    switch (assignment.kind) {
        case html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.STRING:
            return { kind: "STRING_LITERAL", value: assignment.value };
        case html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.BOOLEAN:
            return { kind: "BOOLEAN_LITERAL", value: true };
        case html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.ELEMENT_EXPRESSION:
            return checker.getTypeAtLocation(assignment.expression);
        case html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.EXPRESSION:
            return checker.getTypeAtLocation(assignment.expression);
        case html_node_attr_assignment_types_js_1.HtmlNodeAttrAssignmentKind.MIXED:
            // Event bindings always looks at the first expression
            // Therefore, return the type of the first expression
            if (assignment.htmlAttr.kind === html_node_attr_types_js_1.HtmlNodeAttrKind.EVENT_LISTENER) {
                const expression = assignment.values.find((val) => typeof val !== "string");
                if (expression != null) {
                    return checker.getTypeAtLocation(expression);
                }
            }
            return { kind: "STRING" };
    }
}
function excludeSymbolsFromUnion(type) {
    if (type.kind !== "UNION") {
        return type;
    }
    return {
        ...type,
        types: type.types.filter(t => t.kind !== "ES_SYMBOL" && t.kind !== "ES_SYMBOL_UNIQUE")
    };
}
/**
 * Relax the type so that for example "string literal" become "string" and "function" become "any"
 * This is used for javascript files to provide type checking with Typescript type inferring
 * @param type
 */
function relaxType(type) {
    switch (type.kind) {
        case "INTERSECTION":
        case "UNION":
            return {
                ...type,
                types: type.types.map(t => relaxType(t))
            };
        case "ENUM":
            return {
                ...type,
                types: type.types.map(t => relaxType(t))
            };
        case "ARRAY":
            return {
                ...type,
                type: relaxType(type.type)
            };
        case "PROMISE":
            return {
                ...type,
                type: relaxType(type.type)
            };
        case "INTERFACE":
        case "OBJECT":
        case "FUNCTION":
        case "CLASS":
            return {
                kind: "ANY"
            };
        case "NUMBER_LITERAL":
            return { kind: "NUMBER" };
        case "STRING_LITERAL":
            return { kind: "STRING" };
        case "BOOLEAN_LITERAL":
            return { kind: "BOOLEAN" };
        case "BIG_INT_LITERAL":
            return { kind: "BIG_INT" };
        case "ENUM_MEMBER":
            return {
                ...type,
                type: relaxType(type.type)
            };
        case "ALIAS":
            return {
                ...type,
                target: relaxType(type.target)
            };
        default:
            return type;
    }
}
//# sourceMappingURL=extract-binding-types.js.map