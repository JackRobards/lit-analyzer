import test from "ava";
import { getTypescriptModule, isSimpleType, setTypescriptModule } from "ts-simple-type";
import * as current from "typescript";
import { isPropertyRequired } from "../src/analyze/util/ast-util";
import { analyzeText } from "../src/analyze/analyze-text";

const older: typeof current = require("typescript-5.4");

test("Alternating compilers preserve required properties and delayed constructor types", t => {
	const previous = getTypescriptModule();
	try {
		const analyses = [older, current, older, current].map(ts => {
			// Deliberately leave the other compiler selected, as an independent consumer can.
			const other = ts === older ? current : older;
			setTypescriptModule(other);
			const result = analyzeText(
				`
				class MyElement extends HTMLElement {
					required: string;
					optional: string | undefined;
					anything: any;
					constructor() {
						super();
						this.title = "hello";
						this.count = 42;
						this.enabled = true;
					}
				}
				customElements.define("my-element", MyElement);
			`,
				{ ts }
			);
			t.is(getTypescriptModule(), other);
			return { ts, checker: result.checker, members: result.results[0].componentDefinitions[0].declaration!.members };
		});

		// Evaluate only after all analyses, with the opposite global compiler each time.
		for (const { ts, checker, members } of analyses) {
			const other = ts === older ? current : older;
			setTypescriptModule(other);
			for (const [name, required] of [
				["required", true],
				["optional", false],
				["anything", false]
			] as const) {
				const member = members.find(member => member.propName === name)!;
				t.is(isPropertyRequired(member.node as current.PropertyDeclaration, checker, ts), required);
			}
			for (const [name, kind] of [
				["title", "STRING"],
				["count", "NUMBER"],
				["enabled", "BOOLEAN"]
			] as const) {
				const type = members.find(member => member.propName === name)?.type?.();
				t.truthy(type && isSimpleType(type) && type.kind === kind, `${ts.version}: ${name} is ${kind}`);
				t.is(getTypescriptModule(), other);
			}
		}
	} finally {
		setTypescriptModule(previous);
	}
});
