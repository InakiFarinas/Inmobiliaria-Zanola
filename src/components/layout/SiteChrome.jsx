import { Link, NavLink } from "react-router-dom";
import WhatsAppButton from "../ui/WhatsAppButton";
import { EMAIL, PHONE_LINK, PHONE_NUMBER } from "../../config/contact";
import { LocationIcon, PhoneIcon, MailIcon } from "../ui/ContactIcons";

const linkClassName = ({ isActive }) =>
	[
		"rounded-full px-3 py-2 text-sm md:text-base text-white/90 transition-colors transition-transform duration-200 hover:bg-white/20 hover:text-white",
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
		"absolute left-0 right-0 top-[var(--header-height)] z-40 flex-col gap-2.5 bg-[var(--accent)] px-3 pb-3 pt-2 md:static md:z-auto md:order-2 md:flex md:flex-row md:justify-center md:gap-2.5 md:bg-transparent md:p-0",
	].join(" ");

	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-20 grid h-[var(--header-height)] grid-cols-[1fr,auto] md:grid-cols-[auto,1fr,auto] items-center gap-3 md:gap-4 bg-[var(--accent)] px-3 md:px-4 text-white shadow-[0_18px_36px_rgba(26,26,26,0.12)] backdrop-blur-[20px]">
				<Link
					to="/"
					className="inline-flex min-w-0 items-center gap-3 md:order-1"
					aria-label="Zanola Inmobiliaria"
				>
					<img
						src="/images/icons/logocompleto.png"
						alt="Zanola Inmobiliaria"
						width="210"
						height="96"
						decoding="async"
					/>
				</Link>

				<button
					className="inline-flex h-10 w-10 items-center justify-center border-0 bg-transparent md:hidden md:order-2"
					aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
					aria-expanded={menuOpen}
					onClick={onToggleMenu}
				>
					<span
						aria-hidden="true"
						className="relative block h-[2px] w-5 bg-white before:absolute before:left-0 before:top-[-6px] before:h-[2px] before:w-5 before:bg-white after:absolute after:left-0 after:top-[6px] after:h-[2px] after:w-5 after:bg-white"
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
					className="hidden md:inline-flex md:order-3 justify-center whitespace-nowrap px-4"
					onClick={onCloseMenu}
				>
					WhatsApp
				</WhatsAppButton>
			</header>

			<main className="flex-1 pb-[72px]">{children}</main>

			<footer className="mt-8 bg-[var(--accent)] px-6 py-6 text-white md:px-10 md:py-8">
				<div className=" grid w-full gap-6 lg:grid-cols-[1.15fr_0.85fr_0.7fr_1fr] lg:gap-6 items-start">
					<div className="grid gap-5">
						<div className="grid gap-3">
							<img
								src="/images/icons/logocompleto.png"
								alt="Zanola Inmobiliaria"
								className="w-[140px] max-w-full"
								width="420"
								height="96"
								decoding="async"
							/>
							<p className="max-w-[28ch] text-[1.08rem] leading-8 text-white/72">
								Inmobiliaria familiar con más de 30 años en el Partido de Morón.
							</p>
						</div>
						<div className="flex gap-3">
							<a
								href="https://www.instagram.com"
								aria-label="Instagram"
								className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/18 text-white/80 transition hover:border-white/40 hover:text-white"
							>
								<svg
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.9"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<rect x="3" y="3" width="18" height="18" rx="5" />
									<circle cx="12" cy="12" r="4" />
									<circle
										cx="17.5"
										cy="6.5"
										r="1"
										fill="currentColor"
										stroke="none"
									/>
								</svg>
							</a>
							<a
								href="https://www.facebook.com"
								aria-label="Facebook"
								className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/18 text-white/80 transition hover:border-white/40 hover:text-white"
							>
								<svg
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.9"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
								</svg>
							</a>
						</div>
					</div>

					<div className="grid gap-4">
						<h2 className="text-[1.05rem] font-extrabold uppercase tracking-[0.12em] text-white">
							Encontrá lo que buscás
						</h2>
						<ul className="grid gap-3 text-[1.06rem] text-white/72">
							<li>
								<a
									href="/propiedades?tipo=Departamento"
									className="transition hover:text-white"
								>
									Departamentos
								</a>
							</li>
							<li>
								<a
									href="/propiedades?tipo=Casa"
									className="transition hover:text-white"
								>
									Casas
								</a>
							</li>
							<li>
								<a
									href="/propiedades?tipo=PH"
									className="transition hover:text-white"
								>
									PH
								</a>
							</li>
							<li>
								<a
									href="/propiedades?tipo=Lote"
									className="transition hover:text-white"
								>
									Lotes
								</a>
							</li>
							<li>
								<a
									href="/propiedades?tipo=Local"
									className="transition hover:text-white"
								>
									Locales
								</a>
							</li>
						</ul>
					</div>

					<div className="grid gap-4">
						<h2 className="text-[1.05rem] font-extrabold uppercase tracking-[0.12em] text-white">
							Menú
						</h2>
						<nav className="grid gap-3 text-[1.06rem] text-white/72">
							<NavLink to="/" end className="transition hover:text-white">
								Inicio
							</NavLink>
							<NavLink
								to="/propiedades"
								className="transition hover:text-white"
							>
								Propiedades
							</NavLink>
							<NavLink to="/contacto" className="transition hover:text-white">
								Contacto
							</NavLink>
							<NavLink to="/nosotros" className="transition hover:text-white">
								Quiénes somos
							</NavLink>
						</nav>
					</div>

					<div className="grid gap-4">
						<h2 className="text-[1.05rem] font-extrabold uppercase tracking-[0.12em] text-white">
							Contacto
						</h2>
						<div className="grid gap-3 text-[1.02rem] text-white/80">
							<div className="flex items-center gap-3">
								<span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
									<LocationIcon />
								</span>
								<span>25 de Mayo 372 – Morón</span>
							</div>
							<div className="flex items-center gap-3">
								<span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
									<PhoneIcon />
								</span>
								<span>{PHONE_NUMBER}</span>
							</div>
							<div className="flex items-center gap-3">
								<span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
									<MailIcon />
								</span>
								<span>{EMAIL}</span>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-8 flex w-full flex-col gap-3 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
					<p className="text-[0.95rem] text-white/55">
						© 2026 Zanola Propiedades · Morón, Buenos Aires
					</p>
					<WhatsAppButton
						message="Hola, quiero hacer una consulta sobre una propiedad."
						className="justify-center whitespace-nowrap px-3 py-2"
					>
						Escribinos
					</WhatsAppButton>
				</div>
			</footer>
		</div>
	);
}
