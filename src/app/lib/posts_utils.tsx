import { get_posts } from "@/app/lib/filesystem_utils";
import { pages } from "next/dist/build/templates/app-page";

export const POST_PREVIEW_PER_PAGE = 3;

export function get_post_pages_amount() {
	const posts = get_posts();
	const pages_amount = Math.floor(posts.length / POST_PREVIEW_PER_PAGE) + 1;
	return pages_amount;
}
