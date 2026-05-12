export default function StatGrid({ items = [] }) {
	return (
		<dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{items.map((item) => (
				<div key={item.label} className="rounded-xl bg-black/5 p-3 text-center">
					<dt>{item.label}</dt>
					<dd>{item.value}</dd>
				</div>
			))}
		</dl>
	);
}
