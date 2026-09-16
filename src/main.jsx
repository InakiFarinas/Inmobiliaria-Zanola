import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./styles/tailwind.css";

// Un chunk lazy-loaded puede dejar de existir después de un deploy
// (los nombres llevan hash de contenido). Si eso pasa, recargamos una
// sola vez para traer el index.html actual en vez de mostrar la app
// rota; el guard en sessionStorage evita un loop si el error persiste.
window.addEventListener("vite:preloadError", (event) => {
	event.preventDefault();
	if (sessionStorage.getItem("chunk-reload")) return;
	sessionStorage.setItem("chunk-reload", "1");
	window.location.reload();
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter
			future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
		>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
