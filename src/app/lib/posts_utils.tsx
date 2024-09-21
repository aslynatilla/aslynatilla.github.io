import { PostComponentsMap } from "@/app/lib/types/posts_utils";
import { Paragraph } from "@/app/components/styled_for_posts/paragraph";

export const POST_PREVIEW_PER_PAGE = 3;

export function get_post_pages_amount(posts: string[]) {
	const pages_amount = Math.floor(posts.length / POST_PREVIEW_PER_PAGE) + 1;
	return pages_amount;
}

export function get_post_components_map(): PostComponentsMap {
	return (
		Paragraph() && {
			ul: ({ children }) => {
				const ul_class = "text-base py-2 mx-2";
				if (Array.isArray(children)) {
					return <ul className={ul_class}>{...children}</ul>;
				}
				return <ul className={ul_class}>{children}</ul>;
			},

			li: ({ children }) => {
				const li_classes =
					"text-base list-disc list-inside m-0 mr-2 text-sm text-gray-300";
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
				const h2_classes = "text-xl ms-2 py-1 text-[#eebb00]";
				if (Array.isArray(children)) {
					return <h2 className={h2_classes}>({...children})</h2>;
				}
				return <h2 className={h2_classes}>{children}</h2>;
			},
		}
	);
}
