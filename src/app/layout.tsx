"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Suspense } from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "A clueless programmer's blog",
  description: "The blog where Antonio stores his learning journey and thoughts about programming",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
