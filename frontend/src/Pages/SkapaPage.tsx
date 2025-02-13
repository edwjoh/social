import React, { useState } from "react";
import Cookies from "js-cookie";
import { err } from "../interfaces/error-type";

function SkapaPage() {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const [Err, setErr] = useState<err | null>(null);

	async function posta() {
		const token = Cookies.get("token");

		if (!token) {
			setErr({
				msg: "Du är inte inloggad, hur kom du ens hit??",
				error: true,
			});
			return;
		}

		try {
			const res = await fetch("http://localhost:3000/api/posts/skapa", {
				method: "POST",
				headers: {
					Authorization: token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: title,
					kropp: body,
				}),
			});

			if (res.ok) {
				setErr({ msg: "Ditt inlägg blev upplagt!", error: false });
				setTitle("");
				setBody("");
			} else {
				setErr({
					msg: "Något gick fel med att lägga upp :(",
					error: true,
				});
			}
		} catch (error) {
			setErr({ msg: "Något gick fel med att lägga upp :(", error: true });
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title && body) {
			posta();
		}
	};

	return (
		<div className="flex flex-col items-center min-h-screen bg-blue-50 p-6">
			<div className="w-full max-w-2xl">
				<h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">
					Skapa inlägg
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
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-lg font-semibold text-blue-600 mb-2">
							Titel
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full p-3 mt-1 border-2 border-blue-200 rounded-lg"
							placeholder="Skriv en titel"
							required
						/>
					</div>
					<div>
						<label className="block text-lg font-semibold text-blue-600 mb-2">
							Kropp
						</label>
						<textarea
							value={body}
							onChange={(e) => setBody(e.target.value)}
							className="w-full p-3 mt-1 border-2 border-blue-200 rounded-lg"
							placeholder="Skriv vad du känner!!"
							rows={6}
							required
						></textarea>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold cursor-pointer"
					>
						Lägg upp
					</button>
				</form>
			</div>
		</div>
	);
}

export default SkapaPage;
