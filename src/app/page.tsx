import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import TextParagraph from "./components/text_paragraph";

function get_post_files(posts_directory = "_posts"): string[] {
	return readdirSync(posts_directory).map((filename) =>
		join(posts_directory, filename),
	);
}

function get_title_and_excerpt(filename: string): [string, string] {
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

export default async function Home() {
	const files = get_post_files();
	console.debug(files);
	const processed_files = files.map(get_title_and_excerpt);

	return (
		<>
			<div className="flex flex-col items-center">
				<div className="z-10 max-w-5xl w-full items-center justify-between text-3xl lg:flex">
					<p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-400 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
						# Latest posts
					</p>
				</div>
				<div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-rows-4 lg:text-left">
					{processed_files.map(([title, content]: [string, string]) => {
						return (
							<a
								href="."
								className="group 
						rounded-lg border border-transparent px-5 py-4 
						transition-colors 
						hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2
									className={
										"mb-3 text-2xl font-semibold transition-[letter-spacing] ease-in-out group-hover:tracking-wide"
									}
								>
									{title}{" "}
									<div className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
										{"->"}
									</div>
								</h2>

								<TextParagraph
									text={content}
									classes="transition-colors ease-in-out text-gray-400 group-hover:text-gray-300"
								/>
							</a>
						);
					})}
				</div>
			</div>
		</>
	);
}
