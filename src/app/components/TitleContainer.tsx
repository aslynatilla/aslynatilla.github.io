import { JSX } from "react";

/// NOTE: Read more about good ways to pass on components and props at:
///   https://blog.logrocket.com/react-children-prop-typescript/
export default function TitleContainer({
	children,
}: { children: JSX.Element }) {
	return (
		<div className="flex items-center place-content-between m-2">
			{children}
		</div>
	);
}
