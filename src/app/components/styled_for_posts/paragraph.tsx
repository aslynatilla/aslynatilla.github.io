import TextParagraph from "@/app/components/text_paragraph";

import { MDXComponents } from "mdx/types";

export function TypedParagraph<T extends JSX.Element>() {
	return ({ children }: MDXComponents): T => {
		return (
			<TextParagraph
				text={children as string}
				classes="text-base text-gray-300 text-justify"
			/>
		) as T;
	};
}

export function Paragraph() {
	return {
		p: TypedParagraph(),
	};
}
