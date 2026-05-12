export function LocationIcon(props) {
	return (
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.9"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M12 21s6-5.33 6-11a6 6 0 0 0-12 0c0 5.67 6 11 6 11z" />
			<circle cx="12" cy="10" r="2.2" />
		</svg>
	);
}

export function PhoneIcon(props) {
	return (
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.9"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 1.92 4.18 2 2 0 0 1 3.92 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.61a2 2 0 0 1-.45 2.11L8.1 9.5a16 16 0 0 0 6.4 6.4l1.06-1.03a2 2 0 0 1 2.11-.45c.83.32 1.71.54 2.61.66A2 2 0 0 1 22 16.92z" />
		</svg>
	);
}

export function MailIcon(props) {
	return (
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.9"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M4 4h16v16H4z" />
			<path d="m4 7 8 6 8-6" />
		</svg>
	);
}
