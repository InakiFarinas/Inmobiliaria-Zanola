import { useMemo, useCallback } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import FormField from "../ui/FormField";
import WhatsAppButton from "../ui/WhatsAppButton";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../lib/utils";

export default function HomeHero({
	cities = [],
	states = [],
	form,
	onFormChange,
	onSubmit,
	latest = [],
	totalCount,
}) {
	const heroProperties = useMemo(() => latest.slice(0, 3), [latest]);

	const mainImage = useMemo(
		() =>
			heroProperties[0] && heroProperties[0].imagenes?.[0]
				? getImageUrl(heroProperties[0].imagenes[0])
				: null,
		[heroProperties],
	);

	const handleCityChange = useCallback(
		(event) => onFormChange("ciudad", event.target.value),
		[onFormChange],
	);

	const handleStateChange = useCallback(
		(event) => onFormChange("estado", event.target.value),
		[onFormChange],
	);

	const handlePriceChange = useCallback(
		(event) => onFormChange("precio_max", event.target.value),
		[onFormChange],
	);

	return (
		<section className="min-h-[calc(100vh-var(--header-height))] md:h-[calc(100vh-var(--header-height))] overflow-visible md:overflow-hidden bg-[var(--accent)]">
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

					{/* Small-screen: show a single featured image under the hero text */}
					{heroProperties[0] && mainImage && (
						<Link
							to={`/propiedad/${heroProperties[0].id_propiedad}`}
							className="mt-4 block overflow-hidden rounded-[18px] bg-white/5 shadow-[0_12px_28px_rgba(0,0,0,0.18)] xl:hidden relative group cursor-pointer"
							aria-label={`Ver propiedad en ${heroProperties[0].ciudad}`}
						>
							<img
								src={mainImage}
								alt={heroProperties[0].ciudad}
								width="1200"
								height="800"
								className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
								loading="lazy"
								decoding="async"
							/>
							<div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[0.78rem] font-extrabold text-[var(--text)]">
								Destacada
							</div>
							<div className="absolute inset-x-0 bottom-0 p-3">
								<div className="rounded-2xl bg-black/80 px-3 py-2 text-white ring-1 ring-black/60">
									<p className="m-0 text-sm font-bold">
										{heroProperties[0].calle}
									</p>
									<p className="m-0 text-xs text-white/80">
										{heroProperties[0].ciudad}
									</p>
								</div>
							</div>
						</Link>
					)}
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
						onChange={handleCityChange}
					>
						<option value="">Todas las ciudades</option>
						{cities.map((city, idx) => (
							<option key={`${city.id_ciudad}-${idx}`} value={city.nombre}>
								{city.nombre}
							</option>
						))}
					</FormField>
					<FormField
						label="Estado"
						as="select"
						value={form.estado}
						onChange={handleStateChange}
					>
						<option value="">Seleccionar...</option>
						{states.map((state, idx) => (
							<option key={`${state}-${idx}`} value={state}>
								{state}
							</option>
						))}
					</FormField>
					<FormField
						label="Precio Máximo"
						type="number"
						placeholder="Sin límite"
						value={form.precio_max ?? ""}
						onChange={handlePriceChange}
					/>
					<Button type="submit" className="self-stretch whitespace-nowrap px-4">
						Buscar
					</Button>
				</Card>

				<div className="hidden xl:grid gap-3 xl:col-start-2 xl:row-span-2 xl:grid-rows-[minmax(0,1fr)_minmax(0,0.55fr)_auto]">
					{heroProperties[0] && mainImage ? (
						<Link
							to={`/propiedad/${heroProperties[0].id_propiedad}`}
							className="relative min-h-[240px] overflow-hidden rounded-[22px] bg-white/5 shadow-[0_20px_45px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:-translate-y-0.5 xl:min-h-0 xl:row-span-1"
							aria-label={`Ver propiedad en ${heroProperties[0].ciudad}`}
						>
							<img
								src={mainImage}
								alt={heroProperties[0].ciudad}
								width="1200"
								height="800"
								className="h-full w-full object-cover"
								loading="lazy"
								decoding="async"
							/>
							<div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-2 text-[0.78rem] font-extrabold text-[var(--text)]">
								Destacada
							</div>
							<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/70 to-transparent p-4 text-white">
								<p className="m-0 text-sm font-bold">
									{heroProperties[0].calle}
								</p>
								<p className="m-0 text-xs text-white/75">
									{heroProperties[0].ciudad}
								</p>
							</div>
						</Link>
					) : (
						<div className="relative min-h-[240px] overflow-hidden rounded-[22px] bg-white/5 shadow-[0_20px_45px_rgba(0,0,0,0.22)] xl:min-h-0 xl:row-span-1">
							<div className="h-full bg-[linear-gradient(135deg,rgba(140,140,140,0.12),rgba(110,110,110,0.1))]" />
							<div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-2 text-[0.78rem] font-extrabold text-[var(--text)]">
								Destacada
							</div>
						</div>
					)}

					<div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:row-span-1">
						{heroProperties.slice(1, 3).map((property) => (
							<Link
								to={`/propiedad/${property.id_propiedad}`}
								className="relative min-h-[190px] overflow-hidden rounded-[22px] bg-white/5 shadow-[0_20px_45px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:-translate-y-0.5"
								key={property.id_propiedad}
								aria-label={`Ver propiedad en ${property.ciudad}, ${property.calle}`}
							>
								<img
									src={property.imagenes[0]}
									alt={property.ciudad}
									width="1200"
									height="800"
									className="h-full w-full object-cover"
								/>
								<div className="absolute bottom-3 left-3 right-3 grid gap-0.5 rounded-2xl bg-black/80 px-3 py-2 text-white backdrop-blur-md">
									<strong className="text-sm">{property.calle}</strong>
									<span className="text-xs text-white/70">
										{property.ciudad}
									</span>
								</div>
							</Link>
						))}
					</div>

					<div className="flex items-center justify-between gap-3 px-1 text-sm text-white/75 xl:row-start-3">
						<span>
							{typeof totalCount === "number" && totalCount > 0
								? totalCount
								: latest.length}{" "}
							publicaciones activas
						</span>
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
