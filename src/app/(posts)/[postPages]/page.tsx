import { get_post_pages_amount } from "@/app/lib/posts_utils";

export const dynamic = "force-static";

export function generateStaticParams(): { postPages: string }[] {
	const pages_to_generate = get_post_pages_amount();
	const params = new Array(pages_to_generate).fill(null).map((_, index) => ({
		postPages: `${index}`,
	}));
	return params;
}

export default function Page({ params }: { params: { postPages: string } }) {
	// Just used to generate the empty children that goes into the layout,
	// when one of the list of posts needs to be served.
	return <></>;
}
