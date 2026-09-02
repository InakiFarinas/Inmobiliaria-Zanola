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
		"w-full rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[var(--surface)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]",
		controlClassName,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<label
			className={`grid gap-1.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[var(--muted)] ${labelClassName}`.trim()}
		>
			<span>{label}</span>
			<Tag className={fieldClassName} {...props}>
				{children}
			</Tag>
		</label>
	);
}
