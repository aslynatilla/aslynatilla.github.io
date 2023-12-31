import { get_posts } from "@/app/lib/filesystem_utils";

export const dynamic = "force-static";

export function generateStaticParams(): { postPages: string }[] {
	const params = new Array(5).fill(null).map((_, index) => ({
		postPages: `${index}`,
	}));
	return params;
}

export default function Page({ params }: { params: { postPages: string } }) {
	const current_page_index: number = Number.parseInt(params.postPages);
	const next_page_index: number = current_page_index + 1;
	const most_recent_post_threshold: number = current_page_index * 5 + 1;
	const oldest_post_threshold: number = next_page_index * 5;
	const text: string = `${most_recent_post_threshold} to ${oldest_post_threshold} posts here`;
	return <div className="text-center">{text}</div>;
}
