import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import WhatsAppButton from "../components/ui/WhatsAppButton";

export default function NotFoundPage() {
	return (
		<Container className="pt-4 md:pt-6 pb-8 md:pb-12">
			<div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-center">
				<div className="grid gap-5">
					<div className="grid gap-2">
						<p className="m-0 font-serif text-[clamp(4rem,12vw,8rem)] font-medium leading-none text-[color:var(--accent)]">
							404
						</p>
						<h1 className="m-0 font-serif text-[clamp(2rem,4vw,3.8rem)] font-medium leading-[1.02] text-[var(--text)]">
							No encontramos esa página.
						</h1>
						<p className="m-0 max-w-[60ch] text-[1.02rem] leading-7 text-[var(--muted)]">
							La URL no existe, cambió de lugar o se escribió con un error.
							Podés volver al inicio, revisar las propiedades o escribirnos
							directo.
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<Button to="/">Volver al inicio</Button>
						<Button to="/propiedades" variant="pill">
							Ver propiedades
						</Button>
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
						title="Seguí navegando"
						description="Atajos para volver a las secciones principales del sitio."
					/>

					<div className="grid gap-3 md:grid-cols-2">
						<Link
							to="/propiedades"
							className="rounded-[var(--radius-lg)] border border-[color:var(--line)] bg-[var(--surface)] p-5 [box-shadow:var(--shadow)] transition-transform duration-200 hover:-translate-y-0.5"
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
							className="rounded-[var(--radius-lg)] border border-[color:var(--line)] bg-[var(--surface)] p-5 [box-shadow:var(--shadow)] transition-transform duration-200 hover:-translate-y-0.5"
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
		</Container>
	);
}
