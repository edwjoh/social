import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { err } from "../interfaces/error-type";
import { useNavigate } from "react-router-dom";

function AuthPage() {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");

	const [Err, setErr] = useState<err | null>(null);

	const navi = useNavigate();

	const { login } = useAuth();

	function toggleAuthMode() {
		setIsLogin(!isLogin);
	}

	async function register() {
		try {
			const res = await fetch("http://localhost:3000/api/auth/register", {
				method: "POST",
				body: JSON.stringify({ email: email, password: password }),
				headers: { "Content-Type": "application/json" },
			});

			if (res.ok) {
				toggleAuthMode();
				return { msg: "Kontot skapat!", error: false } as err;
			} else {
				return { msg: "Gick inte att skapa konto", error: true } as err;
			}
		} catch (error) {
			console.log(error);
			return { msg: "Gick inte att skapa konto", error: true } as err;
		}
	}

	async function call(e) {
		e.preventDefault();
		if (!isLogin && password !== password2) {
			setErr({ msg: "Lösenorden matchar inte!", error: true });
			return;
		}
		if (isLogin) {
			const ans = await login(email, password);
			setErr(ans);
			if (!ans.error) {
				setTimeout(() => {
					navi("/");
				}, 3000);
			}
		} else {
			const ans = await register();
			setErr(ans);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
			<div className="bg-white border-2 border-blue-200 rounded-2xl p-8 w-full max-w-md">
				<h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">
					{isLogin ? "Logga in" : "Registrera"}
				</h1>
				{Err && !Err.error && (
					<div className="mb-6 p-4 bg-green-100 border-2 border-green-400 text-green-700 rounded-lg">
						{Err.msg}
					</div>
				)}
				{Err && Err.error && (
					<div className="mb-6 p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-lg">
						{Err.msg}
					</div>
				)}
				<form onSubmit={(e) => call(e)} className="space-y-6">
					<div>
						<label
							className="block text-lg font-semibold text-blue-600 mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="w-full p-3 border-2 border-blue-200 rounded-lg"
							id="email"
							type="email"
							placeholder="Skriv din email"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<label
							className="block text-lg font-semibold text-blue-600 mb-2"
							htmlFor="password"
						>
							Lösenord
						</label>
						<input
							className="w-full p-3 border-2 border-blue-200 rounded-lg"
							id="password"
							type="password"
							placeholder="Skriv ditt lösenord"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{!isLogin && (
						<div>
							<label
								className="block text-lg font-semibold text-blue-600 mb-2"
								htmlFor="password"
							>
								Bekräfta lösenord
							</label>
							<input
								className="w-full p-3 border-2 border-blue-200 rounded-lg"
								id="password"
								type="password"
								placeholder="Bekräfta ditt lösenord"
								onChange={(e) => setPassword2(e.target.value)}
								required
							/>
						</div>
					)}
					<div className="flex items-center justify-between">
						<button
							className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold cursor-pointer"
							type="submit"
						>
							{isLogin ? "Logga in" : "Registrera"}
						</button>
					</div>
					<div className="text-center">
						<button
							className="text-blue-600 font-semibold cursor-pointer"
							type="button"
							onClick={toggleAuthMode}
						>
							{isLogin
								? "Skapa konto"
								: "Har du ett konto? Logga in här!"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AuthPage;
