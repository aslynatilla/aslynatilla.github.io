import TextParagraph from "@/app/components/text_paragraph";

import { MDXComponents } from "mdx/types";

export function Paragraph() {
	return {
		p: ({ children }: MDXComponents) => {
			return (
				<TextParagraph
					text={children as string}
					classes="text-base text-gray-300 text-justify"
				/>
			);
		},
	};
}
