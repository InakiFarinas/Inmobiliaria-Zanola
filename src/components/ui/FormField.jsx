export default function FormField({
	label,
	as: Tag = "input",
	className = "",
	labelClassName = "",
	controlClassName = "",
	children,
	...props
}) {
	const fieldClassName = [
		"w-full rounded-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]",
		controlClassName,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<label
			className={`grid gap-1 text-sm font-bold text-muted ${labelClassName}`.trim()}
		>
			<span>{label}</span>
			<Tag className={fieldClassName} {...props}>
				{children}
			</Tag>
		</label>
	);
}
