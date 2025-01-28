/* eslint-disable @typescript-eslint/no-explicit-any */
import { dashToCamelCase } from "./util.mjs";
/**
 * Parses CLI arguments.
 * @param args
 */
export function parseCliArguments(args) {
    const result = { _: [] };
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        // Parses: "--key", "-k", "--key=value", "--key value"
        if (arg.startsWith("-")) {
            // Parses: "--key=value"
            if (arg.includes("=")) {
                const [key, value] = arg.split("=");
                assignValue(result, key, value);
            }
            // Parses: "--key value", "--key", "-k
            else {
                const key = transformKey(arg);
                // Parses: "--key value"
                if (i < args.length - 1) {
                    const value = args[i + 1];
                    if (!value.startsWith("-")) {
                        assignValue(result, key, value);
                        i++;
                        continue;
                    }
                }
                // Parses: "--key", "-k"
                assignValue(result, key, true);
            }
        }
        // Parses: "arg1", "arg2", ...
        else {
            result._.push(arg);
        }
    }
    return result;
}
/**
 * Transform a string to a primitive type.
 * @param value
 */
function transformValue(value) {
    if (typeof value === "boolean") {
        return value;
    }
    else if (!isNaN(Number(value))) {
        return Number(value);
    }
    else if (value === "true" || value === "false") {
        return value === "true";
    }
    return value;
}
/**
 * Transform a key by removing the first "-" characters.
 * @param key
 */
function transformKey(key) {
    return dashToCamelCase(key.replace(/^-*/g, ""));
}
/**
 * Assigns a value on a specific key and transforms the value at the same time.
 * @param obj
 * @param key
 * @param value
 */
function assignValue(obj, key, value) {
    // The key could be "nested.key"
    const keys = transformKey(key).split(".");
    keys.forEach((k, i) => {
        // Assign the final value
        if (i >= keys.length - 1) {
            obj[k] = transformValue(value);
        }
        // Create nested objects
        else {
            if (!(k in obj)) {
                obj[k] = {};
            }
            obj = obj[k];
        }
    });
}
//# sourceMappingURL=parse-cli-arguments.mjs.map