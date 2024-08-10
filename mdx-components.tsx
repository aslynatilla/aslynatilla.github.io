import "src/app/globals.css";
import TextParagraph from "@/app/components/text_paragraph";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,

		p: ({ children }) => {
			return (
				<TextParagraph
					text={children as string}
					classes="text-gray-300 text-justify"
				/>
			);
		},

		ul: ({ children }) => {
			const ul_class = "py-2 mx-2";
			if (Array.isArray(children)) {
				return <ul className={ul_class}>{...children}</ul>;
			}
			return <ul className={ul_class}>{children}</ul>;
		},

		li: ({ children }) => {
			const li_classes = "list-disc list-inside m-0 mr-2 text-sm text-gray-300";
			if (Array.isArray(children)) {
				return <li className={li_classes}>{...children}</li>;
			}
			return <li className={li_classes}>{children}</li>;
		},

		a: ({ href, children: child }) => {
			return (
				<a
					href={href}
					className="text-[#ffcc00] hover:bg-gradient-to-r 
					hover:from-[#ffcc00] hover:via-yellow-200 hover:to-[#ffcc00]
					hover:text-transparent hover:bg-clip-text hover:via-10%"
				>
					{child}
				</a>
			);
		},

		h2: ({ children }) => {
			const h2_classes = "ms-2 py-1 text-[#eebb00]";
			if (Array.isArray(children)) {
				return <h2 className={h2_classes}>({...children})</h2>;
			}
			return <h2 className={h2_classes}>{children}</h2>;
		},
	};
}
