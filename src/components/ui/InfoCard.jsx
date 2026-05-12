export default function InfoCard({ icon, title, children }) {
	return (
		<li className="grid grid-cols-[40px_1fr] items-start gap-3">
			<span
				className="grid h-10 w-10 place-items-center rounded-[10px] bg-[color:var(--accent-soft)]"
				aria-hidden="true"
			>
				{icon}
			</span>
			<div>
				<strong className="mb-0.5 block text-sm text-muted">{title}</strong>
				{children}
			</div>
		</li>
	);
}
