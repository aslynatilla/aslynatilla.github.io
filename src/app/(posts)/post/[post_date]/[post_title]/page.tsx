import { POST_REPOSITORY, get_posts } from "@/app/lib/filesystem_utils";
import { PostFrontmatter } from "@/model/post";

import { readFileSync } from "fs";

import {
	MDXRemote,
	MDXRemoteSerializeResult,
	compileMDX,
} from "next-mdx-remote/rsc";

import { join } from "path";

// TEMPORARILY
import TextParagraph from "@/app/components/text_paragraph";
import TitleContainer from "@/app/components/TitleContainer";
import FirstLevelHeader from "@/app/components/FirstLevelHeader";
import RemarkOnHeader from "@/app/components/RemarkOnHeader";

// export const dynamic = "force-static";
// export const dynamicParams = false;

type PostStaticParams = {
	post_date: string;
	post_title: string;
};

// export async function generateStaticParams() {
export function generateStaticParams() {
	// const posts = get_posts();

	// const results = await Promise.allSettled(
	// 	posts
	// 		.map((post): string => {
	// 			return readFileSync(post, "utf8");
	// 		})
	// 		.map(async (file: string): Promise<PostStaticParams> => {
	// 			const { content, frontmatter } = await compileMDX<PostFrontmatter>({
	// 				source: file,
	// 				options: { parseFrontmatter: true },
	// 			});

	// 			return {
	// 				post_date: frontmatter.date,
	// 				post_title: frontmatter.repo_folder,
	// 			};
	// 		}),
	// );

	// return results.map((result) => result);
	return [{ post_date: "2021-01-25", post_title: "learning-cpp" }];
}

export default async function Page({
	params,
}: {
	params: { post_date: string; post_title: string };
}) {
	const { post_date, post_title } = params;
	const file = readFileSync(
		join(POST_REPOSITORY, post_date, post_title, "content.mdx"),
		"utf8",
	);
	const { content, frontmatter } = await compileMDX<PostFrontmatter>({
		source: file,
		options: { parseFrontmatter: true },
		components: {
			p: ({ children }) => {
				return (
					<TextParagraph
						text={children as string}
						classes="text-base text-gray-300 text-justify"
					/>
				);
			},

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

			TitleContainer: TitleContainer,
			FirstLevelHeader: FirstLevelHeader,
			RemarkOnHeader: RemarkOnHeader,
		},
	});

	return (
		<>
			<div className="text-3xl font-semibold text-amber-500">
				{frontmatter.title}
			</div>
			{content}
		</>
	);
}
