import { getDiagnostics } from "../helpers/analyze.js";
import { hasDiagnostic, hasNoDiagnostics } from "../helpers/assert.js";
import { tsTest } from "../helpers/ts-test.js";

tsTest("Event binding: Callable value is bindable", t => {
	const { diagnostics } = getDiagnostics('html`<input @change="${() => {}}" />`');
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: Non callback value is not bindable", t => {
	const { diagnostics } = getDiagnostics('html`<input @change="${(():void => {})()}" />`');
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: Number is not bindable", t => {
	const { diagnostics } = getDiagnostics('html`<input @change="${123}" />`');
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: Function is bindable", t => {
	const { diagnostics } = getDiagnostics('function foo() {}; html`<input @change="${foo}" />`');
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: Function with property is bindable", t => {
	const { diagnostics } = getDiagnostics('const foo = Object.assign(() => {}, {passive: true}); html`<input @change="${foo}" />`');
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: lodash-style debounced function intersections are bindable", t => {
	const { diagnostics } = getDiagnostics(`
type DebouncedFunc<T extends (...args: any[]) => any> = T & { cancel(): void };
declare const debounced: DebouncedFunc<(event: Event) => void>;
html\`<input @change="\${debounced}" />\`;
`);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: callable objects with control methods are bindable", t => {
	const { diagnostics } = getDiagnostics(`
type Callable = { (event: Event): void; cancel(): void };
declare const callable: Callable;
html\`<input @change="\${callable}" />\`;
`);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: an unconstrained generic intersection is not assumed callable", t => {
	const { diagnostics } = getDiagnostics(`
function render<T>() {
		const value = null as T & { cancel(): void };
		html\`<input @change="\${value}" />\`;
}
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: non-callable objects with control methods are not bindable", t => {
	const { diagnostics } = getDiagnostics(`
type NonCallable = { cancel(): void };
declare const value: NonCallable;
html\`<input @change="\${value}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: Called function is not bindable", t => {
	const { diagnostics } = getDiagnostics('function foo() {}; html`<input @change="${foo()}" />`');
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: Any type is bindable", t => {
	const { diagnostics } = getDiagnostics('html`<input @change="${{} as any}" />`');
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: Object with callable 'handleEvent' is bindable 1", t => {
	const { diagnostics } = getDiagnostics('html`<input @change="${{handleEvent: () => {}}}" />`');
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: Object with callable 'handleEvent' is bindable 2", t => {
	const { diagnostics } = getDiagnostics('function foo() {}; html`<input @change="${{handleEvent: foo}}" />`');
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: optional 'handleEvent' is not a callable event listener", t => {
	const { diagnostics } = getDiagnostics(`
declare const value: { handleEvent?: (event: Event) => void };
html\`<input @change="\${value}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: Object with called 'handleEvent' is not bindable", t => {
	const { diagnostics } = getDiagnostics('function foo() {}; html`<input @change="${{handleEvent: foo()}}" />`');
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: Object literal without 'handleEvent' is not bindable", t => {
	const { diagnostics } = getDiagnostics('function foo() {}; html`<input @change="${{foo: "bar"}}" />`');
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: Mixed value binding with first expression being callable is bindable", t => {
	const { diagnostics } = getDiagnostics('html`<input @change="foo${console.log}bar" />`');
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: Optional function is bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: ((event: Event) => void) | undefined;
html\`<input @change="\${handler}" />\`;
`);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: Conditional expression yielding a function or undefined is bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: (event: Event) => void;
declare const condition: boolean;
html\`<input @change="\${condition ? handler : undefined}" />\`;
`);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: Union of functions is bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: ((event: Event) => void) | ((event: CustomEvent) => void);
html\`<input @change="\${handler}" />\`;
`);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: Union without any callable member is not bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const value: string | number;
html\`<input @change="\${value}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: Undefined alone is not bindable", t => {
	const { diagnostics } = getDiagnostics('html`<input @change="${undefined}" />`');
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: nullable function is bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: ((event: Event) => void) | null;
html\`<input @change="\${handler}" />\`;
`);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: optional nullable function is bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: ((event: Event) => void) | null | undefined;
html\`<input @change="\${handler}" />\`;
`);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: optional listener object is bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: { handleEvent(event: Event): void } | null | undefined;
html\`<input @change="\${handler}" />\`;
`);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: function or string is not bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: (() => void) | string;
html\`<input @change="\${handler}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: optional function or number is not bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: (() => void) | number | undefined;
html\`<input @change="\${handler}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: function or non-listener object is not bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: (() => void) | { cancel(): void };
html\`<input @change="\${handler}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: listener object or string is not bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: { handleEvent(): void } | string;
html\`<input @change="\${handler}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: null is not bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: null;
html\`<input @change="\${handler}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: nullish union is not bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: null | undefined;
html\`<input @change="\${handler}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: unknown is bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: unknown;
html\`<input @change="\${handler}" />\`;
`);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: nullable handleEvent is not bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: { handleEvent: (() => void) | null };
html\`<input @change="\${handler}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: undefined handleEvent is not bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: { handleEvent: (() => void) | undefined };
html\`<input @change="\${handler}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: mixed handleEvent is not bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: { handleEvent: (() => void) | string };
html\`<input @change="\${handler}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: nested listener object is not bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: { handleEvent: { handleEvent(): void } };
html\`<input @change="\${handler}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: intersected handleEvent is bindable", t => {
	const { diagnostics } = getDiagnostics(`
declare const handler: { handleEvent: (() => void) & { cancel(): void } };
html\`<input @change="\${handler}" />\`;
`);
	hasNoDiagnostics(t, diagnostics);
});

for (const [name, declaration] of [
	["constrained function", "function render<T extends () => void>(handler: T) {"],
	["nullable constrained function", "function render<T extends (() => void) | undefined>(handler: T) {"],
	["constrained listener object", "function render<T extends { handleEvent(): void }>(handler: T) {"],
	["constrained callable intersection", "function render<T extends () => void>(handler: T & { cancel(): void }) {"],
	["generic listener alias", "type Listener<T> = { handleEvent: T }; function render(handler: Listener<() => void>) {"],
	["generic listener interface", "interface Listener<T> { handleEvent: T }; function render(handler: Listener<() => void>) {"],
	["optional generic listener", "interface Listener<T> { handleEvent: T }; function render(handler: Listener<() => void> | undefined) {"],
	[
		"generic listener with nothing",
		"declare const nothing: unique symbol; interface Listener<T> { handleEvent: T }; function render(handler: Listener<() => void> | typeof nothing) {"
	]
]) {
	tsTest(`Event binding: ${name} is bindable`, t => {
		const { diagnostics } = getDiagnostics(declaration + 'html`<input @change="${handler}" />`; }');
		hasNoDiagnostics(t, diagnostics);
	});
}

for (const [name, handlerType, accepted] of [
	["generic listener", "Listener<() => void>", true],
	["generic listener with nothing/noChange", "Listener<() => void> | typeof nothing | typeof noChange", true],
	["string value", "string", false],
	["mixed generic listener", "Listener<(() => void) | string>", false],
	["generic handleEvent with nothing", "Listener<(() => void) | typeof nothing>", false],
	["nullable generic handleEvent", "Listener<(() => void) | undefined>", false]
] as const) {
	for (const directive of ["guard", "alias directive", "interface directive"]) {
		tsTest(`Event binding: ${directive} preserves ${name} callability`, t => {
			const { diagnostics } = getDiagnostics(`
interface Listener<T> { handleEvent: T }
interface Part { setValue(value: unknown): void }
${directive === "interface directive" ? "interface DirectiveFn<T> { (part: Part): void; value?: T }" : "type DirectiveFn<T> = ((part: Part) => void) & { value?: T };"}
declare function customDirective<T>(value: T): DirectiveFn<T>;
declare function guard(dependencies: unknown[], callback: () => unknown): unknown;
declare const nothing: unique symbol;
declare const noChange: unique symbol;
declare const handler: ${handlerType};
html\`<input @change="\${${directive === "guard" ? "guard([], () => handler)" : "customDirective(handler)"}}" />\`;
`);
			if (accepted) {
				hasNoDiagnostics(t, diagnostics);
			} else {
				hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
			}
		});
	}
}

tsTest("Event binding: guard preserves callable generic constraints", t => {
	const { diagnostics } = getDiagnostics(`
declare function guard(dependencies: unknown[], callback: () => unknown): unknown;
function render<T extends () => void>(handler: T) {
	html\`<input @change="\${guard([], () => handler)}" />\`;
}
`);
	hasNoDiagnostics(t, diagnostics);
});

tsTest("Event binding: standalone symbols are not listeners", t => {
	const { diagnostics } = getDiagnostics(`
declare const nothing: unique symbol;
html\`<input @change="\${nothing}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

tsTest("Event binding: a directive's raw any type does not override its projected value", t => {
	const { diagnostics } = getDiagnostics(`
declare function classMap(value: unknown): any;
html\`<input @change="\${classMap({ active: true })}" />\`;
`);
	hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
});

for (const [name, declaration] of [
	["mixed generic constraint", "function render<T extends (() => void) | string>(handler: T) {"],
	["mixed generic listener", "interface Listener<T> { handleEvent: T }; function render(handler: Listener<(() => void) | string>) {"],
	["nullable generic handleEvent", "interface Listener<T> { handleEvent: T }; function render(handler: Listener<(() => void) | null>) {"],
	["optional generic handleEvent", "interface Listener<T> { handleEvent?: T }; function render(handler: Listener<() => void>) {"],
	["nested generic listener", "interface Listener<T> { handleEvent: T }; function render(handler: Listener<Listener<() => void>>) {"]
]) {
	tsTest(`Event binding: ${name} is not bindable`, t => {
		const { diagnostics } = getDiagnostics(declaration + 'html`<input @change="${handler}" />`; }');
		hasDiagnostic(t, diagnostics, "no-noncallable-event-binding");
	});
}
