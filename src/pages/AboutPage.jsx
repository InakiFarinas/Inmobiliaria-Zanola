import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import WhatsAppButton from "../components/ui/WhatsAppButton";

export default function AboutPage() {
	return (
		<section className="mx-auto w-[min(1180px,calc(100%_-_24px))] md:w-[min(1180px,calc(100%_-_32px))] pt-4 md:pt-6">
			<SectionHeader
				kicker="Nosotros"
				title="Sobre Zanola Inmobiliaria"
				titleAs="h1"
			/>

			<div className="grid gap-3 md:gap-4 md:grid-cols-2 xl:grid-cols-3">
				<Card
					as="article"
					className="mx-auto grid max-w-[880px] gap-3 text-center"
					padding="md"
				>
					<h2>Trayectoria</h2>
					<p>
						La familia Zanola forma parte de la comunidad moronense desde la
						década del '60 y trabaja en el rubro inmobiliario desde 1990.
					</p>
					<div className="inline-grid gap-1.5 rounded-xl border border-[color:var(--line)] bg-white/5 px-4 py-3">
						<strong className="text-lg font-extrabold text-[color:var(--accent)]">
							30+ años
						</strong>
						<span>Atención familiar desde 1990</span>
					</div>
				</Card>
				<Card
					as="article"
					className="mx-auto grid max-w-[880px] gap-3 text-center"
					padding="md"
				>
					<h2>Atención comercial</h2>
					<p>
						La firma está a cargo del Arquitecto Kevin Zanola, con actividad en
						instituciones educativas, sociales, profesionales y comerciales del
						Partido de Morón.
					</p>
					<WhatsAppButton
						message="Hola, quisiera que me contacten."
						className="mx-auto w-[220px] justify-center"
						style={{ backgroundColor: "var(--cta-dark)", color: "white" }}
					>
						Consultar ahora
					</WhatsAppButton>
				</Card>
				<Card
					as="article"
					className="mx-auto grid max-w-[880px] gap-3 text-center"
					padding="md"
				>
					<h2>Lo que valoramos</h2>
					<p>
						Honestidad, atención directa y acompañamiento en cada consulta o
						operación.
					</p>
					<div className="inline-grid gap-2.5 rounded-xl border border-[color:var(--line)] bg-white/5 px-4 py-3">
						<ul className="m-0 flex list-none flex-wrap justify-center gap-3 p-0">
							<li>Honestidad</li>
							<li>Atención personalizada</li>
							<li>Respaldo técnico</li>
						</ul>
					</div>
				</Card>
			</div>

			<Card className="overflow-hidden" padding="none">
				<iframe
					title="Ubicación de Zanola Inmobiliaria"
					src="https://www.google.com/maps?q=25+de+Mayo+372,+Mor%C3%B3n,+Buenos+Aires&output=embed"
					loading="lazy"
					style={{ width: "100%", minHeight: 340 }}
				/>
			</Card>
		</section>
	);
}
