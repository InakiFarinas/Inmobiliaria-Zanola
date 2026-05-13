import Button from "../ui/Button";
import Card from "../ui/Card";
import FormField from "../ui/FormField";
import WhatsAppButton from "../ui/WhatsAppButton";

export default function HomeHero({
	cities = [],
	states = [],
	form,
	onFormChange,
	onSubmit,
	latest = [],
}) {
	const heroProperties = latest.slice(0, 3);

	return (
		<section className="h-[calc(100vh-var(--header-height))] overflow-hidden bg-[var(--accent)]">
			<div className="grid h-full gap-4 md:gap-6 p-4 md:p-6 xl:p-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] xl:grid-rows-[1fr_auto] xl:gap-x-8">
				<div className="flex min-w-0 flex-col justify-start gap-6 rounded-none border-0 bg-transparent p-0 shadow-none xl:col-start-1 xl:row-start-1 xl:pr-2">
					<span className="inline-flex w-fit rounded-full bg-white/25 px-4 py-2 text-sm font-bold uppercase tracking-[0.08em] text-white">
						Morón · Buenos Aires
					</span>
					<h1 className="m-0 max-w-[10ch] font-serif text-[clamp(2.8rem,5vw,5.6rem)] leading-[1.02] text-white">
						Encontrá tu próxima{" "}
						<span className="text-[var(--terracota)]">propiedad.</span>
					</h1>
					<p className="m-0 max-w-[54ch] text-[1.05rem] leading-7 text-white/75">
						Explorá opciones de venta y alquiler con un acceso directo a
						propiedades destacadas, búsqueda rápida y contacto inmediato.
					</p>
					<div className="mt-6 flex flex-wrap gap-3">
						<Button to="/propiedades">Ver propiedades</Button>
						<WhatsAppButton
							message="Hola, quisiera que me contacten."
							className="px-4"
						>
							Contactar
						</WhatsAppButton>
					</div>
				</div>

				<Card
					as="form"
					className="grid gap-3 xl:col-start-1 xl:row-start-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
					padding="md"
					onSubmit={onSubmit}
				>
					<FormField
						label="Ciudad"
						as="select"
						value={form.ciudad}
						onChange={(event) => onFormChange("ciudad", event.target.value)}
					>
						<option value="">Todas las ciudades</option>
						{cities.map((city) => (
							<option key={city.id_ciudad} value={city.id_ciudad}>
								{city.nombre}
							</option>
						))}
					</FormField>
					<FormField
						label="Estado"
						as="select"
						value={form.estado}
						onChange={(event) => onFormChange("estado", event.target.value)}
					>
						<option value="">Seleccionar...</option>
						{states.map((state) => (
							<option key={state} value={state}>
								{state}
							</option>
						))}
					</FormField>
					<FormField
						label="Precio Máximo"
						type="number"
						placeholder="Sin límite"
						value={form.precio_max ?? ""}
						onChange={(event) => onFormChange("precio_max", event.target.value)}
					/>
					<Button type="submit" className="self-stretch whitespace-nowrap px-4">
						Buscar
					</Button>
				</Card>

				<div className="grid gap-3 xl:col-start-2 xl:row-span-2 xl:grid-rows-[minmax(0,1fr)_minmax(0,0.55fr)_auto]">
					<div className="relative min-h-[240px] overflow-hidden rounded-[22px] bg-white/5 shadow-[0_20px_45px_rgba(0,0,0,0.22)] xl:min-h-0 xl:row-span-1">
						{heroProperties[0] ? (
							<img
								src={heroProperties[0].imagenes[0]}
								alt={heroProperties[0].ciudad}
								className="h-full w-full object-cover"
							/>
						) : (
							<div className="h-full bg-[linear-gradient(135deg,rgba(140,140,140,0.12),rgba(110,110,110,0.1))]" />
						)}
						<div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-2 text-[0.78rem] font-extrabold text-[var(--text)]">
							Destacada
						</div>
					</div>

					<div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:row-span-1">
						{heroProperties.slice(1, 3).map((property) => (
							<div
								className="relative min-h-[190px] overflow-hidden rounded-[22px] bg-white/5 shadow-[0_20px_45px_rgba(0,0,0,0.22)]"
								key={property.id_propiedad}
							>
								<img
									src={property.imagenes[0]}
									alt={property.ciudad}
									className="h-full w-full object-cover"
								/>
								<div className="absolute bottom-3 left-3 right-3 grid gap-0.5 rounded-2xl bg-black/80 px-3 py-2 text-white backdrop-blur-md">
									<strong className="text-sm">{property.calle}</strong>
									<span className="text-xs text-white/70">
										{property.ciudad}
									</span>
								</div>
							</div>
						))}
					</div>

					<div className="flex items-center justify-between gap-3 px-1 text-sm text-white/75 xl:row-start-3">
						<span>{latest.length} publicaciones activas</span>
						<div className="inline-flex gap-1.5" aria-hidden="true">
							<span className="h-2 w-2 rounded-full bg-white/50" />
							<span className="h-2 w-2 rounded-full bg-white/50" />
							<span className="h-2 w-2 rounded-full bg-white/50" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
