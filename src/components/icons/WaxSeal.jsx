export default function WaxSeal({ size = 44, label = "DESTACADA" }) {
	return (
		<span
			className="relative inline-grid place-items-center shrink-0"
			style={{ width: size, height: size }}
			aria-hidden="true"
		>
			<svg viewBox="0 0 44 44" width={size} height={size}>
				<circle cx="22" cy="22" r="20" fill="var(--seal)" />
				<circle
					cx="22"
					cy="22"
					r="20"
					fill="none"
					stroke="rgba(0,0,0,0.18)"
					strokeWidth="1"
				/>
				<circle
					cx="22"
					cy="22"
					r="15.5"
					fill="none"
					stroke="rgba(255,255,255,0.55)"
					strokeWidth="1"
					strokeDasharray="1.5 2.6"
				/>
				<text
					x="22"
					y="25"
					textAnchor="middle"
					fontFamily="Spectral, serif"
					fontSize="15"
					fontWeight="600"
					fill="rgba(255,255,255,0.92)"
				>
					C
				</text>
			</svg>
			<span className="sr-only">{label}</span>
		</span>
	);
}
