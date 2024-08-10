import "server-only";
import { readdirSync, readFileSync, Dirent } from "fs";
import { ParsedPath, join, parse } from "path";

export const POST_REPOSITORY: string = "public/posts/";

export function get_post_files(posts_directory = "_posts"): string[] {
	try {
		return readdirSync(posts_directory).map((filename) =>
			join(posts_directory, filename),
		);
	} catch (error) {
		console.warn(
			`Error while reading posts' directory: ${posts_directory}\nError caught:\t${error}`,
		);
		return [];
	}
}

export function get_title_and_excerpt(filename: string): [string, string] {
	const file_content: string = readFileSync(filename, { encoding: "utf8" });

	const find_title = () => {
		const title_marker = "title:";
		const title_entry_start: number = file_content.indexOf(title_marker);
		const title_entry_end: number = file_content.indexOf(
			"\n",
			title_entry_start,
		);

		return file_content
			.substring(title_entry_start + title_marker.length, title_entry_end)
			.trim();
	};

	const find_excerpt = () => {
		const excerpt_marker_entry_marker: string = "excerpt_separator:";
		const excerpt_marker_start: number = file_content.indexOf(
			excerpt_marker_entry_marker,
		);
		const excerpt_marker_end: number = file_content.indexOf(
			"\n",
			excerpt_marker_start,
		);
		const content_start_marker: string = "---\n\n";
		const content_start: number = file_content.indexOf(content_start_marker);

		if (content_start === -1) {
			return "Fake excerpt because source file was malformed.";
		}

		const excerpt_not_found =
			excerpt_marker_end === -1 || excerpt_marker_start === -1;
		if (excerpt_not_found) {
			const custom_excerpt_end: number = file_content.indexOf(
				"\n\n",
				content_start,
			);
			return file_content.substring(content_start, custom_excerpt_end);
		}
		const excerpt_marker: string = file_content
			.substring(
				excerpt_marker_start + excerpt_marker_entry_marker.length,
				excerpt_marker_end,
			)
			.trim();
		const excerpt_end: number = file_content.indexOf(
			excerpt_marker,
			excerpt_marker_end,
		);
		return file_content.substring(
			content_start + content_start_marker.length,
			excerpt_end,
		);
	};

	return [find_title(), find_excerpt()];
}

export function get_posts(): string[] {
	const entries: Dirent[] = readdirSync(POST_REPOSITORY, {
		withFileTypes: true,
		recursive: true,
	});
	const POST_EXTENSION = ".mdx";
	const posts: [string, ParsedPath][] = entries
		.filter((entry: Dirent) => entry.isFile())
		.map((entry): [string, ParsedPath] => {
			const joined_path = join(entry.path, entry.name);
			return [joined_path, parse(joined_path)];
		})
		.filter(
			([_, descriptor]: [string, ParsedPath]) =>
				descriptor.ext.toLowerCase() === POST_EXTENSION,
		);

	const paths_to_posts = posts.map(
		([whole_path, _]: [string, ParsedPath]) => whole_path,
	);
	return paths_to_posts;
}
