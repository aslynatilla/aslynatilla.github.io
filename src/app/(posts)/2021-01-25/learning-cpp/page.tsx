import * as Content from "./content.mdx";

export function data() {
	return Content.metadata;
}

export function page() {
	return <Content.default />;
}
