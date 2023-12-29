"use client";

import {
	useRouter,
	useSelectedLayoutSegment,
	useSelectedLayoutSegments,
} from "next/navigation";

import { ReturnToHomePageButton } from "./ReturnToHomePageButton";

export default function PageNavigator({
	page_number,
}: {
	page_number: number;
}) {
	const router = useRouter();
	const button_classes =
		"rounded-md p-2 m-2 ring-1 ring-white hover:bg-[#ffcc00] hover:text-extrabold hover:text-gray-950";

	return (
		<div className="flex flex-row justify-center">
			{new Array(page_number).fill(null).map((_, index: number) => {
				const link_target = `/${index}`;

				const navigate_to_target = () => {
					router.push(`/${index}`, { scroll: false });
				};

				return (
					<button
						key={`page-navigator-button-${index}`}
						type={"button"}
						className={button_classes}
						onClick={() => navigate_to_target()}
					>
						{index + 1}
					</button>
				);
			})}

			<ReturnToHomePageButton classes={button_classes} />
		</div>
	);
}
