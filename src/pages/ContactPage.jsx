import { useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import FormField from "../components/ui/FormField";
import InfoCard from "../components/ui/InfoCard";
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
						<InfoCard
							title="Dirección"
							icon={
								<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
								</svg>
							}
						>
							<p className="m-0 text-[1.35rem] font-bold">
								25 de Mayo 372, Morón
							</p>
							<small className="text-sm text-muted">Buenos Aires</small>
						</InfoCard>
						<InfoCard
							title="Teléfono"
							icon={
								<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M6.6 10.2a15.05 15.05 0 006.2 6.2l1.8-1.8a1 1 0 011.1-.2c.5.2 1 .3 1.6.3a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h2.2a1 1 0 011 1c0 .6.1.1.3 1.6a1 1 0 01-.2 1.1L6.6 10.2z" />
								</svg>
							}
						>
							<p className="m-0 text-[1.35rem] font-bold">(011) 4489-0000</p>
						</InfoCard>
						<InfoCard
							title="Email"
							icon={
								<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 .5l8 5 8-5V6l-8 5-8-5v.5z" />
								</svg>
							}
						>
							<p className="m-0 text-[1.35rem] font-bold">info@zanola.com.ar</p>
						</InfoCard>
					</ul>
					<div className="border-t border-[color:var(--line)] pt-4 text-center text-muted">
						o contactanos directo
					</div>
					<WhatsAppButton
						message="Hola, quisiera que me contacten."
						className="w-full border-0 py-3 font-black text-white"
					>
						Escribir por WhatsApp
					</WhatsAppButton>
					<div className="rounded-xl bg-black/10 px-3 py-3 font-bold">
						Lun - Vie 9 a 18 hs
					</div>
				</Card>
			</div>
		</section>
	);
}
