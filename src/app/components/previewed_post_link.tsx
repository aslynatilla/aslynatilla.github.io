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
		<div>
			<Link href={"/post/2021-01-25/learning-cpp"}>{props.title}</Link>
			{props.excerpt_source.content}
		</div>
	);
}
