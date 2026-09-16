import { useEffect } from "react";

function setMetaTag(name, content, attr = "name") {
	if (!content) return;
	let tag = document.querySelector(`meta[${attr}="${name}"]`);
	if (!tag) {
		tag = document.createElement("meta");
		tag.setAttribute(attr, name);
		document.head.appendChild(tag);
	}
	tag.setAttribute("content", content);
}

// Cada página pisa el título y la descripción del <head> mientras está
// montada, para que Google no indexe todas las rutas con el mismo
// title/description genérico del index.html.
export function useDocumentMeta(title, description) {
	useEffect(() => {
		if (title) document.title = title;
		setMetaTag("description", description);
		setMetaTag("og:title", title, "property");
		setMetaTag("og:description", description, "property");
		setMetaTag("twitter:title", title);
		setMetaTag("twitter:description", description);
	}, [title, description]);
}
