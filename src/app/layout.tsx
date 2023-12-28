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
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<html lang="en">
				<body className={inter.className}>
					<main className="flex min-h-screen flex-col justify-between p-24">
						{children}
					</main>
				</body>
			</html>
		</>
	);
}
