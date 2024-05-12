import { POST_REPOSITORY, get_posts } from "@/app/lib/filesystem_utils";

import { readFileSync } from "fs";

import {
	MDXRemote,
	MDXRemoteSerializeResult,
	compileMDX,
} from "next-mdx-remote/rsc";
import path from "path";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
	const posts = get_posts();

	const results = await Promise.allSettled(
		posts
			.map((post) => {
				return readFileSync(
					post,
					// path.join("database", slug as string, (slug + ".mdx") as string),
					"utf8",
				);
			})
			.map(async (file: string) => {
				const { content, frontmatter } = await compileMDX<{
					date: string;
					title: string;
					excerpt: string;
				}>({ source: file, options: { parseFrontmatter: true } });

				return {
					blogdate: frontmatter.date,
					blogtitle: frontmatter.title,
				};
			}),
	);

	return results.map((result) => result);
}

export default async function Page({
	params,
}: {
	params: {
		blogdate: string;
		blogtitle: string;
	};
}) {
	const { blogdate, blogtitle } = params;

	const file = readFileSync(
		path.join(POST_REPOSITORY, blogdate, blogtitle, "content.mdx"),
		"utf8",
	);
	const { content, frontmatter } = await compileMDX<{
		date: string;
		title: string;
		excerpt: string;
	}>({ source: file, options: { parseFrontmatter: true } });

	return <>{blogdate}</>;
}
