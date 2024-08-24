import {
	MDXRemote,
	compileMDX,
	type CompileMDXResult,
} from "next-mdx-remote/rsc";
import Link from "next/link";

export default function PreviewedPostLink(props: {
	title: string;
	excerpt_source: CompileMDXResult<Record<string, unknown>>;
}) {
	return (
		<div className="space-y-2">
			<Link
				href={"/post/2021-01-25/learning-cpp"}
				className="group flex flex-row gap-x-2 align-bottom text-yellow-300 transform ease-in-out transition-all duration-200 hover:tracking-wider"
			>
				{props.title}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="snap-center w-5 transform ease-in-out transition-all duration-20000 group-hover:motion-safe:animate-pulse"
				>
					<title>Go to Post</title>
					<path
						fillRule="evenodd"
						d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
						clipRule="evenodd"
					/>
				</svg>
			</Link>
			{props.excerpt_source.content}
		</div>
	);
}
