// Contenedor plano para superficies del panel de administración: borde
// fino, esquinas apenas redondeadas, sin sombra ni blur. Reemplaza el
// componente Card (pensado para el sitio público) dentro del admin.
export default function Panel({ as: Tag = "div", className = "", ...props }) {
	const rootClassName = [
		"rounded-lg border border-[color:var(--line)] bg-white",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return <Tag className={rootClassName} {...props} />;
}
