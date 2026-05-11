import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";

export default function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/propiedades" element={<PropertiesPage />} />
				<Route path="/propiedad/:id" element={<PropertyDetailPage />} />
				<Route path="/nosotros" element={<AboutPage />} />
				<Route path="/contacto" element={<ContactPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Layout>
	);
}
