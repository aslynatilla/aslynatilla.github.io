export default function RemarkOnHeader({ text }: { text: string }) {
	return (
		<p className="text-xs text-gray-300 font-extralight mx-2 self-end line-through hover:no-underline">
			{text}
		</p>
	);
}
