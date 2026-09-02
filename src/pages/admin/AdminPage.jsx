import { useEffect, useState, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import SectionHeader from "../../components/ui/SectionHeader";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/api";
import { formatFolio } from "../../lib/utils";

const PropertyRow = memo(({ property, onToggle, onDelete, onEdit }) => (
	<Card
		padding="md"
		className="grid gap-4 md:grid-cols-[auto_auto_minmax(0,1fr)_auto] md:items-center"
	>
		<span className="tabular font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[var(--muted)]">
			{formatFolio(property.id_propiedad)}
		</span>

		{property.imagenes?.[0] && (
			<img
				src={property.imagenes[0]}
				alt={`${property.tipo} en ${property.ciudad}`}
				className="h-14 w-14 flex-shrink-0 rounded-[var(--radius-md)] object-cover"
			/>
		)}

		<div className="grid gap-1 min-w-0">
			<div className="flex flex-wrap items-center gap-2">
				<span className="truncate font-semibold text-sm text-[var(--text)]">
					{property.tipo} — {property.calle}
					{property.altura ? ` ${property.altura}` : ""}
				</span>
				{!property.activa ? (
					<span className="rounded-[var(--radius-sm)] border border-[color:var(--line)] px-2 py-0.5 font-mono text-[10px] uppercase text-[var(--muted)]">
						Inactiva
					</span>
				) : null}
				{property.destacada ? (
					<span className="rounded-[var(--radius-sm)] bg-[color:var(--seal-soft)] px-2 py-0.5 font-mono text-[10px] uppercase text-[color:var(--seal)]">
						Destacada
					</span>
				) : null}
			</div>
			<p className="m-0 text-xs text-[var(--muted)]">
				{property.ciudad} · {property.estado} · AR${" "}
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
				className="border border-[color:var(--danger)] bg-[color:var(--danger-soft)] px-3 py-1.5 text-xs text-[color:var(--danger)] hover:bg-[color:var(--danger)] hover:text-white"
				onClick={() => onDelete(property.id_propiedad)}
			>
				Eliminar
			</Button>
		</div>
	</Card>
));

PropertyRow.displayName = "PropertyRow";

const ITEMS_PER_PAGE = 10;

export default function AdminPage() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [properties, setProperties] = useState([]);
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

	const fetchProperties = useCallback(async (page) => {
		setLoading(true);
		setError(null);
		const from = (page - 1) * ITEMS_PER_PAGE;
		const to = from + ITEMS_PER_PAGE - 1;
		const { data, error, count } = await supabase
			.from("propiedades")
			.select("*", { count: "exact" })
			.order("created_at", { ascending: false })
			.range(from, to);
		if (error) {
			setError("No se pudieron cargar las propiedades");
		} else {
			setProperties(data || []);
			setTotalCount(count || 0);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchProperties(currentPage);
	}, [fetchProperties, currentPage]);

	const handleToggleActiva = useCallback(
		async (property) => {
			const newValue = !property.activa;
			setProperties((prev) =>
				prev.map((p) =>
					p.id_propiedad === property.id_propiedad
						? { ...p, activa: newValue }
						: p,
				),
			);
			const { error } = await supabase
				.from("propiedades")
				.update({ activa: newValue })
				.eq("id_propiedad", property.id_propiedad);
			if (error) fetchProperties(currentPage);
		},
		[fetchProperties, currentPage],
	);

	const handleDelete = useCallback(
		async (id) => {
			if (!confirm("¿Seguro que querés eliminar esta propiedad?")) return;
			const { error } = await supabase
				.from("propiedades")
				.delete()
				.eq("id_propiedad", id);
			if (error) {
				fetchProperties(currentPage);
				return;
			}
			// Si era el único registro de una página > 1, retrocede una página
			// para no quedar mostrando una página vacía.
			if (properties.length === 1 && currentPage > 1) {
				setCurrentPage((p) => p - 1);
			} else {
				fetchProperties(currentPage);
			}
		},
		[fetchProperties, currentPage, properties.length],
	);

	const handleEdit = useCallback(
		(id) => navigate(`/admin/editar/${id}`),
		[navigate],
	);

	const handleLogout = useCallback(async () => {
		await logout();
		navigate("/admin/login");
	}, [logout, navigate]);

	return (
		<div className="min-h-screen bg-[var(--paper)] px-4 py-4">
			<Card className="w-full overflow-hidden p-0" padding="none">
				<div className="flex flex-col gap-4 border-b-2 border-[var(--gold)] bg-[var(--cta-dark)] px-5 py-4 text-white md:flex-row md:items-center md:justify-between md:px-6">
					<div>
						<h1 className="m-0 font-serif text-lg font-medium">Cabrera Admin</h1>
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
						title="Listado"
						action={
							<Button to="/admin/nueva" className="px-4 py-2">
								+ Nueva propiedad
							</Button>
						}
						className="mb-0"
					/>

					{error ? (
						<EmptyState
							title={error}
							action={
								<Button onClick={() => fetchProperties(currentPage)}>
									Reintentar
								</Button>
							}
						/>
					) : loading ? (
						<p className="m-0 text-sm text-[var(--muted)]">Cargando...</p>
					) : totalCount > 0 ? (
						<>
							<div className="grid gap-3">
								{properties.map((p) => (
									<PropertyRow
										key={p.id_propiedad}
										property={p}
										onToggle={handleToggleActiva}
										onDelete={handleDelete}
										onEdit={handleEdit}
									/>
								))}
							</div>

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
