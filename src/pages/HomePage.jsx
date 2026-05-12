import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeHero from "../components/home/HomeHero";
import PropertyCard from "../components/properties/PropertyCard";
import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import { getCities, getLatestProperties, getPropertyStates } from "../lib/api";

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
	const [form, setForm] = useState({ ciudad: "", estado: "", precio_max: "" });

	useEffect(() => {
		let active = true;

		Promise.all([getCities(), getPropertyStates(), getLatestProperties(5)])
			.then(([cityData, stateData, propertyData]) => {
				if (!active) return;
				setCities(cityData || []);
				setStates(stateData || []);
				setLatest(propertyData || []);
			})
			.catch((error) => console.error(error));

		return () => {
			active = false;
		};
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const params = new URLSearchParams();
		if (form.ciudad) params.set("ciudad", form.ciudad);
		if (form.estado) params.set("estado", form.estado);
		navigate(`/propiedades${params.toString() ? `?${params.toString()}` : ""}`);
	};

	const handleFormChange = (field, value) => {
		setForm((current) => ({
			...current,
			[field]: value,
		}));
	};

	return (
		<>
			<HomeHero
				cities={cities}
				states={states}
				form={form}
				onFormChange={handleFormChange}
				onSubmit={handleSubmit}
				latest={latest}
			/>

			<section className="mt-6 w-full p-10">
				<SectionHeader
					kicker="Por qué elegirnos"
					title="Propiedades y contacto en un solo lugar"
				/>
				<div className="grid gap-4 xl:grid-cols-3">
					{heroPoints.map((item) => (
						<article
							className="grid gap-3 rounded-[28px] border border-[color:var(--line)] border-l-[4px] border-l-[color:var(--accent)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] backdrop-blur-[18px]"
							key={item.title}
						>
							<h3 className="m-0 text-[1.4rem] font-serif leading-tight">
								{item.title}
							</h3>
							<p>{item.text}</p>
						</article>
					))}
				</div>
			</section>

			<section className="mx-auto w-[min(1180px,calc(100%_-_32px))] p-10">
				<SectionHeader
					align="inline"
					kicker="Últimas propiedades"
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
					<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
						{latest.map((property) => (
							<PropertyCard
								key={property.id_propiedad}
								property={property}
								featured
							/>
						))}
					</div>
				) : (
					<p className="rounded-[28px] border border-[color:var(--line)] bg-[var(--surface)] p-[30px] text-center leading-[1.6] text-[var(--muted)] shadow-[var(--shadow)] backdrop-blur-[18px]">
						No hay propiedades para mostrar todavía.
					</p>
				)}
			</section>

			<section className="mx-auto w-[min(1180px,calc(100%_-_32px))] py-12">
				<div className="rounded-[28px] bg-[var(--accent)] p-6 text-white md:flex md:items-center md:justify-between md:gap-8 md:p-10">
					<div className="mb-6 md:mb-0 md:flex-1">
						<h2 className="m-0 font-serif text-[1.8rem] font-bold leading-tight">
							¿Tenés una propiedad para publicar?
						</h2>
						<p className="m-0 mt-2 text-white/80">
							Te ayudamos a encontrar el mejor comprador o inquilino.
						</p>
					</div>
					<div className="flex flex-wrap gap-3">
						<Button
							to="/"
							variant="ghost"
							className="border border-white/30 hover:bg-white/10"
						>
							Ver más info
						</Button>
						<WhatsAppButton
							message="Hola, quisiera publicar una propiedad."
							className="!bg-white !text-[var(--accent)] px-4"
						>
							Escribinos
						</WhatsAppButton>
					</div>
				</div>
			</section>
		</>
	);
}
