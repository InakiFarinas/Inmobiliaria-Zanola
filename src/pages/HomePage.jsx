import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeHero from "../components/home/HomeHero";
import PropertyCard from "../components/properties/PropertyCard";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
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

			<Container className="pt-10 md:pt-14">
				<SectionHeader
					title="Propiedades y contacto en un solo lugar"
				/>
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{heroPoints.map((item, i) => (
						<Reveal key={item.title} delay={i * 100}>
							<Card
								as="article"
								className="grid gap-3"
							>
								<h3 className="m-0 text-[1.4rem] font-serif font-medium leading-tight">
									{item.title}
								</h3>
								<p>{item.text}</p>
							</Card>
						</Reveal>
					))}
				</div>
			</Container>

			<Container
				as="div"
				className="my-10 md:my-14 flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--muted)]"
			>
				<div className="flex-1 border-t border-dashed border-[color:var(--line)]" />
				<span className="whitespace-nowrap">§ Últimas propiedades</span>
				<div className="flex-1 border-t border-dashed border-[color:var(--line)]" />
			</Container>

			<Container>
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
						{latest.map((property) => (
							<PropertyCard key={property.id_propiedad} property={property} />
						))}
					</div>
				) : (
					<EmptyState title="No hay propiedades para mostrar todavía." />
				)}
			</Container>

			<Container className="py-8 md:py-12">
				<div className="border-t-2 border-[var(--gold)] bg-[var(--cta-dark)] p-6 md:p-10 text-white md:flex md:items-center md:justify-between md:gap-8">
					<div className="mb-6 md:mb-0 md:flex-1">
						<h2 className="m-0 font-serif text-2xl md:text-3xl font-medium leading-tight">
							¿Tenés una propiedad para publicar?
						</h2>
						<p className="m-0 mt-2 text-white/80">
							Te ayudamos a encontrar el mejor comprador o inquilino.
						</p>
					</div>
					<div className="flex flex-wrap gap-2 md:gap-3">
						<Button
							to="/nosotros"
							variant="ghost"
							className="border border-white/30 hover:bg-white/10 text-sm md:text-base"
						>
							Ver más info
						</Button>
						<WhatsAppButton
							message="Hola, quisiera publicar una propiedad."
							className="px-3 md:px-4 text-sm md:text-base"
						>
							Escribinos
						</WhatsAppButton>
					</div>
				</div>
			</Container>
		</>
	);
}
