import { WHATSAPP_URL } from "../config/contact";

export default function AboutPage() {
	return (
		<section className="section-block section-block-wide about-page">
			<div className="section-heading">
				<span className="section-kicker">Nosotros</span>
				<h1>Sobre Zanola Inmobiliaria</h1>
			</div>

			<div className="about-grid">
				<article className="about-card  about-card-wide">
					<h2>Trayectoria</h2>
					<p>
						La familia Zanola forma parte de la comunidad moronense desde la
						década del '60 y trabaja en el rubro inmobiliario desde 1990.
					</p>
					<div className="about-callout">
						<strong className="callout-stat">30+ años</strong>
						<span className="callout-copy">Atención familiar desde 1990</span>
					</div>
				</article>
				<article className="about-card about-card-wide">
					<h2>Atención comercial</h2>
					<p>
						La firma está a cargo del Arquitecto Kevin Zanola, con actividad en
						instituciones educativas, sociales, profesionales y comerciales del
						Partido de Morón.
					</p>
					<a
						href={WHATSAPP_URL("Hola, quisiera que me contacten.")}
						target="_blank"
						rel="noreferrer"
						className="button button-primary"
					>
						Consultar ahora
					</a>
				</article>
				<article className="about-card about-card-wide">
					<h2>Lo que valoramos</h2>
					<p>
						Honestidad, atención directa y acompañamiento en cada consulta o
						operación.
					</p>
					<div className="about-callout">
						<ul className="callout-list">
							<li>Honestidad</li>
							<li>Atención personalizada</li>
							<li>Respaldo técnico</li>
						</ul>
					</div>
				</article>
			</div>

			<div className="about-map-frame">
				<iframe
					title="Ubicación de Zanola Inmobiliaria"
					src="https://www.google.com/maps?q=25+de+Mayo+372,+Mor%C3%B3n,+Buenos+Aires&output=embed"
					loading="lazy"
					style={{ width: "100%", minHeight: 340 }}
				/>
			</div>
		</section>
	);
}
