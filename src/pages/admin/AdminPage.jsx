import { useEffect, useState, useMemo, useCallback } from "react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import SectionHeader from "../../components/ui/SectionHeader";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/api";

// Componente memoizado para cada propiedad
const PropertyRow = memo(({ property, onToggle, onDelete, onEdit }) => (
	<Card
		key={property.id_propiedad}
		padding="md"
		className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center"
	>
		{property.imagenes?.[0] && (
			<img
				src={property.imagenes[0]}
				alt={`${property.tipo} en ${property.ciudad}`}
				className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
			/>
		)}

		<div className="grid gap-1 min-w-0">
			<div className="flex flex-wrap items-center gap-2">
				<span className="truncate font-bold text-sm text-[var(--text)]">
					{property.tipo} — {property.calle} {property.altura}
				</span>
				{!property.activa ? (
					<span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] text-[var(--muted)]">
						Inactiva
					</span>
				) : null}
				{property.destacada ? (
					<span className="rounded-full bg-[color:var(--accent-soft)] px-2 py-0.5 text-[10px] text-[color:var(--accent)]">
						Destacada
					</span>
				) : null}
			</div>
			<p className="m-0 text-xs text-[var(--muted)]">
				{property.ciudad} · {property.estado} · $
				{new Intl.NumberFormat("es-AR").format(property.precio)}
			</p>
		</div>

		<div className="flex flex-wrap items-center gap-2">
			<Button
				variant="pill"
				className="px-3 py-1.5 text-xs"
				onClick={() => onToggle(property)}
			>
				{property.activa ? "Desactivar" : "Activar"}
			</Button>
			<Button
				className="px-3 py-1.5 text-xs"
				onClick={() => onEdit(property.id_propiedad)}
			>
				Editar
			</Button>
			<Button
				variant="pill"
				className="border border-red-100 bg-red-50 px-3 py-1.5 text-xs text-red-500 hover:bg-red-100"
				onClick={() => onDelete(property.id_propiedad)}
			>
				Eliminar
			</Button>
		</div>
	</Card>
));

const ITEMS_PER_PAGE = 10;

export default function AdminPage() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		fetchProperties();
	}, []);

	async function fetchProperties() {
		setLoading(true);
		const { data, error } = await supabase
			.from("propiedades")
			.select("*")
			.order("created_at", { ascending: false });
		if (!error) setProperties(data || []);
		setLoading(false);
	}

	const handleToggleActiva = useCallback(async (property) => {
		const newValue = !property.activa;
		// Optimistic update
		setProperties((prev) =>
			prev.map((p) =>
				p.id_propiedad === property.id_propiedad
					? { ...p, activa: newValue }
					: p,
			),
		);
		// Update DB
		const { error } = await supabase
			.from("propiedades")
			.update({ activa: newValue })
			.eq("id_propiedad", property.id_propiedad);
		if (error) fetchProperties(); // Refetch only on error
	}, []);

	const handleDelete = useCallback(async (id) => {
		if (!confirm("¿Seguro que querés eliminar esta propiedad?")) return;
		// Optimistic delete
		setProperties((prev) => prev.filter((p) => p.id_propiedad !== id));
		const { error } = await supabase
			.from("propiedades")
			.delete()
			.eq("id_propiedad", id);
		if (error) fetchProperties(); // Refetch only on error
	}, []);

	const handleEdit = useCallback(
		(id) => {
			navigate(`/admin/editar/${id}`);
		},
		[navigate],
	);

	const handleLogout = useCallback(async () => {
		await logout();
		navigate("/admin/login");
	}, [logout, navigate]);

	// Pagination
	const paginatedProperties = useMemo(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		return properties.slice(start, start + ITEMS_PER_PAGE);
	}, [properties, currentPage]);

	const totalPages = useMemo(() => {
		return Math.ceil(properties.length / ITEMS_PER_PAGE);
	}, [properties.length]);

	return (
		<div className="min-h-screen bg-[var(--surface)] px-4 py-4">
			<Card className="w-full overflow-hidden p-0" padding="none">
				<div className="flex flex-col gap-4 border-b border-[color:var(--line)] bg-[var(--accent)] px-5 py-4 text-white md:flex-row md:items-center md:justify-between md:px-6">
					<div>
						<p className="m-0 text-xs font-bold uppercase tracking-[0.12em] text-white/55">
							Panel
						</p>
						<h1 className="m-0 text-lg font-black">Zanola Admin</h1>
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<span className="text-sm text-white/70">{user?.email}</span>
						<Button
							variant="ghost"
							className="border border-white/20 px-4 py-2"
							onClick={handleLogout}
						>
							Salir
						</Button>
					</div>
				</div>

				<div className="grid gap-6 p-5 md:p-6">
					<SectionHeader
						align="inline"
						kicker="Propiedades"
						title="Listado"
						action={
							<Button to="/admin/nueva" className="px-4 py-2">
								+ Nueva propiedad
							</Button>
						}
						className="mb-0"
					/>

					{loading ? (
						<p className="m-0 text-sm text-[var(--muted)]">Cargando...</p>
					) : properties.length ? (
						<>
							<div className="grid gap-3">
								{paginatedProperties.map((p) => (
									<PropertyRow
										key={p.id_propiedad}
										property={p}
										onToggle={handleToggleActiva}
										onDelete={handleDelete}
										onEdit={handleEdit}
									/>
								))}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="flex items-center justify-between border-t border-[color:var(--line)] pt-4">
									<p className="text-xs text-[var(--muted)]">
										Página {currentPage} de {totalPages}
									</p>
									<div className="flex gap-2">
										<Button
											variant="pill"
											disabled={currentPage === 1}
											onClick={() => setCurrentPage((p) => p - 1)}
											className="px-3 py-1.5 text-xs disabled:opacity-50"
										>
											← Anterior
										</Button>
										<Button
											variant="pill"
											disabled={currentPage === totalPages}
											onClick={() => setCurrentPage((p) => p + 1)}
											className="px-3 py-1.5 text-xs disabled:opacity-50"
										>
											Siguiente →
										</Button>
									</div>
								</div>
							)}
						</>
					) : (
						<EmptyState
							title="No hay propiedades cargadas"
							description="Creá la primera publicación para empezar a usar el panel."
							action={<Button to="/admin/nueva">+ Nueva propiedad</Button>}
						/>
					)}
				</div>
			</Card>
		</div>
	);
}
