import { Link, NavLink } from "react-router-dom";
import WhatsAppButton from "../ui/WhatsAppButton";
import { EMAIL, PHONE_LINK, PHONE_NUMBER } from "../../config/contact";

const linkClassName = ({ isActive }) =>
	[
		"rounded-full px-3 py-2 text-white/90 transition-colors transition-transform duration-200 hover:bg-white/20 hover:text-white",
		isActive ? "bg-white/20 text-white" : "",
	].join(" ");

export default function SiteChrome({
	children,
	menuOpen,
	onToggleMenu,
	onCloseMenu,
}) {
	const navClassName = [
		menuOpen ? "flex" : "hidden",
		"absolute left-0 right-0 top-[var(--header-height)] z-40 flex-col gap-3 bg-[var(--accent)] px-[18px] pb-[18px] pt-3 md:static md:z-auto md:flex md:flex-row md:justify-center md:gap-2.5 md:bg-transparent md:p-0",
	].join(" ");

	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-20 grid h-[var(--header-height)] grid-cols-[auto,1fr,auto] items-center gap-4 bg-[var(--accent)] px-4 text-white shadow-[0_18px_36px_rgba(26,26,26,0.12)] backdrop-blur-[20px] max-[1080px]:grid-cols-1 max-[1080px]:justify-items-center">
				<Link
					to="/"
					className="inline-flex min-w-0 items-center gap-3"
					aria-label="Zanola Inmobiliaria"
				>
					<img
						src="/images/icons/logocompleto.png"
						alt="Zanola Inmobiliaria"
						decoding="async"
					/>
				</Link>

				<button
					className="inline-flex h-11 w-11 items-center justify-center border-0 bg-transparent md:hidden"
					aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
					aria-expanded={menuOpen}
					onClick={onToggleMenu}
				>
					<span
						aria-hidden="true"
						className="relative block h-[2px] w-[22px] bg-white before:absolute before:left-0 before:top-[-7px] before:h-[2px] before:w-[22px] before:bg-white after:absolute after:left-0 after:top-[7px] after:h-[2px] after:w-[22px] after:bg-white"
					/>
				</button>

				<nav className={navClassName} aria-label="Navegación principal">
					<NavLink to="/" end onClick={onCloseMenu} className={linkClassName}>
						Inicio
					</NavLink>
					<NavLink
						to="/propiedades"
						onClick={onCloseMenu}
						className={linkClassName}
					>
						Propiedades
					</NavLink>
					<NavLink
						to="/contacto"
						onClick={onCloseMenu}
						className={linkClassName}
					>
						Contacto
					</NavLink>
					<NavLink
						to="/nosotros"
						onClick={onCloseMenu}
						className={linkClassName}
					>
						Nosotros
					</NavLink>
				</nav>

				<WhatsAppButton
					message="Hola, quisiera que me contacten."
					className="justify-center whitespace-nowrap px-4"
					onClick={onCloseMenu}
				>
					WhatsApp
				</WhatsAppButton>
			</header>

			<main className="flex-1 pb-[72px]">{children}</main>

			<footer className="mt-8 flex justify-between gap-[18px] rounded-none border-0 bg-[var(--accent)] px-7 py-[18px] text-white backdrop-blur-[18px] max-[720px]:flex-col max-[720px]:items-start">
				<div className="grid gap-1.5">
					<strong>Zanola Inmobiliaria</strong>
					<p>25 de Mayo 372, Morón, Buenos Aires.</p>
					<p className="text-[0.92rem] text-white/80">Lun–Vie 9 a 18 hs</p>
				</div>
				<div className="flex flex-wrap items-center gap-4 max-[720px]:w-full">
					<a href={`tel:${PHONE_LINK}`}>{PHONE_NUMBER}</a>
					<a href={`mailto:${EMAIL}`}>{EMAIL}</a>
					<WhatsAppButton
						message="Hola, quiero hacer una consulta sobre una propiedad."
						className="justify-center whitespace-nowrap px-3.5 py-2 text-white"
					>
						Escribinos por WhatsApp
					</WhatsAppButton>
				</div>
			</footer>
		</div>
	);
}
