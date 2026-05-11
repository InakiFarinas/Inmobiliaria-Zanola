import { useState } from "react";
import { WHATSAPP_URL } from "../config/contact";

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
		<section className="section-block section-block-wide contact-page">
			<div className="section-heading">
				<span className="section-kicker">Contacto</span>
				<h1>Escribinos</h1>
				<p className="contact-intro">
					Te respondemos a la brevedad en horario comercial.
				</p>
			</div>

			<div className="contact-layout">
				<form className="contact-card contact-form" onSubmit={handleSubmit}>
					<h2>Envianos un mensaje</h2>
					<div className="interest-block">
						<label className="label-inline">Me interesa</label>
						<div className="interest-chips">
							{interestOptions.map((opt) => {
								const active = form.intereses.includes(opt);
								return (
									<button
										type="button"
										key={opt}
										className={"chip " + (active ? "active" : "")}
										onClick={() => toggleInterest(opt)}
									>
										{opt}
									</button>
								);
							})}
						</div>
					</div>
					<div className="contact-grid">
						<label>
							Nombre
							<input
								name="nombre"
								placeholder="Tu nombre"
								value={form.nombre}
								onChange={handleChange}
							/>
						</label>
						<label>
							Email
							<input
								name="email"
								type="email"
								placeholder="tu@email.com"
								value={form.email}
								onChange={handleChange}
							/>
						</label>
						<label>
							Telefono
							<input
								name="telefono"
								type="tel"
								placeholder="11 1234-5678"
								value={form.telefono}
								onChange={handleChange}
							/>
						</label>
						<label className="full-row">
							Descripcion del mensaje
							<textarea
								name="descripcion"
								rows={6}
								placeholder="Contanos en que podemos ayudarte..."
								value={form.descripcion}
								onChange={handleChange}
							/>
						</label>
					</div>

					<button type="submit" className="button contact-submit">
						Enviar consulta
					</button>
					{status ? <p className="contact-status">{status}</p> : null}
				</form>

				<aside className="contact-card contact-info">
					<h2>Información de contacto</h2>
					<ul className="contact-info-list">
						<li>
							<span className="info-icon" aria-hidden="true">
								<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
								</svg>
							</span>
							<div>
								<strong>Dirección</strong>
								<p>25 de Mayo 372, Morón</p>
								<small>Buenos Aires</small>
							</div>
						</li>
						<li>
							<span className="info-icon" aria-hidden="true">
								<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M6.6 10.2a15.05 15.05 0 006.2 6.2l1.8-1.8a1 1 0 011.1-.2c.5.2 1 .3 1.6.3a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h2.2a1 1 0 011 1c0 .6.1 1.1.3 1.6a1 1 0 01-.2 1.1L6.6 10.2z" />
								</svg>
							</span>
							<div>
								<strong>Teléfono</strong>
								<p>(011) 4489-0000</p>
							</div>
						</li>
						<li>
							<span className="info-icon" aria-hidden="true">
								<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 .5l8 5 8-5V6l-8 5-8-5v.5z" />
								</svg>
							</span>
							<div>
								<strong>Email</strong>
								<p>info@zanola.com.ar</p>
							</div>
						</li>
					</ul>
					<div className="contact-divider">o contactanos directo</div>
					<a
						href={WHATSAPP_URL("Hola, quisiera que me contacten.")}
						target="_blank"
						rel="noreferrer"
						className="button contact-whatsapp"
					>
						Escribir por WhatsApp
					</a>
					<div className="contact-hours">Lun - Vie 9 a 18 hs</div>
				</aside>
			</div>
		</section>
	);
}
