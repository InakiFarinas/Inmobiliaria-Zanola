import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function Reveal({ children, delay = 0, className = "" }) {
	const { ref, visible } = useScrollReveal();

	return (
		<div
			ref={ref}
			className={`transition-all duration-700 ${
				visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
			} ${className}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	);
}
