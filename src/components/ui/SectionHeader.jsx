export default function SectionHeader({
	kicker,
	title,
	description,
	action,
	align = "left",
	titleAs: TitleTag = "h2",
	className = "",
}) {
	const rootClassName = [
		"mb-5 flex flex-col gap-3",
		align === "inline"
			? "md:flex-row md:items-end md:justify-between md:gap-4"
			: "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={rootClassName}>
			<div>
				{kicker ? (
					<span className="inline-flex w-fit rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[color:var(--accent)]">
						{kicker}
					</span>
				) : null}
				<TitleTag className="m-0 font-serif text-[clamp(1.9rem,3vw,3.3rem)] leading-[1.08] text-[var(--text)]">
					{title}
				</TitleTag>
				{description ? (
					<p className="m-0 max-w-[62ch] text-[1.02rem] leading-7 text-[var(--muted)]">
						{description}
					</p>
				) : null}
			</div>
			{action ? <div>{action}</div> : null}
		</div>
	);
}
