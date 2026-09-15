import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import FormField from "../../components/ui/FormField";
import SectionHeader from "../../components/ui/SectionHeader";
import { supabase } from "../../lib/api";
import { PROPERTY_TYPES, OPERATION_STATES } from "../../config/propertyOptions";
import { NEARBY_CITIES } from "../../config/cities";

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
			<div className="min-h-screen bg-[#f2f0eb] flex items-center justify-center">
				<p className="text-[var(--muted)]">Cargando...</p>
			</div>
		);

	if (loadError)
		return (
			<div className="min-h-screen bg-[#f2f0eb] flex items-center justify-center">
				<EmptyState
					title={loadError}
					action={
						<Button onClick={() => navigate("/admin")}>Volver al panel</Button>
					}
				/>
			</div>
		);

	return (
		<div className="min-h-screen bg-[var(--surface)] px-4 py-4 md:px-6 md:py-6">
			<Card className="mx-auto max-w-5xl overflow-hidden p-0" padding="none">
				<div className="flex flex-col gap-4 border-b border-[color:var(--line)] bg-[var(--accent)] px-5 py-4 text-white md:flex-row md:items-center md:justify-between md:px-6">
					<div>
						<p className="m-0 text-xs font-bold uppercase tracking-[0.12em] text-white/55">
							Panel
						</p>
						<h1 className="m-0 text-lg font-black">
							{isEditing ? "Editar propiedad" : "Nueva propiedad"}
						</h1>
					</div>
					<Button
						variant="ghost"
						className="border border-white/20 px-4 py-2"
						onClick={() => navigate("/admin")}
					>
						← Volver
					</Button>
				</div>

				<form onSubmit={handleSubmit} className="grid gap-6 p-5 md:p-6">
					<SectionHeader
						kicker="Formulario"
						title="Información de la propiedad"
						description="Completá los datos principales, características e imágenes."
						className="mb-0"
					/>

					<Card padding="md" className="grid gap-4">
						<h2 className="m-0 text-sm font-bold text-[var(--text)]">
							Información general
						</h2>
						<div className="grid gap-4 md:grid-cols-3">
							<FormField
								label="Tipo"
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
							>
								{NEARBY_CITIES.map((city) => (
									<option key={city.id_ciudad} value={city.nombre}>
										{city.nombre}
									</option>
								))}
							</FormField>
						</div>
						<div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
							<FormField
								label="Calle"
								name="calle"
								value={form.calle}
								onChange={handleChange}
								placeholder="Ej: Colón"
							/>
							<FormField
								label="Altura"
								name="altura"
								value={form.altura}
								onChange={handleChange}
								placeholder="4718"
								type="number"
							/>
						</div>
						<FormField
							label="Precio"
							name="precio"
							value={form.precio}
							onChange={handleChange}
							placeholder="95000"
							type="number"
							required
						/>
					</Card>

					<Card padding="md" className="grid gap-4">
						<h2 className="m-0 text-sm font-bold text-[var(--text)]">
							Características
						</h2>
						<div className="grid gap-4 md:grid-cols-3">
							<FormField
								label="Ambientes"
								name="ambientes"
								value={form.ambientes}
								onChange={handleChange}
								type="number"
								required
							/>
							<FormField
								label="Dormitorios"
								name="dormitorios"
								value={form.dormitorios}
								onChange={handleChange}
								type="number"
								required
							/>
							<FormField
								label="Baños"
								name="banos"
								value={form.banos}
								onChange={handleChange}
								type="number"
								required
							/>
							<FormField
								label="Superficie (m²)"
								name="superficie"
								value={form.superficie}
								onChange={handleChange}
								type="number"
								required
							/>
							<FormField
								label="Antigüedad (años)"
								name="antiguedad"
								value={form.antiguedad}
								onChange={handleChange}
								type="number"
								required
							/>
						</div>
						<div className="flex flex-wrap gap-6 pt-1 text-sm text-[var(--text)]">
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
					</Card>

					<Card padding="md" className="grid gap-4">
						<h2 className="m-0 text-sm font-bold text-[var(--text)]">
							Descripción
						</h2>
						<FormField
							label="Texto descriptivo"
							as="textarea"
							name="descripcion"
							value={form.descripcion}
							onChange={handleChange}
							className="min-h-[120px] resize-y"
							placeholder="Descripción de la propiedad..."
						/>
					</Card>

					<Card padding="md" className="grid gap-4">
						<h2 className="m-0 text-sm font-bold text-[var(--text)]">
							Imágenes
						</h2>

						{images.length > 0 ? (
							<div className="flex flex-wrap gap-3">
								{images.map((url) => (
									<div key={url} className="relative">
										<img
											src={url}
											alt="Imagen cargada"
											width={96}
											height={96}
											loading="lazy"
											className="h-24 w-24 rounded-lg border border-[color:var(--line)] object-cover"
										/>
										<Button
											type="button"
											onClick={() => removeExistingImage(url)}
											variant="pill"
											aria-label="Quitar esta imagen"
											className="absolute -right-2 -top-2 flex h-11 w-11 items-center justify-center border border-[rgba(227,20,26,0.3)] bg-[color:var(--danger)] px-0 py-0 text-base text-white hover:bg-[#8f0e13]"
										>
											×
										</Button>
									</div>
								))}
							</div>
						) : null}

						<label
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							className={`grid cursor-pointer place-items-center rounded-[28px] border-2 border-dashed p-6 text-center transition-colors ${
								isDragging
									? "border-[color:var(--accent)] bg-[color:var(--accent-soft)]"
									: "border-[color:var(--line)]"
							}`}
						>
							<p className="m-0 font-bold text-[var(--text)]">
								Arrastrá imágenes acá
							</p>
							<p className="m-0 text-sm text-[var(--muted)]">
								o hacé clic para elegirlas desde tu equipo (jpg, png o webp)
							</p>
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={handleFileChange}
								className="sr-only"
							/>
						</label>

						{newFilePreviews.length > 0 ? (
							<div className="grid gap-2">
								<p className="m-0 text-xs font-medium text-[color:var(--accent)]">
									{newFilePreviews.length} imagen(es) seleccionada(s)
								</p>
								<div className="flex flex-wrap gap-3">
									{newFilePreviews.map(({ file, url }) => (
										<div key={`${file.name}-${file.size}`} className="relative">
											<img
												src={url}
												alt={file.name}
												width={96}
												height={96}
												className="h-24 w-24 rounded-lg border border-[color:var(--line)] object-cover"
											/>
											<Button
												type="button"
												onClick={() => removeNewFile(file)}
												variant="pill"
												aria-label={`Quitar ${file.name}`}
												className="absolute -right-2 -top-2 flex h-11 w-11 items-center justify-center border border-[rgba(227,20,26,0.3)] bg-[color:var(--danger)] px-0 py-0 text-base text-white hover:bg-[#8f0e13]"
											>
												×
											</Button>
										</div>
									))}
								</div>
							</div>
						) : null}
					</Card>

					{saveError ? (
						<p
							role="alert"
							className="m-0 text-sm font-medium text-[color:var(--danger)]"
						>
							{saveError}
						</p>
					) : null}

					<Button type="submit" disabled={loading} className="w-full py-3">
						{loading
							? "Guardando..."
							: isEditing
								? "Guardar cambios"
								: "Crear propiedad"}
					</Button>
				</form>
			</Card>
		</div>
	);
}
