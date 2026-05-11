export default function PropertyFilters({
	values,
	onChange,
	onSubmit,
	onReset,
	options,
}) {
	return (
		<form className="filters-panel" onSubmit={onSubmit}>
			<div className="filters-grid">
				<label>
					Tipo
					<select name="tipo" value={values.tipo} onChange={onChange}>
						<option value="">Todos los tipos</option>
						{options.types.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</label>

				<label>
					Estado
					<select name="estado" value={values.estado} onChange={onChange}>
						<option value="">Todos los estados</option>
						{options.states.map((state) => (
							<option key={state} value={state}>
								{state}
							</option>
						))}
					</select>
				</label>

				<label>
					Ciudad
					<select name="ciudad" value={values.ciudad} onChange={onChange}>
						<option value="">Todas las ciudades</option>
						{options.cities.map((city) => (
							<option key={city.id_ciudad} value={city.id_ciudad}>
								{city.nombre}
							</option>
						))}
					</select>
				</label>

				<label>
					Ambientes
					<input
						type="number"
						name="ambientes"
						min="0"
						max="10"
						value={values.ambientes}
						onChange={onChange}
					/>
				</label>

				<label>
					Dormitorios
					<input
						type="number"
						name="dormitorios"
						min="0"
						max="10"
						value={values.dormitorios}
						onChange={onChange}
					/>
				</label>

				<label>
					Baños
					<input
						type="number"
						name="baños"
						min="0"
						max="10"
						value={values.baños}
						onChange={onChange}
					/>
				</label>

				<label>
					Antigüedad
					<input
						type="number"
						name="antiguedad"
						min="0"
						max="100"
						value={values.antiguedad}
						onChange={onChange}
					/>
				</label>

				<label className="checkbox-row">
					<input
						type="checkbox"
						name="garaje"
						checked={values.garaje}
						onChange={onChange}
					/>
					Garaje
				</label>

				<label>
					Precio mínimo
					<input
						type="number"
						name="precio_min"
						min="0"
						value={values.precio_min}
						onChange={onChange}
					/>
				</label>

				<label>
					Precio máximo
					<input
						type="number"
						name="precio_max"
						min="0"
						value={values.precio_max}
						onChange={onChange}
					/>
				</label>

				<label>
					Superficie mínima
					<input
						type="number"
						name="superficie_min"
						min="0"
						value={values.superficie_min}
						onChange={onChange}
					/>
				</label>

				<label>
					Superficie máxima
					<input
						type="number"
						name="superficie_max"
						min="0"
						value={values.superficie_max}
						onChange={onChange}
					/>
				</label>
			</div>

			<div className="filters-actions">
				<button type="submit" className="button button-primary">
					Filtrar
				</button>
				<button type="button" className="button button-ghost" onClick={onReset}>
					Borrar filtros
				</button>
			</div>
		</form>
	);
}
