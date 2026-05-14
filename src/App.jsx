import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PropertiesPage = lazy(() => import("./pages/PropertiesPage"));
const PropertyDetailPage = lazy(() => import("./pages/PropertyDetailPage"));
const AdminRoutes = lazy(() =>
	import("./routes/AdminRoutes").then((m) => ({ default: m.AdminRoutes })),
);

export default function App() {
	return (
		<Suspense
			fallback={
				<div className="px-6 py-10 text-center text-[color:var(--muted)]">
					Cargando...
				</div>
			}
		>
			<Routes>
				<Route
					path="/"
					element={
						<Layout>
							<HomePage />
						</Layout>
					}
				/>
				<Route
					path="/propiedades"
					element={
						<Layout>
							<PropertiesPage />
						</Layout>
					}
				/>
				<Route
					path="/propiedad/:id"
					element={
						<Layout>
							<PropertyDetailPage />
						</Layout>
					}
				/>
				<Route
					path="/nosotros"
					element={
						<Layout>
							<AboutPage />
						</Layout>
					}
				/>
				<Route
					path="/contacto"
					element={
						<Layout>
							<ContactPage />
						</Layout>
					}
				/>
				<Route
					path="*"
					element={
						<Layout>
							<NotFoundPage />
						</Layout>
					}
				/>

				{/* Admin — rutas lazy-loaded en chunk separado */}
				<Route
					path="/admin/*"
					element={
						<Suspense
							fallback={
								<div className="px-6 py-10 text-center text-[color:var(--muted)]">
									Cargando panel...
								</div>
							}
						>
							<AdminRoutes />
						</Suspense>
					}
				/>
			</Routes>
		</Suspense>
	);
}
