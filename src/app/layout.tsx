"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "A Sly Blog",
	description:
		"A blog where a clueless programmer shares his learning journey and thoughts about programming",
	icons: {
		icon: "/public/favicon-32x32.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="public/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="public/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="public/favicon-16x16.png"
				/>

				<link rel="manifest" href="public/site.webmanifest" />
				<link
					rel="mask-icon"
					href="public/safari-pinned-tab.svg"
					color="#5bbad5"
				/>
				<link rel="shortcut icon" href="public/favicon.ico" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="msapplication-config" content="public/browserconfig.xml" />
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</>
	);
}
