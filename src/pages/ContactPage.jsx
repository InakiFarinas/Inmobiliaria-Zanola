import { useState } from "react";
import { WHATSAPP_URL } from "../config/contact";

export default function ContactPage() {
	const [form, setForm] = useState({
		nombre: "",
		email: "",
		telefono: "",
		descripcion: "",
	});
	const [status, setStatus] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((f) => ({ ...f, [name]: value }));
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
			setForm({ nombre: "", email: "", telefono: "", descripcion: "" });
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
					<h2>Informacion de contacto</h2>
					<ul className="contact-info-list">
						<li>
							<span className="info-icon" aria-hidden="true">
								📍
							</span>
							<div>
								<strong>Direccion</strong>
								<p>25 de Mayo 372, Moron</p>
								<small>Buenos Aires</small>
							</div>
						</li>
						<li>
							<span className="info-icon" aria-hidden="true">
								📞
							</span>
							<div>
								<strong>Telefono</strong>
								<p>(011) 4489-0000</p>
							</div>
						</li>
						<li>
							<span className="info-icon" aria-hidden="true">
								✉️
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
