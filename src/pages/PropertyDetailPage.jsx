import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import PropertyGallery from "../components/properties/PropertyGallery";
import PropertyMap from "../components/properties/PropertyMap";
import EmptyState from "../components/ui/EmptyState";
import StatGrid from "../components/ui/StatGrid";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import WaxSeal from "../components/icons/WaxSeal";
import { getPropertyById } from "../lib/api";
import { formatAddress, formatFolio, formatPrice } from "../lib/utils";

export default function PropertyDetailPage() {
	const { id } = useParams();
	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!id) {
			setLoading(false);
			setError("ID inválido");
			return;
		}

		let active = true;
		setLoading(true);
		setError("");

		getPropertyById(id)
			.then((data) => {
				if (!active) return;
				setProperty(data);
			})
			.catch((fetchError) => {
				console.error(fetchError);
				if (active) {
					setError("No se pudo cargar la propiedad");
				}
			})
			.finally(() => {
				if (active) setLoading(false);
			});

		return () => {
			active = false;
		};
	}, [id]);

	const address = useMemo(() => formatAddress(property), [property]);

	if (loading) {
		return <EmptyState title="Cargando detalle de la propiedad..." />;
	}

	if (error) {
		return (
			<EmptyState
				title={error}
				action={<Button to="/propiedades">Volver al listado</Button>}
			/>
		);
	}

	if (!property) return null;

	return (
		<Container className="pt-4 md:pt-6">
			<div className="mb-4 md:mb-6 flex flex-wrap items-end justify-between gap-3 md:gap-4">
				<div className="grid gap-2">
					<div className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted)]">
						<Link to="/">Inicio</Link>
						{" › "}
						<Link to="/propiedades">Propiedades</Link>
						{" › "}
						{formatFolio(property.id_propiedad)}
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<h1 className="m-0 font-serif text-[clamp(1.9rem,3vw,3.1rem)] font-medium leading-[1.08] text-[var(--text)]">
							{address}
						</h1>
						{property.destacada ? <WaxSeal size={38} /> : null}
					</div>
					<div className="flex flex-wrap gap-2.5">
						<span className="inline-flex rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[var(--surface)] px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted)]">
							{property.estado || "Venta"}
						</span>
						<span className="inline-flex rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[var(--surface)] px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted)]">
							{property.tipo || "Propiedad"}
						</span>
					</div>
				</div>
				<Link
					to="/propiedades"
					className="font-semibold text-[color:var(--accent)]"
				>
					← Volver al listado
				</Link>
			</div>

			<div className="grid gap-4 md:gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:items-start">
				<div className="grid gap-6">
					<PropertyGallery images={property.imagenes} title={address} />

					<Card className="grid gap-4" padding="md">
						<h2 className="m-0 text-xl font-serif font-medium leading-tight">
							Características
						</h2>
						<StatGrid
							items={[
								{ label: "Tipo", value: property.tipo },
								{ label: "Garaje", value: property.garaje ? "Sí" : "No" },
								{ label: "Baños", value: property.banos },
								{ label: "Ambientes", value: property.ambientes },
								{ label: "Dormitorios", value: property.dormitorios },
								{ label: "Superficie", value: `${property.superficie} m²` },
								{ label: "Antigüedad", value: `${property.antiguedad} años` },
							]}
						/>
					</Card>
				</div>

				<div className="grid gap-4 md:gap-6 lg:sticky lg:top-6">
					<Card className="grid gap-4" padding="md">
						<div className="grid gap-1 border-b border-dashed border-[color:var(--line)] pb-3">
							<span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted)]">
								{property.estado === "Alquiler"
									? "Precio de alquiler"
									: "Precio de venta"}
							</span>
							<strong className="tabular font-serif text-[clamp(2rem,4vw,2.8rem)] font-medium text-[var(--text)]">
								{formatPrice(property)}
							</strong>
						</div>

						<WhatsAppButton
							message={`Hola, me interesa la propiedad en ${address}`}
							className="w-full"
						>
							¡Contactanos!
						</WhatsAppButton>
					</Card>

					<Card className="grid gap-4" padding="md">
						<div className="grid gap-2">
							<h2 className="m-0 text-xl font-serif font-medium leading-tight">
								Descripción
							</h2>
							<p className="m-0 leading-8 text-[var(--muted)]">
								{property.descripcion}
							</p>
						</div>
					</Card>

					<Card className="grid gap-0 overflow-hidden" padding="none">
						<div className="flex items-center justify-between gap-3 border-b border-[color:var(--line)] px-4 py-3">
							<h2 className="m-0 text-base font-semibold">Ubicación</h2>
							<a
								href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-semibold text-[color:var(--accent)]"
							>
								Abrir en Maps →
							</a>
						</div>
						<PropertyMap address={address} />
					</Card>
				</div>
			</div>
		</Container>
	);
}
