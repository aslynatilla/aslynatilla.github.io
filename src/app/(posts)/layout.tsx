import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { get_post_pages_amount } from "@/app/lib/posts_utils";
import PageNavigator from "@/app/components/page_navigator";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "A Sly Blog",
	description:
		"A blog where a clueless programmer shares his learning journey and thoughts about programming",
};

export default function Layout(props: {
	children?: React.ReactNode;
}) {
	const main_classes = "flex flex-col justify-between p-24 h-screen";
	return (
		<>
			<html lang="en">
				<body className={inter.className}>
					<main className={main_classes}>
						{props.children}
						<PageNavigator number_of_pages={get_post_pages_amount()} />
					</main>
				</body>
			</html>
		</>
	);
}
