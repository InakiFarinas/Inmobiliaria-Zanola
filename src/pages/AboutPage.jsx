import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import { ADDRESS } from "../config/contact";

export default function AboutPage() {
	return (
		<Container className="pt-4 md:pt-6">
			<SectionHeader
				title="Sobre Cabrera Inmobiliaria"
				titleAs="h1"
			/>

			<div className="grid gap-3 md:gap-4 md:grid-cols-2 xl:grid-cols-3">
				<Card
					as="article"
					className="mx-auto grid max-w-[880px] gap-3 text-left"
					padding="md"
				>
					<h2 className="m-0 font-serif text-2xl font-medium">Trayectoria</h2>
					<p>
						La familia Cabrera forma parte de la comunidad de Castelar desde la
						década del &apos;60 y trabaja en el rubro inmobiliario desde 1990.
					</p>
					<div className="grid gap-1 border-t border-dashed border-[color:var(--line)] pt-3">
						<strong className="font-serif text-lg font-medium text-[color:var(--accent)]">
							30+ años
						</strong>
						<span className="text-sm text-[var(--muted)]">
							Atención familiar desde 1990
						</span>
					</div>
				</Card>
				<Card
					as="article"
					className="mx-auto grid max-w-[880px] gap-3 text-left"
					padding="md"
				>
					<h2 className="m-0 font-serif text-2xl font-medium">
						Atención comercial
					</h2>
					<p>La firma está a cargo de Julián Cabrera</p>
					<div className="grid gap-1 border-t border-dashed border-[color:var(--line)] pt-3">
						<p className="m-0 font-semibold">Martillero Julián Cabrera</p>
						<p className="m-0 text-sm text-[var(--muted)]">
							Responsable comercial
						</p>
						<p
							className="m-0 mt-1 text-3xl text-[color:var(--accent)]"
							style={{ fontFamily: "'Caveat', cursive" }}
							aria-hidden="true"
						>
							Julián Cabrera
						</p>
					</div>
				</Card>
				<Card
					as="article"
					className="mx-auto grid max-w-[880px] gap-3 text-left"
					padding="md"
				>
					<h2 className="m-0 font-serif text-2xl font-medium">
						Lo que valoramos
					</h2>
					<p>
						Honestidad, atención directa y acompañamiento en cada consulta o
						operación.
					</p>
					<ul className="m-0 grid list-none gap-2 border-t border-dashed border-[color:var(--line)] p-0 pt-3 text-sm">
						{["Honestidad", "Atención personalizada", "Respaldo técnico"].map(
							(item) => (
								<li key={item} className="inline-flex items-center gap-2">
									<svg
										className="h-4 w-4 shrink-0 text-[color:var(--accent)]"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											d="M20 6L9 17l-5-5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									{item}
								</li>
							),
						)}
					</ul>
				</Card>
			</div>

			<div className="flex justify-center mt-6">
				<WhatsAppButton
					message="Hola, quisiera que me contacten."
					className="w-[220px] justify-center"
				>
					Contactanos
				</WhatsAppButton>
			</div>

			<div className="mt-8">
				<h2 className="m-0 font-serif text-2xl font-medium mb-4">
					Dónde encontrarnos
				</h2>
				<Card className="overflow-hidden" padding="none">
					<iframe
						title="Ubicación de Cabrera Inmobiliaria"
						src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
						loading="lazy"
						style={{ width: "100%", minHeight: 340 }}
					/>
				</Card>
			</div>
		</Container>
	);
}
