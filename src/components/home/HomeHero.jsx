import { useMemo, useCallback } from "react";
import Button from "../ui/Button";
import WhatsAppButton from "../ui/WhatsAppButton";
import WaxSeal from "../icons/WaxSeal";
import { Link } from "react-router-dom";
import { formatAddress, formatFolio, formatPrice, getImageUrls } from "../../lib/utils";

function PropertyImage({ src, alt }) {
	const urls = getImageUrls(src);
	return (
		<picture>
			<source srcSet={urls.webp} type="image/webp" />
			<img
				src={urls.fallback}
				alt={alt}
				width="1200"
				height="800"
				className="h-full w-full object-cover"
			/>
		</picture>
	);
}

export default function HomeHero({
	cities = [],
	states = [],
	form,
	onFormChange,
	onSubmit,
	latest = [],
	totalCount,
}) {
	const heroProperties = useMemo(() => {
		const featured = latest.find((property) => property.destacada);
		if (!featured) return latest.slice(0, 3);
		const rest = latest.filter((property) => property !== featured);
		return [featured, ...rest].slice(0, 3);
	}, [latest]);

	const mainImageUrls = useMemo(
		() =>
			heroProperties[0]?.imagenes?.[0]
				? getImageUrls(heroProperties[0].imagenes[0])
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
		<section className="border-b border-[color:var(--line)] bg-[var(--surface)] pb-8 md:pb-0">
			<div className="mx-auto grid w-[min(1180px,calc(100%_-_24px))] gap-6 py-8 md:w-[min(1180px,calc(100%_-_32px))] md:py-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] xl:gap-x-10">
				<div className="flex min-w-0 flex-col justify-center gap-6 xl:col-start-1 xl:row-start-1">
					<h1 className="m-0 max-w-[15ch] font-serif text-[clamp(2.6rem,5vw,5rem)] font-medium leading-[1.04] text-[var(--text)]">
						Cada propiedad, asentada por <span className="italic">un martillero real.</span>
					</h1>
					<p className="m-0 max-w-[54ch] text-[1.02rem] leading-7 text-[var(--muted)]">
						No es un portal: es el libro propio de la inmobiliaria en Morón y
						Castelar. Cada asiento fue verificado por Julián Cabrera. Buscá,
						encontrá y escribinos directo — sin intermediarios.
					</p>
					<div className="mt-2 flex flex-wrap gap-3">
						<Button to="/propiedades">Ver el libro completo</Button>
						<WhatsAppButton message="Hola, quisiera que me contacten." className="px-4">
							Contactar
						</WhatsAppButton>
					</div>

					{heroProperties[0] && mainImageUrls && (
						<Link
							to={`/propiedad/${heroProperties[0].id_propiedad}`}
							className="mt-3 block overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--line)] [box-shadow:var(--shadow-image)] xl:hidden relative group cursor-pointer"
							aria-label={`Ver propiedad en ${heroProperties[0].ciudad}`}
						>
							<picture>
								<source srcSet={mainImageUrls.webp} type="image/webp" />
								<img
									src={mainImageUrls.fallback}
									alt={heroProperties[0].ciudad}
									width="1200"
									height="800"
									className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
									loading="lazy"
									decoding="async"
								/>
							</picture>
							{heroProperties[0].destacada ? (
								<div className="absolute left-3 top-3">
									<WaxSeal size={40} />
								</div>
							) : null}
							<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
								<p className="tabular m-0 font-serif text-2xl font-medium text-white">
									{formatFolio(heroProperties[0].id_propiedad)}
								</p>
								<p className="m-0 text-sm font-semibold text-white">
									{formatAddress(heroProperties[0])}
								</p>
							</div>
						</Link>
					)}
				</div>

				<div className="xl:col-start-1 xl:row-start-2">
					<form
						className="rounded-[var(--radius-lg)] border border-[rgb(var(--gold-rgb)/25%)] bg-[var(--cta-dark)] p-5 md:p-6 [box-shadow:var(--shadow-cta)]"
						role="search"
						onSubmit={onSubmit}
					>
						<div className="flex flex-wrap items-end gap-x-5 gap-y-5">
							<label className="flex flex-col gap-1.5">
								<span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/50">
									Ciudad
								</span>
								<select
									className="min-w-[10ch] border-0 border-b-2 border-[rgb(var(--gold-rgb)/40%)] bg-transparent py-2 font-serif text-lg text-white outline-none transition focus:border-[var(--gold)]"
									value={form.ciudad}
									onChange={handleCityChange}
								>
									<option value="">todas</option>
									{cities.map((city, idx) => (
										<option key={`${city.id_ciudad}-${idx}`} value={city.nombre}>
											{city.nombre}
										</option>
									))}
								</select>
							</label>

							<span
								className="self-end pb-1.5 font-serif text-lg text-white/25"
								aria-hidden="true"
							>
								·
							</span>

							<label className="flex flex-col gap-1.5">
								<span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/50">
									Estado
								</span>
								<select
									className="min-w-[9ch] border-0 border-b-2 border-[rgb(var(--gold-rgb)/40%)] bg-transparent py-2 font-serif text-lg text-white outline-none transition focus:border-[var(--gold)]"
									value={form.estado}
									onChange={handleStateChange}
								>
									<option value="">cualquiera</option>
									{states.map((state, idx) => (
										<option key={`${state}-${idx}`} value={state}>
											{state}
										</option>
									))}
								</select>
							</label>

							<span
								className="self-end pb-1.5 font-serif text-lg text-white/25"
								aria-hidden="true"
							>
								·
							</span>

							<label className="flex flex-col gap-1.5">
								<span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/50">
									Hasta AR$
								</span>
								<input
									type="number"
									placeholder="sin límite"
									className="tabular w-[9ch] border-0 border-b-2 border-[rgb(var(--gold-rgb)/40%)] bg-transparent py-2 font-serif text-lg text-white outline-none transition placeholder:font-sans placeholder:text-base placeholder:italic placeholder:text-white/55 focus:border-[var(--gold)]"
									value={form.precio_max ?? ""}
									onChange={handlePriceChange}
								/>
							</label>

							<Button
								type="submit"
								variant="pill"
								className="ml-auto whitespace-nowrap self-stretch px-6"
							>
								Buscar
							</Button>
						</div>
					</form>
				</div>

				<div className="hidden xl:grid gap-3 xl:col-start-2 xl:row-span-2 xl:grid-rows-[minmax(0,1fr)_minmax(0,0.55fr)_auto]">
					{heroProperties[0] && mainImageUrls ? (
						<Link
							to={`/propiedad/${heroProperties[0].id_propiedad}`}
							className="relative min-h-[240px] overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--line)] bg-[var(--paper-deep)] [box-shadow:var(--shadow-image)] transition-transform duration-200 hover:-translate-y-0.5 xl:min-h-0 xl:row-span-1"
							aria-label={`Ver propiedad en ${heroProperties[0].ciudad}`}
						>
							<picture>
								<source srcSet={mainImageUrls.webp} type="image/webp" />
								<img
									src={mainImageUrls.fallback}
									alt={heroProperties[0].ciudad}
									width="1200"
									height="800"
									className="h-full w-full object-cover"
								/>
							</picture>
							{heroProperties[0].destacada ? (
								<div className="absolute left-4 top-4">
									<WaxSeal size={48} />
								</div>
							) : null}
							<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent p-4 text-white">
								<p className="tabular m-0 font-serif text-3xl font-medium">
									{formatFolio(heroProperties[0].id_propiedad)}
								</p>
								<p className="m-0 text-sm font-semibold">
									{formatAddress(heroProperties[0])}
								</p>
							</div>
						</Link>
					) : (
						<div className="relative min-h-[240px] overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--line)] bg-[var(--paper-deep)] xl:min-h-0 xl:row-span-1" />
					)}

					<div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:row-span-1">
						{heroProperties.slice(1, 3).map((property) => (
							<Link
								to={`/propiedad/${property.id_propiedad}`}
								className="relative min-h-[190px] overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--line)] [box-shadow:var(--shadow-image)] transition-transform duration-200 hover:-translate-y-0.5"
								key={property.id_propiedad}
								aria-label={`Ver propiedad en ${property.ciudad}, ${property.calle}`}
							>
								<PropertyImage src={property.imagenes[0]} alt={property.ciudad} />
								<div className="absolute bottom-3 left-3 right-3 rounded-[var(--radius-sm)] bg-[rgb(var(--cta-dark-rgb)/90%)] px-3 py-2 text-white">
									<p className="tabular m-0 font-mono text-[0.62rem] text-white/60">
										{formatFolio(property.id_propiedad)}
									</p>
									<strong className="text-sm">{formatAddress(property)}</strong>
								</div>
							</Link>
						))}
					</div>

					<div className="flex items-center justify-between gap-3 border-t border-dashed border-[color:var(--line)] px-1 pt-3 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[var(--muted)] xl:row-start-3">
						<span>
							{typeof totalCount === "number" && totalCount > 0
								? totalCount
								: latest.length}{" "}
							asientos activos
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
