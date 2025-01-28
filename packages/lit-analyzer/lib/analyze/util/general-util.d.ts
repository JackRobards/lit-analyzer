import type { LitHtmlAttributeModifier } from "../constants.js";
export type Newable<T> = {
    new (...args: any[]): T;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/**
 * Parses an attribute name returning a name and eg. a modifier.
 * Examples:
 *  - ?disabled="..."
 *  - .myProp="..."
 *  - @click="..."
 * @param attributeName
 */
export declare function parseLitAttrName(attributeName: string): {
    name: string;
    modifier?: LitHtmlAttributeModifier;
};
export declare function lazy<T extends (...args: unknown[]) => unknown>(func: T): T;
//# sourceMappingURL=general-util.d.ts.map