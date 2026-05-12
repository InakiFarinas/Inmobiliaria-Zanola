const iconProps = {
	width: 18,
	height: 18,
	viewBox: "0 0 24 24",
	fill: "none",
	strokeWidth: 1.8,
	strokeLinecap: "round",
	strokeLinejoin: "round",
};

function createIcon(stroke = "#1b5e46") {
	return { ...iconProps, stroke };
}

export function StatGridTypeIcon({ stroke = "#1b5e46" } = {}) {
	return (
		<svg {...createIcon(stroke)}>
			<rect x="3" y="3" width="18" height="18" rx="2" />
			<path d="M3 9h18M9 21V9" />
		</svg>
	);
}

export function StatGridBedroomsIcon({ stroke = "#1b5e46" } = {}) {
	return (
		<svg {...createIcon(stroke)}>
			<path d="M3 17v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
			<path d="M3 17h18M5 17v2m14-2v2" />
			<rect x="7" y="9" width="4" height="4" rx="1" />
		</svg>
	);
}

export function StatGridBathroomsIcon({ stroke = "#1b5e46" } = {}) {
	return (
		<svg {...createIcon(stroke)}>
			<path d="M4 12h16M4 12V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v6" />
			<path d="M4 18v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
		</svg>
	);
}

export function StatGridRoomsIcon({ stroke = "#1b5e46" } = {}) {
	return (
		<svg {...createIcon(stroke)}>
			<rect x="3" y="3" width="7" height="7" rx="1" />
			<rect x="14" y="3" width="7" height="7" rx="1" />
			<rect x="3" y="14" width="7" height="7" rx="1" />
			<rect x="14" y="14" width="7" height="7" rx="1" />
		</svg>
	);
}

export function StatGridSurfaceIcon({ stroke = "#1b5e46" } = {}) {
	return (
		<svg {...createIcon(stroke)}>
			<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
			<polyline points="3.27 6.96 12 12.01 20.73 6.96" />
			<line x1="12" y1="22.08" x2="12" y2="12" />
		</svg>
	);
}

export function StatGridGarageIcon({ stroke = "#1b5e46" } = {}) {
	return (
		<svg {...createIcon(stroke)}>
			<path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
			<rect x="9" y="11" width="14" height="10" rx="1" />
			<path d="M13 11v10M17 11v10" />
		</svg>
	);
}

export function StatGridAgeIcon({ stroke = "#1b5e46" } = {}) {
	return (
		<svg {...createIcon(stroke)}>
			<rect x="3" y="4" width="18" height="18" rx="2" />
			<line x1="16" y1="2" x2="16" y2="6" />
			<line x1="8" y1="2" x2="8" y2="6" />
			<line x1="3" y1="10" x2="21" y2="10" />
		</svg>
	);
}
