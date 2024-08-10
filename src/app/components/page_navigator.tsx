"use client";

import { useRouter } from "next/navigation";

import { ReturnToHomePageButton } from "@/app/components/ReturnToHomePageButton";

export default function PageNavigator({
	number_of_pages,
}: { number_of_pages: number }) {
	const router = useRouter();
	const button_classes =
		"rounded-md p-2 m-2 ring-1 ring-white hover:bg-[#ffcc00] hover:text-extrabold hover:text-gray-950";

	const pages_other_than_latest_posts = number_of_pages - 1;

	return (
		<div className="flex flex-row justify-center">
			<ReturnToHomePageButton classes={button_classes} />

			{new Array(pages_other_than_latest_posts)
				.fill(null)
				.map((_, index: number) => {
					const human_index = index + 1;
					const link_target = `/${human_index}`;

					const navigate_to_target = () => {
						router.push(link_target, { scroll: false });
					};

					return (
						<button
							key={`page-navigator-button-${human_index}`}
							type={"button"}
							className={button_classes}
							onClick={() => navigate_to_target()}
						>
							{human_index}
						</button>
					);
				})}
		</div>
	);
}
