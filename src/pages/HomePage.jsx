import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeHero from "../components/home/HomeHero";
import PropertyCard from "../components/properties/PropertyCard";
import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import Reveal from "../components/ui/Reveal";
import EmptyState from "../components/ui/EmptyState";
import {
	getCities,
	getLatestProperties,
	getPropertyStates,
	getPropertiesCount,
} from "../lib/api";

const heroPoints = [
	{
		title: "Morón Sur y Morón Centro",
		text: "Propiedades en las zonas más buscadas de Morón, con alternativas de venta y alquiler.",
	},
	{
		title: "Casa, departamento y local",
		text: "Publicaciones activas en los rubros que la inmobiliaria trabaja de forma habitual.",
	},
	{
		title: "Atención directa",
		text: "Teléfono, WhatsApp y correo publicados para consultas rápidas.",
	},
];

export default function HomePage() {
	const navigate = useNavigate();
	const [cities, setCities] = useState([]);
	const [states, setStates] = useState([]);
	const [latest, setLatest] = useState([]);
	const [totalCount, setTotalCount] = useState(0);
	const [form, setForm] = useState({ ciudad: "", estado: "", precio_max: "" });
	const [error, setError] = useState(null);

	useEffect(() => {
		let active = true;

		Promise.all([
			getCities(),
			getPropertyStates(),
			getLatestProperties(5),
			getPropertiesCount(),
		])
			.then(([cityData, stateData, propertyData, count]) => {
				if (!active) return;
				setCities(cityData || []);
				setStates(stateData || []);
				setLatest(propertyData || []);
				setTotalCount(count || 0);
			})
			.catch((error) => {
				console.error(error);
				if (active) setError("No pudimos cargar el contenido.");
			});

		return () => {
			active = false;
		};
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const params = new URLSearchParams();
		if (form.ciudad) params.set("ciudad", form.ciudad);
		if (form.estado) params.set("estado", form.estado);
		if (form.precio_max) params.set("precio_max", form.precio_max);
		navigate(`/propiedades${params.toString() ? `?${params.toString()}` : ""}`);
	};

	const handleFormChange = (field, value) => {
		setForm((current) => ({
			...current,
			[field]: value,
		}));
	};

	if (error) return <EmptyState title={error} />;

	return (
		<>
			<HomeHero
				cities={cities}
				states={states}
				form={form}
				onFormChange={handleFormChange}
				onSubmit={handleSubmit}
				latest={latest}
				totalCount={totalCount}
			/>

			<section className="mt-6 w-full p-6 md:p-10">
				<SectionHeader
					kicker="Por qué elegirnos"
					title="Propiedades y contacto en un solo lugar"
				/>
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{heroPoints.map((item, i) => (
						<Reveal key={item.title} delay={i * 100}>
							<article className="grid gap-3 rounded-[28px] border border-[color:var(--line)] border-l-[4px] border-l-[color:var(--accent)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] backdrop-blur-[18px]">
								<h3 className="m-0 text-[1.4rem] font-serif leading-tight">
									{item.title}
								</h3>
								<p>{item.text}</p>
							</article>
						</Reveal>
					))}
				</div>
			</section>
			<div className="flex items-center gap-3 my-8">
				<div className="flex-1 h-px bg-black/10" />
				<span className="text-[16px] tracking-[2px] text-[color:var(--accent)] font-bold whitespace-nowrap">
					ÚLTIMAS PROPIEDADES
				</span>
				<div className="flex-1 h-px bg-black/10" />
			</div>

			<section className="mt-6 w-full p-10">
				<SectionHeader
					align="inline"
					title="Nuevas oportunidades"
					action={
						<Link
							to="/propiedades"
							className="font-extrabold text-[color:var(--accent)]"
						>
							Ver todas
						</Link>
					}
				/>

				{latest.length > 0 ? (
					<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
						{latest.map((property, i) => (
							<Reveal key={property.id_propiedad} delay={i * 100}>
								<PropertyCard property={property} />
							</Reveal>
						))}
					</div>
				) : (
					<p className="rounded-[28px] border border-[color:var(--line)] bg-[var(--surface)] p-[30px] text-center leading-[1.6] text-[var(--muted)] shadow-[var(--shadow)] backdrop-blur-[18px]">
						No hay propiedades para mostrar todavía.
					</p>
				)}
			</section>

			<section className="mx-auto w-[min(1180px,calc(100%_-_24px))] md:w-[min(1180px,calc(100%_-_32px))] py-8 md:py-12">
				<div className="rounded-[28px] bg-[var(--accent)] p-6 md:p-10 text-white md:flex md:items-center md:justify-between md:gap-8">
					<div className="mb-6 md:mb-0 md:flex-1">
						<h2 className="m-0 font-serif text-2xl md:text-3xl font-bold leading-tight">
							¿Tenés una propiedad para publicar?
						</h2>
						<p className="m-0 mt-2 text-white/80">
							Te ayudamos a encontrar el mejor comprador o inquilino.
						</p>
					</div>
					<div className="flex flex-wrap gap-2 md:gap-3">
						<Button
							to="/"
							variant="ghost"
							className="border border-white/30 hover:bg-white/10 text-sm md:text-base"
						>
							Ver más info
						</Button>
						<WhatsAppButton
							message="Hola, quisiera publicar una propiedad."
							className="!bg-white !text-[var(--accent)] px-3 md:px-4 text-sm md:text-base"
						>
							Escribinos
						</WhatsAppButton>
					</div>
				</div>
			</section>
		</>
	);
}
