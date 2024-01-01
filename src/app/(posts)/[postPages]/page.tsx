export const dynamic = "force-static";

export function generateStaticParams(): { postPages: string }[] {
	const params = new Array(5).fill(null).map((_, index) => ({
		postPages: `${index}`,
	}));
	return params;
}

export default function Page({ params }: { params: { postPages: string } }) {
	// Just used to generate the empty children that goes into the layout,
	// when one of the list of posts needs to be served.
	return null;
}
