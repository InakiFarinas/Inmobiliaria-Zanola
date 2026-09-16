import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function AboutPage() {
	useDocumentMeta(
		"Nosotros | Julián Cabrera Propiedades",
		"Conocé la historia de Julián Cabrera Propiedades: más de 30 años de trayectoria en Castelar, continuadores de Alberto J. Milano.",
	);

	return (
		<section className="mx-auto w-[min(1180px,calc(100%_-_24px))] md:w-[min(1180px,calc(100%_-_32px))] pt-4 md:pt-6">
			<SectionHeader
				kicker="Nosotros"
				title="Sobre Cabrera Inmobiliaria"
				titleAs="h1"
			/>

			<article className="mx-auto mb-6 grid max-w-[880px] gap-3 text-left md:mb-8">
				<h2 className="m-0 font-serif text-2xl font-bold">Nuestra historia</h2>
				<p>
					En 1969, a los 25 años de edad, Alberto Milano dio sus primeros
					pasos en el mundo inmobiliario con la apertura de su primera
					oficina, bajo el nombre de Milano y Cía., ubicada en José María Paz
					481, Ituzaingó.
				</p>
				<p>
					En 1972, con la visión de continuar creciendo y desarrollando su
					actividad en un lugar más competitivo, decidió trasladarse a Carlos
					Casares 883, Castelar, realizando como parte de pago la entrega de
					su dúplex en Parque Ayerza.
				</p>
				<p>
					Tres años más tarde, en 1975, su socio decidió retirarse del rubro.
					Fue entonces cuando Alberto asumió el desafío de continuar de
					manera independiente, dando origen a Alberto J. Milano Propiedades.
				</p>
				<p>
					A partir de ese momento, su compromiso y pasión por la profesión
					marcaron el camino de una etapa de gran crecimiento. Alberto
					encontró en el mundo inmobiliario mucho más que una actividad
					profesional: encontró una verdadera vocación, a la que se dedicó
					con entusiasmo, esfuerzo y una profunda pasión.
				</p>
				<p>
					En 1978 adquirió el local ubicado en Arias 2542, donde comenzó a
					consolidar un equipo de trabajo formado por numerosos vendedores
					que, con dedicación y compromiso, acompañaron el crecimiento y la
					evolución de la empresa.
				</p>
				<p>
					Finalmente, en 1997, llegó otro momento significativo en su
					trayectoria: Alberto hizo realidad el proyecto de trasladarse a la
					que sería la oficina de sus sueños, ubicada en Presidente Domingo
					Faustino Sarmiento 2401.
				</p>
				<p>
					Cada una de estas etapas representa una parte fundamental de una
					historia construida a lo largo de los años, basada en el trabajo,
					la perseverancia, la pasión por la profesión y, sobre todo, en el
					vínculo y la confianza con cada persona que acompañó este camino.
				</p>
				<p>
					Hoy esa historia continúa de la mano de Julián Cabrera, quien lleva
					adelante el legado de Alberto Milano al frente de Cabrera
					Inmobiliaria en Morón y Castelar.
				</p>
			</article>

			<div className="flex justify-center mt-6">
				<WhatsAppButton
					message="Hola, quisiera que me contacten."
					className="w-[220px] justify-center"
					style={{ backgroundColor: "var(--cta-dark)", color: "white" }}
				>
					Contactanos
				</WhatsAppButton>
			</div>

			<div className="mt-8">
				<h2 className="m-0 font-serif text-2xl font-bold mb-4">
					Dónde encontrarnos
				</h2>
				<Card className="overflow-hidden" padding="none">
					<iframe
						title="Ubicación de Cabrera Inmobiliaria"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.3659684085596!2d-58.64382805923285!3d-34.645459473052064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb8ac3e920227%3A0x3d80fa46d2387cde!2sPres.%20Domingo%20Faustino%20Sarmiento%202401%2C%20B1712%20Castelar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1789498971847!5m2!1ses-419!2sar"
						loading="lazy"
						style={{ width: "100%", minHeight: 340 }}
					/>
				</Card>
			</div>
		</section>
	);
}
