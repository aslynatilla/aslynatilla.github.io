import { JsxElement } from "typescript";

export default function TextParagraph({
	text: paragraph_text,
	classes,
}: { text: string; classes?: string }) {
	return (
		<p
			className={`m-0 text-sm leading-tight whitespace-pre-wrap ${
				classes ?? ""
			}`}
		>
			{paragraph_text}
		</p>
	);
}
