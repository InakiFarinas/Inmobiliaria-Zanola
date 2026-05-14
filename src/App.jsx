import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PropertiesPage = lazy(() => import("./pages/PropertiesPage"));
const PropertyDetailPage = lazy(() => import("./pages/PropertyDetailPage"));

export default function App() {
	return (
		<Layout>
			<Suspense
				fallback={
					<div className="px-6 py-10 text-center text-[color:var(--muted)]">
						Cargando...
					</div>
				}
			>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/propiedades" element={<PropertiesPage />} />
					<Route path="/propiedad/:id" element={<PropertyDetailPage />} />
					<Route path="/nosotros" element={<AboutPage />} />
					<Route path="/contacto" element={<ContactPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</Layout>
	);
}
