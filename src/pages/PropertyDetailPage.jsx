import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PropertyGallery from "../components/properties/PropertyGallery";
import PropertyMap from "../components/properties/PropertyMap";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";
import StatGrid from "../components/ui/StatGrid";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import { getPropertyById } from "../lib/api";

function formatPrice(value) {
	return new Intl.NumberFormat("es-AR").format(Number(value || 0));
}

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
				if (!active) {
					return;
				}
				setProperty(data);
			})
			.catch((fetchError) => {
				if (active) {
					setError(fetchError.message || "No se pudo cargar la propiedad");
				}
			})
			.finally(() => {
				if (active) {
					setLoading(false);
				}
			});

		return () => {
			active = false;
		};
	}, [id]);

	const address = useMemo(() => {
		if (!property) {
			return "";
		}
		return `${property.ciudad}, ${property.calle} ${property.altura}`;
	}, [property]);

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

	if (!property) {
		return null;
	}

	return (
		<section className="mx-auto w-[min(1180px,calc(100%_-_32px))] pt-6">
			<div className="mb-6 flex flex-wrap items-end justify-between gap-4">
				<div className="grid gap-3">
					<div className="text-sm text-[var(--muted)]">
						<Link to="/">Inicio</Link>
						{" > "}
						<Link to="/propiedades">Propiedades</Link>
						{" > "}
						{address}
					</div>
					<SectionHeader title={address} titleAs="h1" />
					<div className="flex flex-wrap gap-2.5">
						<span className="inline-flex rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[color:var(--accent)]">
							{property.estado || "Venta"}
						</span>
						<span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--text)] shadow-[0_6px_16px_rgba(26,26,26,0.06)]">
							{property.tipo || "Propiedad"}
						</span>
					</div>
				</div>
				<Link
					to="/propiedades"
					className="font-extrabold text-[color:var(--accent)]"
				>
					Volver al listado
				</Link>
			</div>

			<div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] xl:items-start">
				<div className="grid gap-6">
					<PropertyGallery images={property.imagenes} title={address} />

					<Card className="grid gap-4" padding="md">
						<h2 className="m-0 text-xl font-serif leading-tight">
							Características
						</h2>
						<StatGrid
							items={[
								{ label: "Tipo", value: property.tipo },
								{ label: "Garaje", value: property.garaje === 1 ? "Sí" : "No" },
								{ label: "Baños", value: property.baños },
								{ label: "Ambientes", value: property.ambientes },
								{ label: "Dormitorios", value: property.dormitorios },
								{ label: "Superficie", value: `${property.superficie} m²` },
								{ label: "Antigüedad", value: `${property.antiguedad} años` },
							]}
						/>
					</Card>
				</div>

				<div className="grid gap-6 xl:sticky xl:top-6">
					<Card as="aside" className="grid gap-4" padding="md">
						<div className="grid gap-1">
							<span className="text-sm text-[var(--muted)]">
								{property.estado === "Alquiler"
									? "Precio de alquiler"
									: "Precio de venta"}
							</span>
							<strong className="text-[clamp(2rem,4vw,3rem)] font-black text-[var(--text)]">
								${formatPrice(property.precio)}
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
							<h2 className="m-0 text-xl font-serif leading-tight">
								Descripción
							</h2>
							<p className="m-0 leading-8 text-[var(--muted)]">
								{property.descripcion}
							</p>
						</div>
					</Card>

					<Card className="grid gap-0 overflow-hidden" padding="none">
						<div className="flex items-center justify-between gap-3 border-b border-[color:var(--line)] px-4 py-3">
							<h2 className="m-0 text-base font-extrabold">Ubicación</h2>
							<span className="text-sm text-[var(--accent)]">
								Abrir en Maps →
							</span>
						</div>
						<PropertyMap address={address} />
					</Card>
				</div>
			</div>
		</section>
	);
}
