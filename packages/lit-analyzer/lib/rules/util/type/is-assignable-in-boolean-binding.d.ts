import type { SimpleType } from "ts-simple-type";
import type { HtmlNodeAttr } from "../../../analyze/types/html-node/html-node-attr-types.js";
import type { RuleModuleContext } from "../../../analyze/types/rule/rule-module-context.js";
export declare function isAssignableInBooleanBinding(htmlAttr: HtmlNodeAttr, { typeA, typeB }: {
    typeA: SimpleType;
    typeB: SimpleType;
}, context: RuleModuleContext): boolean | undefined;
//# sourceMappingURL=is-assignable-in-boolean-binding.d.ts.map