import { MDXRemote } from "next-mdx-remote/rsc";

export default function PreviewedPostLink(props) {
	return (
		<div>
			<div>{props.frontmatter.title}</div>
			<MDXRemote {...props.frontmatter.excerpt} />
		</div>
	);
}
