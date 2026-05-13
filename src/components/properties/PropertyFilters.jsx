import Card from "../ui/Card";

export default function PropertyFilters({
	values,
	onChange,
	onSubmit,
	onReset,
	options = {},
}) {
	const { cities = [], types = [], states = [] } = options;

	return (
		<Card
			as="aside"
			className="lg:sticky lg:top-[110px] p-4 md:p-5"
			padding="none"
		>
			<form className="grid gap-4" onSubmit={onSubmit}>
				<div>
					<span className="inline-flex w-fit rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[color:var(--accent)]">
						Filtros
					</span>
					<h2 className="mt-2 font-serif text-2xl text-[var(--text)]">
						Ajustá tu búsqueda
					</h2>
				</div>

				<label className="grid gap-1 text-sm font-bold text-muted">
					Tipo
					<select
						name="tipo"
						value={values.tipo}
						onChange={onChange}
						className="w-full rounded-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
					>
						<option value="">Todos los tipos</option>
						{types.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</label>

				<label className="grid gap-1 text-sm font-bold text-muted">
					Estado
					<select
						name="estado"
						value={values.estado}
						onChange={onChange}
						className="w-full rounded-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
					>
						<option value="">Cualquier estado</option>
						{states.map((state) => (
							<option key={state} value={state}>
								{state}
							</option>
						))}
					</select>
				</label>

				<label className="grid gap-1 text-sm font-bold text-muted">
					Ciudad
					<select
						name="ciudad"
						value={values.ciudad}
						onChange={onChange}
						className="w-full rounded-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
					>
						<option value="">Todas las ciudades</option>
						{cities.map((city) => (
							<option key={city.id_ciudad} value={city.id_ciudad}>
								{city.nombre}
							</option>
						))}
					</select>
				</label>

				<div className="grid grid-cols-2 gap-3">
					<label className="grid gap-1 text-sm font-bold text-muted">
						Ambientes
						<input
							name="ambientes"
							type="number"
							min="0"
							value={values.ambientes}
							onChange={onChange}
							className="w-full rounded-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
						/>
					</label>
					<label className="grid gap-1 text-sm font-bold text-muted">
						Dormitorios
						<input
							name="dormitorios"
							type="number"
							min="0"
							value={values.dormitorios}
							onChange={onChange}
							className="w-full rounded-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
						/>
					</label>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<label className="grid gap-1 text-sm font-bold text-muted">
						Baños
						<input
							name="baños"
							type="number"
							min="0"
							value={values.baños}
							onChange={onChange}
							className="w-full rounded-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
						/>
					</label>
					<label className="grid gap-1 text-sm font-bold text-muted">
						Antigüedad
						<input
							name="antiguedad"
							type="number"
							min="0"
							value={values.antiguedad}
							onChange={onChange}
							className="w-full rounded-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
						/>
					</label>
				</div>

				<label className="inline-flex items-center gap-2 text-sm font-bold text-muted">
					<input
						name="garaje"
						type="checkbox"
						checked={values.garaje}
						onChange={onChange}
					/>
					<span>Con cochera</span>
				</label>

				<div className="grid grid-cols-2 gap-3">
					<label className="grid gap-1 text-sm font-bold text-muted">
						Precio mín.
						<input
							name="precio_min"
							type="number"
							min="0"
							value={values.precio_min}
							onChange={onChange}
							className="w-full rounded-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
						/>
					</label>
					<label className="grid gap-1 text-sm font-bold text-muted">
						Precio máx.
						<input
							name="precio_max"
							type="number"
							min="0"
							value={values.precio_max}
							onChange={onChange}
							className="w-full rounded-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
						/>
					</label>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<label className="grid gap-1 text-sm font-bold text-muted">
						Superficie mín.
						<input
							name="superficie_min"
							type="number"
							min="0"
							value={values.superficie_min}
							onChange={onChange}
							className="w-full rounded-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
						/>
					</label>
					<label className="grid gap-1 text-sm font-bold text-muted">
						Superficie máx.
						<input
							name="superficie_max"
							type="number"
							min="0"
							value={values.superficie_max}
							onChange={onChange}
							className="w-full rounded-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.9)] px-3 py-2 text-[var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
						/>
					</label>
				</div>

				<div className="mt-4 flex flex-wrap gap-3">
					<button
						type="submit"
						className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 font-extrabold text-white shadow-[0_16px_38px_rgba(26,26,26,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
						style={{ backgroundColor: "var(--cta-dark)" }}
					>
						Aplicar filtros
					</button>
					<button
						type="button"
						className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-4 py-2 font-extrabold text-white transition-transform duration-200 hover:-translate-y-0.5"
						onClick={onReset}
						style={{ backgroundColor: "transparent" }}
					>
						Limpiar
					</button>
				</div>
			</form>
		</Card>
	);
}
