import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/admin/ProtectedRoute";

const AdminLoginPage = lazy(() => import("../pages/admin/AdminLoginPage"));
const AdminPage = lazy(() => import("../pages/admin/AdminPage"));
const AdminPropertyForm = lazy(
	() => import("../pages/admin/AdminPropertyForm"),
);

export function AdminRoutes() {
	return (
		<Suspense
			fallback={
				<div className="px-6 py-10 text-center text-[color:var(--muted)]">
					Cargando panel...
				</div>
			}
		>
			<Routes>
				<Route path="/login" element={<AdminLoginPage />} />
				<Route
					path="/*"
					element={
						<ProtectedRoute>
							<Routes>
								<Route path="/" element={<AdminPage />} />
								<Route path="/nueva" element={<AdminPropertyForm />} />
								<Route path="/editar/:id" element={<AdminPropertyForm />} />
							</Routes>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Suspense>
	);
}
