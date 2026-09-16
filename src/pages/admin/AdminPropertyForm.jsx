import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminShell from "../../components/admin/AdminShell";
import Panel from "../../components/admin/Panel";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import FormField from "../../components/ui/FormField";
import { supabase } from "../../lib/api";
import { PROPERTY_TYPES, OPERATION_STATES } from "../../config/propertyOptions";
import { NEARBY_CITIES } from "../../config/cities";

// Reordenar por arrastre una lista de imágenes (existentes o recién
// seleccionadas) sin acoplar el estado de arrastre a cuál lista es.
function useDragReorder(setList) {
	const [draggedIndex, setDraggedIndex] = useState(null);
	const [dragOverIndex, setDragOverIndex] = useState(null);

	const onDragStart = useCallback(
		(index) => (e) => {
			setDraggedIndex(index);
			e.dataTransfer.effectAllowed = "move";
		},
		[],
	);

	const onDragEnter = useCallback(
		(index) => (e) => {
			e.preventDefault();
			setDraggedIndex((current) => {
				if (current !== null && current !== index) setDragOverIndex(index);
				return current;
			});
		},
		[],
	);

	const onDragOver = useCallback((e) => {
		e.preventDefault();
	}, []);

	const onDrop = useCallback(
		(index) => (e) => {
			e.preventDefault();
			e.stopPropagation();
			setDraggedIndex((current) => {
				if (current !== null && current !== index) {
					setList((items) => {
						const updated = [...items];
						const [moved] = updated.splice(current, 1);
						updated.splice(index, 0, moved);
						return updated;
					});
				}
				return null;
			});
			setDragOverIndex(null);
		},
		[setList],
	);

	const onDragEnd = useCallback(() => {
		setDraggedIndex(null);
		setDragOverIndex(null);
	}, []);

	return {
		draggedIndex,
		dragOverIndex,
		onDragStart,
		onDragEnter,
		onDragOver,
		onDrop,
		onDragEnd,
	};
}

// Botón "×" en su propio <button> (no el componente Button compartido):
// así el texto blanco no compite con las clases de color de ningún
// variant y el contraste contra el fondo rojo queda garantizado.
const removeImageButtonClassName =
	"absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-[rgba(227,20,26,0.35)] bg-[color:var(--danger)] text-sm font-bold leading-none text-white shadow-[0_2px_8px_rgba(0,0,0,0.25)] hover:bg-[#8f0e13]";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE_MB = 8;

const emptyForm = {
	tipo: "Departamento",
	estado: "Venta",
	ciudad: NEARBY_CITIES[0].nombre,
	id_ciudad: NEARBY_CITIES[0].id_ciudad,
	calle: "",
	altura: "",
	precio: "",
	moneda: "USD",
	ambientes: "",
	dormitorios: "",
	banos: "",
	garaje: false,
	superficie: "",
	antiguedad: "",
	descripcion: "",
	destacada: false,
	activa: true,
};

export default function AdminPropertyForm() {
	const { id } = useParams();
	const navigate = useNavigate();
	const isEditing = Boolean(id);

	const [form, setForm] = useState(emptyForm);
	const [images, setImages] = useState([]);
	const [newFiles, setNewFiles] = useState([]);
	const [isDragging, setIsDragging] = useState(false);
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(isEditing);
	const [loadError, setLoadError] = useState("");
	const [saveError, setSaveError] = useState("");

	useEffect(() => {
		if (!isEditing) return;
		supabase
			.from("propiedades")
			.select("*")
			.eq("id_propiedad", id)
			.single()
			.then(({ data, error }) => {
				if (error) {
					setLoadError("No se pudo cargar la propiedad");
					setFetching(false);
					return;
				}
				if (data) {
					setForm({
						tipo: data.tipo,
						estado: data.estado,
						ciudad: data.ciudad,
						id_ciudad: data.id_ciudad,
						calle: data.calle,
						altura: data.altura,
						precio: data.precio,
						moneda: data.moneda || "USD",
						ambientes: data.ambientes,
						dormitorios: data.dormitorios,
						banos: data.banos,
						garaje: data.garaje,
						superficie: data.superficie,
						antiguedad: data.antiguedad,
						descripcion: data.descripcion,
						destacada: data.destacada,
						activa: data.activa,
					});
					setImages(data.imagenes || []);
				}
				setFetching(false);
			})
			.catch(() => {
				setLoadError("No se pudo cargar la propiedad");
				setFetching(false);
			});
	}, [id, isEditing]);

	const handleChange = useCallback(
		(e) => {
			const { name, type, value, checked } = e.target;
			setForm((f) => {
				const updated = {
					...f,
					[name]: type === "checkbox" ? checked : value,
				};
				// sincronizar id_ciudad cuando cambia ciudad
				if (name === "ciudad") {
					const match = NEARBY_CITIES.find((c) => c.nombre === value);
					updated.id_ciudad = match?.id_ciudad ?? f.id_ciudad;
				}
				return updated;
			});
		},
		[],
	);

	const addFiles = useCallback((fileList) => {
		const incoming = Array.from(fileList).filter((file) =>
			file.type.startsWith("image/"),
		);
		if (incoming.length === 0) return;
		setNewFiles((current) => {
			const existingKeys = new Set(
				current.map((file) => `${file.name}-${file.size}`),
			);
			const deduped = incoming.filter(
				(file) => !existingKeys.has(`${file.name}-${file.size}`),
			);
			return [...current, ...deduped];
		});
	}, []);

	const handleFileChange = useCallback(
		(e) => {
			addFiles(e.target.files);
			e.target.value = "";
		},
		[addFiles],
	);

	const removeNewFile = useCallback((file) => {
		setNewFiles((current) => current.filter((f) => f !== file));
	}, []);

	const handleDragOver = useCallback((e) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e) => {
		e.preventDefault();
		setIsDragging(false);
	}, []);

	const handleDrop = useCallback(
		(e) => {
			e.preventDefault();
			setIsDragging(false);
			addFiles(e.dataTransfer.files);
		},
		[addFiles],
	);

	const removeExistingImage = useCallback((url) => {
		setImages((imgs) => imgs.filter((i) => i !== url));
	}, []);

	const existingImagesReorder = useDragReorder(setImages);
	const newFilesReorder = useDragReorder(setNewFiles);

	const newFilePreviews = useMemo(
		() => newFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
		[newFiles],
	);

	useEffect(() => {
		return () => {
			newFilePreviews.forEach(({ url }) => URL.revokeObjectURL(url));
		};
	}, [newFilePreviews]);

	async function uploadImages() {
		if (newFiles.length === 0) return [];

		for (const file of newFiles) {
			if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
				throw new Error(
					`"${file.name}" no es un formato de imagen permitido (jpg, png o webp).`,
				);
			}
			if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
				throw new Error(
					`"${file.name}" supera el tamaño máximo de ${MAX_IMAGE_SIZE_MB}MB.`,
				);
			}
		}

		const uploadPromises = newFiles.map(async (file) => {
			const ext = file.name.split(".").pop();
			const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
			const { error } = await supabase.storage
				.from("propiedades")
				.upload(path, file, { upsert: true });
			if (error) throw error;
			const { data } = supabase.storage.from("propiedades").getPublicUrl(path);
			return data.publicUrl;
		});

		return Promise.all(uploadPromises);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setSaveError("");
		setLoading(true);

		try {
			const uploadedUrls = await uploadImages();
			const allImages = [...images, ...uploadedUrls];

			const payload = {
				...form,
				altura: Number(form.altura) || 0,
				precio: Number(form.precio),
				ambientes: Number(form.ambientes),
				dormitorios: Number(form.dormitorios),
				banos: Number(form.banos),
				superficie: Number(form.superficie),
				antiguedad: Number(form.antiguedad),
				imagenes: allImages,
			};

			if (isEditing) {
				const { error } = await supabase
					.from("propiedades")
					.update(payload)
					.eq("id_propiedad", id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("propiedades").insert(payload);
				if (error) throw error;
			}

			navigate("/admin");
		} catch (err) {
			console.error(err);
			setSaveError(err.message || "Error al guardar");
		} finally {
			setLoading(false);
		}
	}

	if (fetching)
		return (
			<div className="flex min-h-screen items-center justify-center bg-[#f5f4f1]">
				<p className="text-[var(--muted)]">Cargando...</p>
			</div>
		);

	if (loadError)
		return (
			<div className="flex min-h-screen items-center justify-center bg-[#f5f4f1]">
				<EmptyState
					title={loadError}
					action={
						<Button onClick={() => navigate("/admin")}>Volver al panel</Button>
					}
				/>
			</div>
		);

	return (
		<AdminShell
			title={isEditing ? "Editar propiedad" : "Nueva propiedad"}
			fullBleed
			actions={
				<Button
					variant="ghost"
					className="border border-white/20 px-4 py-2"
					onClick={() => navigate("/admin")}
				>
					← Volver
				</Button>
			}
		>
			<form
				onSubmit={handleSubmit}
				className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden p-4 md:p-5"
			>
				<div className="flex flex-wrap items-center justify-between gap-3">
					<h2 className="m-0 font-serif text-xl text-[var(--text)] md:text-2xl">
						Información de la propiedad
					</h2>
					<div className="flex items-center gap-3">
						{saveError ? (
							<p
								role="alert"
								className="m-0 text-xs font-medium text-[color:var(--danger)]"
							>
								{saveError}
							</p>
						) : null}
						<Button
							type="submit"
							disabled={loading}
							className="px-5 py-2 text-sm"
						>
							{loading
								? "Guardando..."
								: isEditing
									? "Guardar cambios"
									: "Crear propiedad"}
						</Button>
					</div>
				</div>

				<div className="grid min-h-0 gap-3 lg:grid-cols-[1.15fr_0.85fr]">
					<Panel className="grid min-h-0 grid-rows-[auto_auto_1fr] gap-3 overflow-y-auto p-4">
						<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
							<FormField
								label="Tipo de Propiedad"
								as="select"
								name="tipo"
								value={form.tipo}
								onChange={handleChange}
							>
								{PROPERTY_TYPES.map((type) => (
									<option key={type}>{type}</option>
								))}
							</FormField>
							<FormField
								label="Estado"
								as="select"
								name="estado"
								value={form.estado}
								onChange={handleChange}
							>
								{OPERATION_STATES.map((state) => (
									<option key={state}>{state}</option>
								))}
							</FormField>
							<FormField
								label="Ciudad"
								as="select"
								name="ciudad"
								value={form.ciudad}
								onChange={handleChange}
								className="col-span-2 md:col-span-1"
							>
								{NEARBY_CITIES.map((city) => (
									<option key={city.id_ciudad} value={city.nombre}>
										{city.nombre}
									</option>
								))}
							</FormField>
							<FormField
								label="Moneda"
								as="select"
								name="moneda"
								value={form.moneda}
								onChange={handleChange}
							>
								<option value="USD">Dólares (US$)</option>
								<option value="ARS">Pesos (AR$)</option>
							</FormField>

							<FormField
								label="Calle"
								name="calle"
								value={form.calle}
								onChange={handleChange}
								placeholder="Ej: Colón"
								className="col-span-2"
							/>
							<FormField
								label="Altura"
								name="altura"
								value={form.altura}
								onChange={handleChange}
								placeholder="4718"
								type="number"
								min="0"
							/>
							<FormField
								label="Precio"
								name="precio"
								value={form.precio}
								onChange={handleChange}
								placeholder="95000"
								type="number"
								min="0"
								required
							/>

							<FormField
								label="Ambientes"
								name="ambientes"
								value={form.ambientes}
								onChange={handleChange}
								type="number"
								min="0"
								required
							/>
							<FormField
								label="Dormitorios"
								name="dormitorios"
								value={form.dormitorios}
								onChange={handleChange}
								type="number"
								min="0"
								required
							/>
							<FormField
								label="Baños"
								name="banos"
								value={form.banos}
								onChange={handleChange}
								type="number"
								min="0"
								required
							/>
							<FormField
								label="Superficie (m²)"
								name="superficie"
								value={form.superficie}
								onChange={handleChange}
								type="number"
								min="0"
								required
							/>

							<FormField
								label="Antigüedad (años)"
								name="antiguedad"
								value={form.antiguedad}
								onChange={handleChange}
								type="number"
								min="0"
								required
							/>
						</div>

						<div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-[color:var(--line)] pt-3 text-sm text-[var(--text)]">
							<label className="inline-flex cursor-pointer items-center gap-2">
								<input
									type="checkbox"
									name="garaje"
									checked={form.garaje}
									onChange={handleChange}
									className="h-4 w-4 accent-[color:var(--accent)]"
								/>
								Garaje
							</label>
							<label className="inline-flex cursor-pointer items-center gap-2">
								<input
									type="checkbox"
									name="destacada"
									checked={form.destacada}
									onChange={handleChange}
									className="h-4 w-4 accent-[color:var(--accent)]"
								/>
								Destacada
							</label>
							<label className="inline-flex cursor-pointer items-center gap-2">
								<input
									type="checkbox"
									name="activa"
									checked={form.activa}
									onChange={handleChange}
									className="h-4 w-4 accent-[color:var(--accent)]"
								/>
								Activa
							</label>
						</div>

						<FormField
							label="Descripción"
							as="textarea"
							name="descripcion"
							value={form.descripcion}
							onChange={handleChange}
							className="h-full min-h-0 resize-none"
							labelClassName="h-full grid-rows-[auto_1fr]"
							placeholder="Descripción de la propiedad..."
						/>
					</Panel>

					<Panel className="grid min-h-0 grid-rows-[auto_auto_auto] content-start gap-2 self-start p-4">
							<div className="flex items-center justify-between gap-3">
								<h2 className="m-0 text-sm font-bold text-[var(--text)]">
									Imágenes
								</h2>
								{images.length + newFilePreviews.length > 1 ? (
									<span className="text-xs text-[var(--muted)]">
										Arrastrá para reordenarlas
									</span>
								) : null}
							</div>

						<label
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
								className={`flex min-h-[64px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg border-2 border-dashed px-3 py-3 text-center transition-colors ${
									isDragging
										? "border-[color:var(--accent)] bg-[color:var(--accent-soft)]"
										: "border-[color:var(--line)]"
								}`}
							>
								<span className="text-sm font-bold text-[var(--text)]">
									Arrastrá imágenes acá
								</span>
								<span className="text-xs text-[var(--muted)]">
									o hacé clic para elegirlas
								</span>
								<input
									type="file"
									accept="image/*"
									multiple
									onChange={handleFileChange}
									className="sr-only"
								/>
							</label>

							<div className="flex max-h-[180px] flex-wrap content-start items-start gap-3 overflow-y-auto pb-1">
								{images.map((url, index) => (
									<div
										key={url}
										draggable
										onDragStart={existingImagesReorder.onDragStart(index)}
										onDragEnter={existingImagesReorder.onDragEnter(index)}
										onDragOver={existingImagesReorder.onDragOver}
										onDrop={existingImagesReorder.onDrop(index)}
										onDragEnd={existingImagesReorder.onDragEnd}
										className={`relative shrink-0 cursor-grab rounded-lg transition-opacity active:cursor-grabbing ${
											existingImagesReorder.draggedIndex === index
												? "opacity-40"
												: "opacity-100"
										} ${
											existingImagesReorder.dragOverIndex === index &&
											existingImagesReorder.draggedIndex !== index
												? "ring-2 ring-[color:var(--accent)]"
												: ""
										}`}
									>
										<span className="absolute left-1 top-1 z-10 rounded-full bg-black/60 px-1.5 py-0.5 text-[0.65rem] font-bold text-white">
											{index + 1}
										</span>
										<img
											src={url}
											alt="Imagen cargada"
											width={64}
											height={64}
											loading="lazy"
											className="h-16 w-16 rounded-lg border border-[color:var(--line)] object-cover"
										/>
										<button
											type="button"
											onClick={() => removeExistingImage(url)}
											aria-label="Quitar esta imagen"
											className={removeImageButtonClassName}
										>
											×
										</button>
									</div>
								))}
								{newFilePreviews.map(({ file, url }, index) => (
									<div
										key={`${file.name}-${file.size}`}
										draggable
										onDragStart={newFilesReorder.onDragStart(index)}
										onDragEnter={newFilesReorder.onDragEnter(index)}
										onDragOver={newFilesReorder.onDragOver}
										onDrop={newFilesReorder.onDrop(index)}
										onDragEnd={newFilesReorder.onDragEnd}
										className={`relative shrink-0 cursor-grab rounded-lg transition-opacity active:cursor-grabbing ${
											newFilesReorder.draggedIndex === index
												? "opacity-40"
												: "opacity-100"
										} ${
											newFilesReorder.dragOverIndex === index &&
											newFilesReorder.draggedIndex !== index
												? "ring-2 ring-[color:var(--accent)]"
												: ""
										}`}
									>
										<span className="absolute left-1 top-1 z-10 rounded-full bg-[color:var(--accent)] px-1.5 py-0.5 text-[0.65rem] font-bold text-white">
											{images.length + index + 1}
										</span>
										<img
											src={url}
											alt={file.name}
											width={64}
											height={64}
											className="h-16 w-16 rounded-lg border border-[color:var(--line)] object-cover"
										/>
										<button
											type="button"
											onClick={() => removeNewFile(file)}
											aria-label={`Quitar ${file.name}`}
											className={removeImageButtonClassName}
										>
											×
										</button>
									</div>
								))}
							</div>
					</Panel>
				</div>
			</form>
		</AdminShell>
	);
}
