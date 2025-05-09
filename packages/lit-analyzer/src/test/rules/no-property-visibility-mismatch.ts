import { getDiagnostics } from "../helpers/analyze.js";
import { hasDiagnostic, hasNoDiagnostics } from "../helpers/assert.js";
import { tsTest } from "../helpers/ts-test.js";
import type { TestFile } from "../helpers/compile-files.js";
import { makeElement } from "../helpers/generate-test-file.js";

function makeTestElement({ properties }: { properties?: Array<{ visibility: string; name: string; internal: boolean }> }): TestFile {
	return {
		fileName: "my-element.ts",
		text: `
		class MyElement extends HTMElement {
			${(properties || []).map(({ name, visibility, internal }) => `@${internal ? "state" : "property"}() ${visibility} ${name}: any;`).join("\n")}
		};
		customElements.define("my-element", MyElement);
		`
	};
}

tsTest("Report public @state properties", t => {
	const { diagnostics } = getDiagnostics(
		makeTestElement({
			properties: [{ name: "foo", visibility: "public", internal: true }]
		}),
		{
			rules: { "no-property-visibility-mismatch": true }
		}
	);
	hasDiagnostic(t, diagnostics, "no-property-visibility-mismatch");
});

tsTest("Report private @property properties", t => {
	const { diagnostics } = getDiagnostics(
		makeTestElement({
			properties: [{ name: "foo", visibility: "private", internal: false }]
		}),
		{
			rules: { "no-property-visibility-mismatch": true }
		}
	);
	hasDiagnostic(t, diagnostics, "no-property-visibility-mismatch");
});

tsTest("Don't report regular public properties", t => {
	const { diagnostics } = getDiagnostics(
		makeTestElement({
			properties: [{ name: "foo", visibility: "public", internal: false }]
		}),
		{
			rules: { "no-property-visibility-mismatch": true }
		}
	);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Don't report private @property properties with `state` true", t => {
	const { diagnostics } = getDiagnostics(
		[
			makeElement({
				properties: [
					`@property({ state: true })
					private foo: string;`
				],
				fullPropertyDeclaration: true
			})
		],
		{
			rules: {
				"no-property-visibility-mismatch": true
			}
		}
	);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Don't report @state properties with '#' prefix", t => {
	const { diagnostics } = getDiagnostics(
		makeTestElement({
			properties: [{ name: "#foo", visibility: "", internal: true }]
		}),
		{
			rules: {
				"no-property-visibility-mismatch": true
			}
		}
	);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Report @property properties with '#' prefix", t => {
	const { diagnostics } = getDiagnostics(
		makeTestElement({
			properties: [{ name: "#foo", visibility: "", internal: false }]
		}),
		{
			rules: {
				"no-property-visibility-mismatch": true
			}
		}
	);
	hasDiagnostic(t, diagnostics, "no-property-visibility-mismatch");
});
