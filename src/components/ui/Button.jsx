import { Link } from "react-router-dom";

const variantStyles = {
	primary: "bg-[var(--cta-dark)] text-white",
	whatsapp: "bg-white text-[var(--accent)] hover:bg-gray-50",
	ghost: "border border-transparent bg-transparent text-white",
	pill: "border border-neutral-200 bg-white/90 text-[var(--text)] hover:bg-white",
};

const baseStyles =
	"inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 font-extrabold shadow-[0_16px_38px_rgba(26,26,26,0.18)] transition-transform duration-200 hover:-translate-y-0.5";

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
			? `border border-[color:var(--accent)] bg-[var(--accent)] text-white hover:bg-[#1f3f2f]`
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
