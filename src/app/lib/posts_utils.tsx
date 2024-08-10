export const POST_PREVIEW_PER_PAGE = 3;

export function get_post_pages_amount(posts: string[]) {
	const pages_amount = Math.floor(posts.length / POST_PREVIEW_PER_PAGE) + 1;
	return pages_amount;
}
