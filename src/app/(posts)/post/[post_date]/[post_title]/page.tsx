import { POST_REPOSITORY, get_posts } from "@/app/lib/filesystem_utils";
import { PostFrontmatter } from "@/model/post";

import { readFileSync } from "fs";

import {
	MDXRemote,
	MDXRemoteSerializeResult,
	compileMDX,
} from "next-mdx-remote/rsc";

import { join } from "path";

export const dynamic = "force-static";
export const dynamicParams = false;

type PostStaticParams = {
	post_date: string;
	post_title: string;
};

export async function generateStaticParams() {
	const posts = get_posts();

	const results = await Promise.allSettled(
		posts
			.map((post): string => {
				return readFileSync(post, "utf8");
			})
			.map(async (file: string): Promise<PostStaticParams> => {
				const { content, frontmatter } = await compileMDX<PostFrontmatter>({
					source: file,
					options: { parseFrontmatter: true },
				});

				return {
					post_date: frontmatter.date,
					post_title: frontmatter.repo_folder,
				};
			}),
	);

	return results.map((result) => result);
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
	});

	return <>{frontmatter.title}</>;
}
