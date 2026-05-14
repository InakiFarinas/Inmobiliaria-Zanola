import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import FormField from "../../components/ui/FormField";
import SectionHeader from "../../components/ui/SectionHeader";
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
		<div className="min-h-screen bg-[var(--surface)] px-4 py-10 md:px-6 md:py-14">
			<Card className="mx-auto grid w-full max-w-lg gap-6" padding="lg">
				<SectionHeader
					kicker="Panel"
					title="Zanola Admin"
					description="Ingresá con tu cuenta para administrar propiedades."
					titleAs="h1"
					className="mb-0"
				/>

				<form onSubmit={handleSubmit} className="grid gap-4">
					<FormField
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="admin@zanola.com.ar"
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
						<p className="m-0 text-sm font-medium text-red-500">{error}</p>
					) : null}

					<Button type="submit" disabled={loading} className="w-full">
						{loading ? "Ingresando..." : "Ingresar"}
					</Button>
				</form>
			</Card>
		</div>
	);
}
