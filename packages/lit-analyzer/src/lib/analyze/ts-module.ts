import { setTypescriptModule as tsSimpleTypeSetTypescriptModule } from "@jackolope/ts-simple-type";
import * as tsModuleType from "typescript";

export const tsModule: { ts: typeof tsModuleType } = { ts: tsModuleType };

export function setTypescriptModule(newModule: typeof tsModuleType): void {
	tsModule.ts = newModule;

	tsSimpleTypeSetTypescriptModule(newModule);
}
