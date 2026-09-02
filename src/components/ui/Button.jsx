import { Link } from "react-router-dom";

const variantStyles = {
	primary:
		"bg-[var(--cta-dark)] text-white ring-1 ring-inset ring-white/15 [box-shadow:var(--shadow-cta)] hover:bg-[var(--accent)]",
	whatsapp:
		"bg-[var(--whatsapp-deep)] text-white ring-1 ring-inset ring-white/15 [box-shadow:var(--shadow-cta)] hover:bg-[var(--whatsapp)]",
	ghost: "border border-white/30 bg-transparent text-white hover:bg-white/10",
	pill: "border border-[color:var(--line)] bg-[var(--surface)] text-[var(--text)] hover:border-[color:var(--accent)]",
};

const baseStyles =
	"inline-flex items-center justify-center gap-2 rounded-[var(--radius-lg)] px-4 py-2 font-semibold tracking-[0.01em] transition-colors duration-150";

export default function Button({
	variant = "primary",
	active = false,
	className = "",
	to,
	href,
	target,
	rel,
	type = "button",
	children,
	...props
}) {
	const variantClassName =
		variant === "pill" && active
			? "border border-[color:var(--accent)] bg-[var(--accent)] text-white [box-shadow:var(--shadow-sm)] hover:bg-[var(--cta-dark)]"
			: variantStyles[variant];

	const rootClassName = [baseStyles, variantClassName, className]
		.filter(Boolean)
		.join(" ");

	if (to) {
		return (
			<Link to={to} className={rootClassName} {...props}>
				{children}
			</Link>
		);
	}

	if (href) {
		return (
			<a
				href={href}
				className={rootClassName}
				target={target}
				rel={rel}
				{...props}
			>
				{children}
			</a>
		);
	}

	return (
		<button type={type} className={rootClassName} {...props}>
			{children}
		</button>
	);
}
