import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import FormField from "../../components/ui/FormField";
import SectionHeader from "../../components/ui/SectionHeader";
import { supabase } from "../../lib/api";

const emptyForm = {
	tipo: "Departamento",
	estado: "Venta",
	ciudad: "Morón Sur",
	id_ciudad: 1,
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
	const [images, setImages] = useState([]); // URLs existentes
	const [newFiles, setNewFiles] = useState([]); // archivos nuevos a subir
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(isEditing);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!isEditing) return;
		supabase
			.from("propiedades")
			.select("*")
			.eq("id_propiedad", id)
			.single()
			.then(({ data }) => {
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
			});
	}, [id, isEditing]);

	const handleChange = useCallback((e) => {
		const { name, type, value, checked } = e.target;
		setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
	}, []);

	const handleFileChange = useCallback((e) => {
		setNewFiles(Array.from(e.target.files));
	}, []);

	const removeExistingImage = useCallback((url) => {
		setImages((imgs) => imgs.filter((i) => i !== url));
	}, []);

	async function uploadImages() {
		if (newFiles.length === 0) return [];

		// Upload all files in parallel instead of sequential
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
		setError("");
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
				await supabase
					.from("propiedades")
					.update(payload)
					.eq("id_propiedad", id);
			} else {
				await supabase.from("propiedades").insert(payload);
			}

			navigate("/admin");
		} catch (err) {
			setError(err.message || "Error al guardar");
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
								<option>Departamento</option>
								<option>Casa</option>
								<option>PH</option>
								<option>Local</option>
								<option>Lote</option>
							</FormField>
							<FormField
								label="Estado"
								as="select"
								name="estado"
								value={form.estado}
								onChange={handleChange}
							>
								<option>Venta</option>
								<option>Alquiler</option>
							</FormField>
							<FormField
								label="Ciudad"
								as="select"
								name="ciudad"
								value={form.ciudad}
								onChange={handleChange}
							>
								<option>Morón Sur</option>
								<option>Morón Centro</option>
								<option>Morón</option>
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
							/>
							<FormField
								label="Dormitorios"
								name="dormitorios"
								value={form.dormitorios}
								onChange={handleChange}
								type="number"
							/>
							<FormField
								label="Baños"
								name="banos"
								value={form.banos}
								onChange={handleChange}
								type="number"
							/>
							<FormField
								label="Superficie (m²)"
								name="superficie"
								value={form.superficie}
								onChange={handleChange}
								type="number"
							/>
							<FormField
								label="Antigüedad (años)"
								name="antiguedad"
								value={form.antiguedad}
								onChange={handleChange}
								type="number"
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
											className="h-24 w-24 rounded-lg border border-[color:var(--line)] object-cover"
										/>
										<Button
											type="button"
											onClick={() => removeExistingImage(url)}
											variant="pill"
											className="absolute -right-2 -top-2 h-6 w-6 border border-red-100 bg-red-500 px-0 py-0 text-xs text-white hover:bg-red-600"
										>
											×
										</Button>
									</div>
								))}
							</div>
						) : (
							<EmptyState
								title="Sin imágenes cargadas"
								description="Podés subir una o varias imágenes desde el selector de archivos."
								className="py-6"
							/>
						)}

						<FormField
							label="Subir imágenes"
							as="input"
							type="file"
							accept="image/*"
							multiple
							onChange={handleFileChange}
							className="px-3 py-2 text-sm"
						/>
						{newFiles.length > 0 ? (
							<p className="m-0 text-xs font-medium text-[color:var(--accent)]">
								{newFiles.length} imagen(es) seleccionada(s)
							</p>
						) : null}
					</Card>

					{error ? (
						<p className="m-0 text-sm font-medium text-red-500">{error}</p>
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
