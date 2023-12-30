import TextParagraph from "@/app/components/text_paragraph";

import {
	get_post_files,
	get_title_and_excerpt,
} from "@/app/lib/filesystem_utils";

export default async function Home() {
	const files = get_post_files();
	console.debug(files);
	const processed_files = files.map(get_title_and_excerpt);

	return (
		<div className="flex flex-col items-center">
			<div className="z-10 max-w-5xl w-full items-center justify-between text-3xl lg:flex">
				<p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-400 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
					# Latest posts
				</p>
			</div>
			<div className="flex flex-cols text-center max-h-max lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
				{processed_files.map(
					([title, content]: [string, string], index: number) => {
						return (
							<a
								key={`${title}-${index}-post`}
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
					},
				)}
			</div>
		</div>
	);
}
