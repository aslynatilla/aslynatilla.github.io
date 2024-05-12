import { get_posts } from "@/app/lib/filesystem_utils";
import { POST_PREVIEW_PER_PAGE } from "@/app/lib/posts_utils";
import { parse, sep as path_separator } from "path";
import { readFileSync } from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import PreviewedPostLink from "@/app/components/previewed_post_link";

export const dynamic = "force-static";

function LastPostsHeader({
	header_block_classes,
}: { header_block_classes: string }) {
	const PARAGRAPH_STYLING =
		"fixed left-0 top-0 flex w-full justify-center border-b border-gray-400 bg-gradient-to-b from-zinc-900 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30";
	return (
		<div className={header_block_classes}>
			<p className={PARAGRAPH_STYLING}># Latest posts</p>
		</div>
	);
}

export default function Home() {
	const posts = get_posts();

	const POSTS_HEADER_CLASSES =
		"z-10 max-w-5xl w-full items-center justify-between text-3xl lg:flex";
	const POSTS_LIST_CONTAINER_CLASSES =
		"flex flex-col text-center max-h-max lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left gap-y-4";

	const mapper = async (path_to_post: string) => {
		const content_file = parse(path_to_post);
		const page_file = { ...content_file, base: "page" };

		const path = `${page_file.dir}${path_separator}content.mdx`;
		const file_as_str = readFileSync(path, "utf-8");

		const { content, frontmatter } = await compileMDX<{
			date: string;
			title: string;
			excerpt: string;
		}>({ source: file_as_str, options: { parseFrontmatter: true } });

		const excerpt_source = await compileMDX({ source: frontmatter.excerpt });
		const props = { title: frontmatter.title, excerpt_source };

		return <PreviewedPostLink {...props} />;
	};

	return (
		<div className="flex flex-col items-center">
			<LastPostsHeader header_block_classes={POSTS_HEADER_CLASSES} />
			<div className={POSTS_LIST_CONTAINER_CLASSES}>
				{posts
					.filter((_, index: number) => index < POST_PREVIEW_PER_PAGE)
					.map(mapper)}
			</div>
		</div>
	);
}
