import { useState } from "react";
import SiteChrome from "./SiteChrome";

export default function Layout({ children }) {
	const [menuOpen, setMenuOpen] = useState(false);

	const closeMenu = () => setMenuOpen(false);

	return (
		<SiteChrome
			menuOpen={menuOpen}
			onToggleMenu={() => setMenuOpen((v) => !v)}
			onCloseMenu={closeMenu}
		>
			{children}
		</SiteChrome>
	);
}
