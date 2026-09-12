import {
	StatGridAgeIcon,
	StatGridBathroomsIcon,
	StatGridBedroomsIcon,
	StatGridGarageIcon,
	StatGridRoomsIcon,
	StatGridSurfaceIcon,
	StatGridTypeIcon,
} from "./StatGridIcons";

export default function StatGrid({ items = [] }) {
	const iconByLabel = {
		Tipo: StatGridTypeIcon,
		Garaje: StatGridGarageIcon,
		Baños: StatGridBathroomsIcon,
		Ambientes: StatGridRoomsIcon,
		Dormitorios: StatGridBedroomsIcon,
		Superficie: StatGridSurfaceIcon,
		Antigüedad: StatGridAgeIcon,
	};

	return (
		<dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{items.map((item) => (
				<div
					key={item.label}
					className="flex items-start gap-3 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] px-4 py-3 shadow-[0_10px_24px_rgba(26,26,26,0.05)]"
				>
					<div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
						{(() => {
							const Icon = iconByLabel[item.label] || StatGridTypeIcon;
							return <Icon />;
						})()}
					</div>
					<div className="min-w-0">
						<dt className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
							{item.label}
						</dt>
						<dd className="mt-0.5 text-[1rem] font-extrabold text-[var(--text)]">
							{item.value}
						</dd>
					</div>
				</div>
			))}
		</dl>
	);
}
