import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import WhatsAppButton from "../components/ui/WhatsAppButton";

export default function NotFoundPage() {
	return (
		<section className="mx-auto w-[min(1180px,calc(100%_-_24px))] md:w-[min(1180px,calc(100%_-_32px))] pt-4 md:pt-6 pb-8 md:pb-12">
			<div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-center">
				<div className="grid gap-5">
					<span className="inline-flex w-fit rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[color:var(--accent)]">
						Página no encontrada
					</span>
					<div className="grid gap-2">
						<p className="m-0 text-[clamp(4rem,12vw,8rem)] font-black leading-none text-[color:var(--accent)]">
							404
						</p>
						<h1 className="m-0 font-serif text-[clamp(2rem,4vw,3.8rem)] leading-[1.02] text-[var(--text)]">
							No encontramos esa página.
						</h1>
						<p className="m-0 max-w-[60ch] text-[1.02rem] leading-7 text-[var(--muted)]">
							La URL no existe, cambió de lugar o se escribió con un error.
							Podés volver al inicio, revisar las propiedades o escribirnos
							directo.
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<Link
							to="/"
							className="inline-flex items-center justify-center rounded-full bg-[var(--cta-dark)] px-4 py-2 font-extrabold text-white shadow-[0_16px_38px_rgba(26,26,26,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
						>
							Volver al inicio
						</Link>
						<Link
							to="/propiedades"
							className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-white/90 px-4 py-2 font-extrabold text-[var(--text)] shadow-[0_16px_38px_rgba(26,26,26,0.12)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white"
						>
							Ver propiedades
						</Link>
						<WhatsAppButton
							message="Hola, entré en una página que no existe y quiero consultar una propiedad."
							className="px-4"
						>
							Escribinos
						</WhatsAppButton>
					</div>
				</div>

				<Card className="grid gap-4 overflow-hidden" padding="md">
					<SectionHeader
						kicker="Accesos rápidos"
						title="Seguí navegando"
						description="Atajos para volver a las secciones principales del sitio."
					/>

					<div className="grid gap-3 md:grid-cols-2">
						<Link
							to="/propiedades"
							className="rounded-[24px] border border-[color:var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition-transform duration-200 hover:-translate-y-0.5"
						>
							<p className="m-0 text-sm font-extrabold uppercase tracking-[0.08em] text-[color:var(--accent)]">
								Propiedades
							</p>
							<p className="m-0 mt-2 text-[1.02rem] leading-7 text-[var(--muted)]">
								Explorá casas, departamentos y locales publicados.
							</p>
						</Link>
						<Link
							to="/contacto"
							className="rounded-[24px] border border-[color:var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition-transform duration-200 hover:-translate-y-0.5"
						>
							<p className="m-0 text-sm font-extrabold uppercase tracking-[0.08em] text-[color:var(--accent)]">
								Contacto
							</p>
							<p className="m-0 mt-2 text-[1.02rem] leading-7 text-[var(--muted)]">
								Mandanos tu consulta y te respondemos a la brevedad.
							</p>
						</Link>
					</div>
				</Card>
			</div>
		</section>
	);
}
