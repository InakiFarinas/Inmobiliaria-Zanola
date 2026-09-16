// Cascarón compartido de las pantallas del panel: topbar fija de altura
// conocida + área de contenido — sin la tarjeta grande flotante que usan
// las páginas públicas. Pensado como un panel operativo (CRUD), no como
// una pieza de marketing.
//
// fullBleed=true le da el control total del alto y el padding al
// contenido (usado por el formulario, que necesita entrar en una sola
// pantalla); por default el main scrollea internamente con el padding
// habitual de página.
export default function AdminShell({ title, actions, fullBleed = false, children }) {
	return (
		<div className="flex h-screen flex-col overflow-hidden bg-[#f5f4f1]">
			<header className="flex h-14 flex-shrink-0 items-center justify-between gap-3 border-b border-[color:var(--line)] bg-[var(--cta-dark)] px-4 text-white md:px-6">
				<div className="flex items-center gap-3">
					<span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/50">
						Panel
					</span>
					<span className="h-4 w-px bg-white/15" aria-hidden="true" />
					<h1 className="m-0 text-sm font-black">{title}</h1>
				</div>
				{actions ? (
					<div className="flex items-center gap-3">{actions}</div>
				) : null}
			</header>
			<main
				className={
					fullBleed
						? "min-h-0 flex-1"
						: "mx-auto w-full min-h-0 max-w-6xl flex-1 overflow-y-auto px-4 py-6 md:px-6 md:py-8"
				}
			>
				{children}
			</main>
		</div>
	);
}
