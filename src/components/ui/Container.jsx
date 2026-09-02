export default function Container({ as: Tag = "section", className = "", ...props }) {
	const rootClassName = [
		"mx-auto w-[min(1180px,calc(100%_-_24px))] md:w-[min(1180px,calc(100%_-_32px))]",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return <Tag className={rootClassName} {...props} />;
}
