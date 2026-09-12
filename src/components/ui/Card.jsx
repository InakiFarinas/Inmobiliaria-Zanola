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
		"rounded-[28px] border border-[color:var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] backdrop-blur-[18px]",
		paddingClassName,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return <Tag className={rootClassName} {...props} />;
}
