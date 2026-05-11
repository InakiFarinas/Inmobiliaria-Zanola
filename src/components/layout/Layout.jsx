import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import {
	WHATSAPP_URL,
	PHONE_NUMBER,
	PHONE_LINK,
	EMAIL,
} from "../../config/contact";

export default function Layout({ children }) {
	const [menuOpen, setMenuOpen] = useState(false);

	const closeMenu = () => setMenuOpen(false);

	return (
		<div className="app-shell">
			<header
				className={`site-header bg-cazador text-white sticky top-0 z-20 grid grid-cols-[auto,1fr,auto] items-center gap-4 px-4`}
			>
				<Link
					to="/"
					className="brand flex items-center gap-3"
					aria-label="Zanola Inmobiliaria"
				>
					<img
						className="brand-logo max-h-14"
						src="/images/icons/logocompleto.png"
						alt="Zanola Inmobiliaria"
						decoding="async"
					/>
				</Link>

				<button
					className={`nav-toggle ${menuOpen ? "open" : ""} md:hidden`}
					aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
					aria-expanded={menuOpen}
					onClick={() => setMenuOpen((v) => !v)}
				>
					<span className="hamburger" aria-hidden="true" />
				</button>

				<nav
					className={`site-nav ${menuOpen ? "site-nav-open" : ""} justify-center md:justify-start`}
					aria-label="Navegación principal"
				>
					<NavLink
						to="/"
						end
						onClick={closeMenu}
						className={({ isActive }) =>
							`px-3 py-2 rounded-full text-white/90 ${isActive ? "bg-white/12" : ""}`
						}
					>
						Inicio
					</NavLink>
					<NavLink
						to="/propiedades"
						onClick={closeMenu}
						className={({ isActive }) =>
							`px-3 py-2 rounded-full text-white/90 ${isActive ? "bg-white/12" : ""}`
						}
					>
						Propiedades
					</NavLink>
					<NavLink
						to="/contacto"
						onClick={closeMenu}
						className={({ isActive }) =>
							`px-3 py-2 rounded-full text-white/90 ${isActive ? "bg-white/12" : ""}`
						}
					>
						Contacto
					</NavLink>
					<NavLink
						to="/nosotros"
						onClick={closeMenu}
						className={({ isActive }) =>
							`px-3 py-2 rounded-full text-white/90 ${isActive ? "bg-white/12" : ""}`
						}
					>
						Nosotros
					</NavLink>
				</nav>

				<a
					href={WHATSAPP_URL("Hola, quisiera que me contacten.")}
					target="_blank"
					rel="noreferrer"
					className="button-ghost button btn btn-whatsapp"
					aria-label="Contactar por WhatsApp"
				>
					<WhatsAppIcon size={18} />
					<span>WhatsApp</span>
				</a>
			</header>

			<main className="site-main">{children}</main>

			<footer className="site-footer bg-cazador text-white p-6 mt-8">
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
						className="footer-whatsapp btn btn-whatsapp ml-4"
					>
						Escribinos por WhatsApp
					</a>
				</div>
			</footer>
		</div>
	);
}
