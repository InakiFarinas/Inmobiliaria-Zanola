import { useEffect, useState, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import AdminShell from "../../components/admin/AdminShell";
import Panel from "../../components/admin/Panel";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/api";
import { formatPrice } from "../../lib/utils";

const rowActionClassName =
	"inline-flex min-h-9 items-center rounded-md px-2.5 text-xs font-semibold transition-colors";

const PropertyRow = memo(({ property, onToggle, onDelete, onEdit }) => (
	<tr className="border-b border-[color:var(--line)] last:border-0 hover:bg-black/[0.02]">
		<td className="px-4 py-3">
			<div className="flex items-center gap-3">
				{property.imagenes?.[0] ? (
					<img
						src={property.imagenes[0]}
						alt={`${property.tipo} en ${property.ciudad}`}
						width={44}
						height={44}
						loading="lazy"
						className="h-11 w-11 flex-shrink-0 rounded-md object-cover"
					/>
				) : (
					<div
						aria-hidden="true"
						className="h-11 w-11 flex-shrink-0 rounded-md bg-black/5"
					/>
				)}
				<div className="grid min-w-0 gap-0.5">
					<div className="flex flex-wrap items-center gap-2">
						<span className="truncate text-sm font-bold text-[var(--text)]">
							{property.tipo} — {property.calle}
							{property.altura ? ` ${property.altura}` : ""}
						</span>
						{!property.activa ? (
							<span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold text-[var(--muted)]">
								Inactiva
							</span>
						) : null}
						{property.destacada ? (
							<span className="rounded-full bg-[color:var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold text-[color:var(--accent)]">
								Destacada
							</span>
						) : null}
					</div>
				</div>
			</div>
		</td>
		<td className="px-4 py-3 text-sm text-[var(--muted)]">
			{property.ciudad}
		</td>
		<td className="px-4 py-3 text-sm text-[var(--muted)]">
			{property.estado}
		</td>
		<td className="tabular px-4 py-3 text-sm font-semibold text-[var(--text)]">
			{formatPrice(property.precio, property.moneda)}
		</td>
		<td className="px-4 py-3">
			<div className="flex flex-wrap items-center justify-end gap-1">
				<button
					type="button"
					className={`${rowActionClassName} text-[var(--muted)] hover:bg-black/5`}
					onClick={() => onToggle(property)}
				>
					{property.activa ? "Desactivar" : "Activar"}
				</button>
				<button
					type="button"
					className={`${rowActionClassName} text-[color:var(--accent)] hover:bg-[color:var(--accent-soft)]`}
					onClick={() => onEdit(property.id_propiedad)}
				>
					Editar
				</button>
				<button
					type="button"
					aria-label={`Eliminar propiedad ${property.tipo} en ${property.ciudad}`}
					className={`${rowActionClassName} text-[color:var(--danger)] hover:bg-[rgba(227,20,26,0.08)]`}
					onClick={() => onDelete(property.id_propiedad)}
				>
					Eliminar
				</button>
			</div>
		</td>
	</tr>
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
		<AdminShell
			title="Cabrera Admin"
			actions={
				<>
					<span className="text-sm text-white/70">{user?.email}</span>
					<Button
						variant="ghost"
						className="border border-white/20 px-4 py-2"
						onClick={handleLogout}
					>
						Salir
					</Button>
				</>
			}
		>
			<div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
				<div>
					<p className="m-0 text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--accent)]">
						Propiedades
					</p>
					<h2 className="m-0 font-serif text-3xl text-[var(--text)]">
						Listado
					</h2>
				</div>
				<Button to="/admin/nueva" className="px-4 py-2">
					+ Nueva propiedad
				</Button>
			</div>

			{error ? (
				<EmptyState
					role="alert"
					aria-live="assertive"
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
					<Panel className="overflow-x-auto">
						<table className="w-full min-w-[640px] border-collapse text-left">
							<thead>
								<tr className="border-b border-[color:var(--line)] bg-black/[0.015] text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
									<th className="px-4 py-3 font-bold">Propiedad</th>
									<th className="px-4 py-3 font-bold">Ciudad</th>
									<th className="px-4 py-3 font-bold">Operación</th>
									<th className="px-4 py-3 font-bold">Precio</th>
									<th className="px-4 py-3 text-right font-bold">Acciones</th>
								</tr>
							</thead>
							<tbody>
								{properties.map((p) => (
									<PropertyRow
										key={p.id_propiedad}
										property={p}
										onToggle={handleToggleActiva}
										onDelete={handleDelete}
										onEdit={handleEdit}
									/>
								))}
							</tbody>
						</table>
					</Panel>

					{totalPages > 1 && (
						<div className="mt-4 flex items-center justify-between">
							<p className="text-xs text-[var(--muted)]">
								Página {currentPage} de {totalPages}
							</p>
							<div className="flex gap-2">
								<button
									type="button"
									disabled={currentPage === 1}
									onClick={() => setCurrentPage((p) => p - 1)}
									className={`${rowActionClassName} border border-[color:var(--line)] px-3 disabled:opacity-40`}
								>
									← Anterior
								</button>
								<button
									type="button"
									disabled={currentPage === totalPages}
									onClick={() => setCurrentPage((p) => p + 1)}
									className={`${rowActionClassName} border border-[color:var(--line)] px-3 disabled:opacity-40`}
								>
									Siguiente →
								</button>
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
		</AdminShell>
	);
}
