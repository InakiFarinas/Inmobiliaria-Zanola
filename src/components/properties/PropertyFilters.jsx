import { useState } from "react";
import Button from "../ui/Button";
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
	const [expanded, setExpanded] = useState(false);

	return (
		<Card as="aside" className="lg:sticky lg:top-[110px] p-4 md:p-5" padding="none">
			<form className="grid gap-4" onSubmit={onSubmit}>
				<h2 className="font-serif text-2xl font-medium text-[var(--text)]">
					Ajustá tu búsqueda
				</h2>

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
					label="Precio máximo"
					name="precio_max"
					type="number"
					min="0"
					value={values.precio_max}
					onChange={onChange}
				/>

				<button
					type="button"
					onClick={() => setExpanded((v) => !v)}
					className="flex items-center justify-between border-t border-dashed border-[color:var(--line)] py-3.5 text-left font-mono text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[var(--muted)]"
					aria-expanded={expanded}
				>
					<span>{expanded ? "Menos filtros" : "Más filtros"}</span>
					<span aria-hidden="true">{expanded ? "−" : "+"}</span>
				</button>

				{expanded ? (
					<div className="grid gap-4">
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

						<label className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[var(--muted)]">
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
								label="Superficie mín."
								name="superficie_min"
								type="number"
								min="0"
								value={values.superficie_min}
								onChange={onChange}
							/>
						</div>

						<FormField
							label="Superficie máx."
							name="superficie_max"
							type="number"
							min="0"
							value={values.superficie_max}
							onChange={onChange}
						/>
					</div>
				) : null}

				<div className="mt-1 flex flex-wrap gap-3">
					<Button type="submit">Aplicar filtros</Button>
					<Button type="button" variant="pill" onClick={onReset}>
						Limpiar
					</Button>
				</div>
			</form>
		</Card>
	);
}
