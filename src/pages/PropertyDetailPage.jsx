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
			<div className="mb-6 grid gap-4 xl:grid-cols-[1fr_auto] xl:items-end">
				<div>
					<SectionHeader kicker="Detalle" title={address} titleAs="h1" />
				</div>
				<Link
					to="/propiedades"
					className="font-extrabold text-[color:var(--accent)]"
				>
					Volver al listado
				</Link>
			</div>

			<div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
				<PropertyGallery images={property.imagenes} title={address} />

				<Card as="aside" className="grid gap-4" padding="md">
					<div className="grid gap-1">
						<span>
							{property.estado === "Alquiler"
								? "Precio de alquiler"
								: "Precio de venta"}
						</span>
						<strong className="text-[clamp(2rem,4vw,3rem)] font-serif text-carbon">
							${formatPrice(property.precio)}
						</strong>
					</div>

					<p className="leading-8 text-muted">{property.descripcion}</p>

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

					<WhatsAppButton
						message={`Hola, me interesa la propiedad en ${address}`}
						className="w-full"
					>
						¡Contactanos!
					</WhatsAppButton>
				</Card>
			</div>

			<div className="mt-6 grid gap-4">
				<SectionHeader kicker="Ubicación" title="Encontrala en el mapa" />
				<PropertyMap address={address} />
			</div>
		</section>
	);
}
