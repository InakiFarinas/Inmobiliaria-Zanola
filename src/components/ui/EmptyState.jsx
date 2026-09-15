import Card from "./Card";

export default function EmptyState({
	title,
	description,
	action,
	className = "",
	...props
}) {
	return (
		<Card
			className={`text-center leading-[1.6] text-[var(--muted)] ${className}`.trim()}
			{...props}
		>
			{title ? (
				<p className="m-0 font-bold text-[var(--text)]">{title}</p>
			) : null}
			{description ? <p className="m-0">{description}</p> : null}
			{action ? <div>{action}</div> : null}
		</Card>
	);
}
