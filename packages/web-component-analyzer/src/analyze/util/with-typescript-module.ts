import { getTypescriptModule, setTypescriptModule } from "ts-simple-type";
import type * as tsModule from "typescript";

/** Use the compiler that owns the native types, including in delayed callbacks. */
export function withTypescriptModule<T>(ts: typeof tsModule, callback: () => T): T {
	const previous = getTypescriptModule();
	setTypescriptModule(ts);
	try {
		return callback();
	} finally {
		setTypescriptModule(previous);
	}
}
