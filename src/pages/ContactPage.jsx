import { useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import FormField from "../components/ui/FormField";
import InfoCard from "../components/ui/InfoCard";
import {
	LocationIcon,
	PhoneIcon,
	MailIcon,
} from "../components/ui/ContactIcons";
import SectionHeader from "../components/ui/SectionHeader";
import WhatsAppButton from "../components/ui/WhatsAppButton";

export default function ContactPage() {
	const [form, setForm] = useState({
		nombre: "",
		email: "",
		telefono: "",
		descripcion: "",
		intereses: [],
	});
	const [status, setStatus] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((f) => ({ ...f, [name]: value }));
	};

	const interestOptions = [
		"Departamento",
		"Casa",
		"PH",
		"Local",
		"Alquiler",
		"Compra",
	];

	const toggleInterest = (label) => {
		setForm((f) => {
			const has = f.intereses.includes(label);
			return {
				...f,
				intereses: has
					? f.intereses.filter((i) => i !== label)
					: [...f.intereses, label],
			};
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.nombre || !form.email || !form.telefono || !form.descripcion) {
			setStatus("Completá nombre, email, telefono y descripcion.");
			return;
		}

		setStatus("Enviando...");

		try {
			await new Promise((r) => setTimeout(r, 700));
			setStatus("Consulta enviada. Te respondemos a la brevedad.");
			setForm({
				nombre: "",
				email: "",
				telefono: "",
				descripcion: "",
				intereses: [],
			});
		} catch (err) {
			setStatus("Error al enviar. Intentá de nuevo.");
		}
	};

	return (
		<section className="mx-auto w-[min(1180px,calc(100%_-_32px))] pt-6">
			<SectionHeader
				className="mb-4"
				kicker="Contacto"
				title="Escribinos"
				titleAs="h1"
				description="Te respondemos a la brevedad en horario comercial."
			/>

			<div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
				<Card
					as="form"
					className="grid gap-4"
					onSubmit={handleSubmit}
					padding="md"
				>
					<h2 className="m-0 font-serif text-2xl leading-none">
						Envianos un mensaje
					</h2>
					<div className="grid gap-2">
						<label className="text-sm font-bold text-muted">Me interesa</label>
						<div className="flex flex-wrap gap-2">
							{interestOptions.map((opt) => {
								const active = form.intereses.includes(opt);
								return (
									<Button
										key={opt}
										type="button"
										variant="pill"
										active={active}
										onClick={() => toggleInterest(opt)}
									>
										{opt}
									</Button>
								);
							})}
						</div>
					</div>
					<div className="grid gap-3 md:grid-cols-2">
						<FormField
							label="Nombre"
							name="nombre"
							placeholder="Tu nombre"
							value={form.nombre}
							onChange={handleChange}
						/>
						<FormField
							label="Email"
							name="email"
							type="email"
							placeholder="tu@email.com"
							value={form.email}
							onChange={handleChange}
						/>
						<FormField
							label="Telefono"
							name="telefono"
							type="tel"
							placeholder="11 1234-5678"
							value={form.telefono}
							onChange={handleChange}
						/>
						<FormField
							label="Descripcion del mensaje"
							as="textarea"
							name="descripcion"
							rows={6}
							placeholder="Contanos en que podemos ayudarte..."
							value={form.descripcion}
							onChange={handleChange}
							labelClassName="md:col-span-2"
						/>
					</div>

					<Button type="submit" className="w-full md:w-auto">
						Enviar consulta
					</Button>
					{status ? <p>{status}</p> : null}
				</Card>

				<Card as="aside" className="grid gap-4" padding="md">
					<h2 className="m-0 font-serif text-2xl leading-none">
						Información de contacto
					</h2>
					<ul className="grid gap-4 p-0 m-0 list-none">
						<InfoCard title="Dirección" icon={<LocationIcon />}>
							<p className="m-0 text-[1.35rem] font-bold">
								25 de Mayo 372, Morón
							</p>
							<small className="text-sm text-muted">Buenos Aires</small>
						</InfoCard>
						<InfoCard title="Teléfono" icon={<PhoneIcon />}>
							<p className="m-0 text-[1.35rem] font-bold">(011) 4489-0000</p>
						</InfoCard>
						<InfoCard title="Email" icon={<MailIcon />}>
							<p className="m-0 text-[1.35rem] font-bold">info@zanola.com.ar</p>
						</InfoCard>
					</ul>
					<div className="border-t border-[color:var(--line)] pt-4 text-center text-muted">
						o contactanos directo
					</div>
					<WhatsAppButton
						message="Hola, quisiera que me contacten."
						className="w-full border-0 py-3 font-black"
						style={{ backgroundColor: "var(--cta-dark)", color: "white" }}
					>
						Escribinos por WhatsApp
					</WhatsAppButton>
				</Card>
			</div>
		</section>
	);
}
