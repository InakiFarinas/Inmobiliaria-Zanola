import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import {
	WHATSAPP_URL,
	PHONE_NUMBER,
	PHONE_LINK,
	EMAIL,
} from "../config/contact";

export default function Layout({ children }) {
	const [menuOpen, setMenuOpen] = useState(false);

	const closeMenu = () => setMenuOpen(false);

	return (
		<div className="app-shell">
			<header className="site-header">
				<Link to="/" className="brand" aria-label="Zanola Inmobiliaria">
					<img
						className="brand-logo"
						src="/images/icons/logocompleto.png"
						alt="Zanola Inmobiliaria"
						decoding="async"
					/>
				</Link>

				<button
					className={`nav-toggle ${menuOpen ? "open" : ""}`}
					aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
					aria-expanded={menuOpen}
					onClick={() => setMenuOpen((v) => !v)}
				>
					<span className="hamburger" aria-hidden="true" />
				</button>

				<nav
					className={`site-nav ${menuOpen ? "site-nav-open" : ""}`}
					aria-label="Navegación principal"
				>
					<NavLink to="/" end onClick={closeMenu}>
						Inicio
					</NavLink>
					<NavLink to="/propiedades" onClick={closeMenu}>
						Propiedades
					</NavLink>
					<NavLink to="/contacto" onClick={closeMenu}>
						Contacto
					</NavLink>
					<NavLink to="/nosotros" onClick={closeMenu}>
						Nosotros
					</NavLink>
				</nav>

				<a
					href={WHATSAPP_URL("Hola, quisiera que me contacten.")}
					target="_blank"
					rel="noreferrer"
					className="button-ghost button"
					aria-label="Contactar por WhatsApp"
				>
					<WhatsAppIcon size={18} />
					<span>WhatsApp</span>
				</a>
			</header>

			<main className="site-main">{children}</main>

			<footer className="site-footer">
				<div className="footer-brand">
					<strong>Zanola Inmobiliaria</strong>
					<p>25 de Mayo 372, Morón, Buenos Aires.</p>
					<p className="footer-hours">Lun–Vie 9 a 18 hs</p>
				</div>
				<div className="footer-links">
					<a href={`tel:${PHONE_LINK}`}>{PHONE_NUMBER}</a>
					<a href={`mailto:${EMAIL}`}>{EMAIL}</a>
					<a
						href={WHATSAPP_URL(
							"Hola, quiero hacer una consulta sobre una propiedad.",
						)}
						target="_blank"
						rel="noreferrer"
						className="footer-whatsapp"
					>
						Escribinos por WhatsApp
					</a>
				</div>
			</footer>
		</div>
	);
}
