export default function Card({
	as: Tag = "div",
	className = "",
	padding = "md",
	...props
}) {
	const paddingClassName = {
		none: "",
		sm: "p-4 md:p-6",
		md: "p-6 md:p-8",
		lg: "p-6 md:p-10",
	}[padding];

	const rootClassName = [
		"rounded-[var(--radius-xl)] border border-[color:var(--line)] bg-[var(--surface)] [box-shadow:var(--shadow)]",
		paddingClassName,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return <Tag className={rootClassName} {...props} />;
}
