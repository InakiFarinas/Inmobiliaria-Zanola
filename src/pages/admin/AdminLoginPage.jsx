import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Panel from "../../components/admin/Panel";
import Button from "../../components/ui/Button";
import FormField from "../../components/ui/FormField";
import { useAuth } from "../../context/AuthContext";

export default function AdminLoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await login(email, password);
			navigate("/admin");
		} catch (err) {
			setError("Email o contraseña incorrectos");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-[#f5f4f1] px-4 py-10">
			<Panel className="grid w-full max-w-md gap-6 p-6 md:p-8">
				<div>
					<p className="m-0 text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--accent)]">
						Panel
					</p>
					<h1 className="m-0 font-serif text-3xl text-[var(--text)]">
						Cabrera Admin
					</h1>
					<p className="m-0 mt-1 text-sm text-[var(--muted)]">
						Ingresá con tu cuenta para administrar propiedades.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="grid gap-4">
					<FormField
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="admin@juliancabrerapropiedades.com.ar"
						required
					/>
					<FormField
						label="Contraseña"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="••••••••"
						required
					/>

					{error ? (
						<p
							role="alert"
							className="m-0 text-sm font-medium text-[color:var(--danger)]"
						>
							{error}
						</p>
					) : null}

					<Button type="submit" disabled={loading} className="w-full">
						{loading ? "Ingresando..." : "Ingresar"}
					</Button>
				</form>
			</Panel>
		</div>
	);
}
