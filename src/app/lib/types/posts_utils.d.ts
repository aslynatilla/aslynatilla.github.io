import { compileMDX } from "next-mdx-remote/rsc";

export type PostComponentsMap = Parameters<typeof compileMDX>[0]["components"];
