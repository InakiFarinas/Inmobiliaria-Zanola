import Card from "../ui/Card";
import FormField from "../ui/FormField";

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

				<FormField
					label="Tipo"
					as="select"
					name="tipo"
					value={values.tipo}
					onChange={onChange}
				>
					<option value="">Todos los tipos</option>
					{types.map((type, idx) => (
						<option key={`type-${idx}`} value={type}>
							{type}
						</option>
					))}
				</FormField>

				<FormField
					label="Estado"
					as="select"
					name="estado"
					value={values.estado}
					onChange={onChange}
				>
					<option value="">Cualquier estado</option>
					{states.map((state, idx) => (
						<option key={`state-${idx}`} value={state}>
							{state}
						</option>
					))}
				</FormField>

				<FormField
					label="Ciudad"
					as="select"
					name="ciudad"
					value={values.ciudad}
					onChange={onChange}
				>
					<option value="">Todas las ciudades</option>
					{cities.map((city, idx) => (
						<option key={`city-${idx}`} value={city.nombre}>
							{city.nombre}
						</option>
					))}
				</FormField>

				<div className="grid grid-cols-2 gap-3">
					<FormField
						label="Ambientes"
						name="ambientes"
						type="number"
						min="0"
						value={values.ambientes}
						onChange={onChange}
					/>
					<FormField
						label="Dormitorios"
						name="dormitorios"
						type="number"
						min="0"
						value={values.dormitorios}
						onChange={onChange}
					/>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<FormField
						label="Baños"
						name="banos"
						type="number"
						min="0"
						value={values.banos}
						onChange={onChange}
					/>
					<FormField
						label="Antigüedad"
						name="antiguedad"
						type="number"
						min="0"
						value={values.antiguedad}
						onChange={onChange}
					/>
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
					<FormField
						label="Precio mín."
						name="precio_min"
						type="number"
						min="0"
						value={values.precio_min}
						onChange={onChange}
					/>
					<FormField
						label="Precio máx."
						name="precio_max"
						type="number"
						min="0"
						value={values.precio_max}
						onChange={onChange}
					/>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<FormField
						label="Superficie mín."
						name="superficie_min"
						type="number"
						min="0"
						value={values.superficie_min}
						onChange={onChange}
					/>
					<FormField
						label="Superficie máx."
						name="superficie_max"
						type="number"
						min="0"
						value={values.superficie_max}
						onChange={onChange}
					/>
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
