import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PageNavigator from "@/app/components/page_navigator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "A Sly Blog",
	description:
		"A blog where a clueless programmer shares his learning journey and thoughts about programming",
};

export default function Layout(props: {
	children?: React.ReactNode;
	list?: React.ReactNode;
}) {
	const NUMBER_OF_PAGES = 5;
	const main_classes = "flex flex-col justify-between p-24 h-screen";
	return (
		<>
			<html lang="en">
				<body className={inter.className}>
					<main className={main_classes}>
						{/* {props.children !== null &&
							props.children !== undefined &&
							props.children} */}
						{props.list ?? null}
						<PageNavigator page_number={NUMBER_OF_PAGES} />
					</main>
				</body>
			</html>
		</>
	);
}
