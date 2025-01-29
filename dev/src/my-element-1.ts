import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./my-element-2";

@customElement("my-element")
export class MyElement extends LitElement {
	@property({ attribute: "hell>o" }) test: number | undefined;

	@property({ type: Date }) private test2: number | undefined;

	@state() internal: number | undefined;

	static get observedAttributes() {
		return ["this is a test", "testing"];
	}

	render() {
		return html`
			<my-tsconfig-element size="large"></my-tsconfig-element>
			<unknown-element @heheheh="${() => {}}" globalattribute></unknown-element>
			<heheheh></heheheh>
			<my-element2>
				<div slot=""></div>
				<div slot="right"></div>
			</my-element2>
			<my-element></my-element>
			<input @hehehehe="${() => {}}" />
			<my-element></my-element>
			<my-element></my-element>
			<my-element></my-element>
			<my-element2 .foo="${"bar"}"></my-element2>
		`;
	}
}
