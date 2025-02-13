import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Post from "../Components/Post";
import { post } from "../interfaces/post-type";
import Cookies from "js-cookie";

function KontoPage() {
	const { logout, userId } = useAuth();
	const [posts, setPosts] = useState<post[] | null>(null);
	const token = Cookies.get("token");

	async function getPosts() {
		try {
			const res = await fetch(
				"http://localhost:3000/api/posts/userPosts",
				{
					method: "GET",
					headers: {
						Authorization: token || "",
						"Content-Type": "application/json",
					},
				}
			);

			const d = await res.json();
			setPosts(d as post[]);
		} catch (error) {
			console.log(error);
			setPosts(null);
		}
	}

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="min-h-screen bg-blue-50 py-10 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-4xl font-extrabold text-blue-600">
						Dina inlägg
					</h1>
					<button
						type="button"
						onClick={logout}
						className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold cursor-pointer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
							/>
						</svg>
						<span>Logga ut</span>
					</button>
				</div>
				{posts ? (
					posts
						.sort(
							(a, b) =>
								Date.parse(b.created_at) -
								Date.parse(a.created_at)
						)
						.map((p) => <Post key={p.id} {...p} userId={userId} />)
				) : (
					<p className="text-blue-600">Inga posts hittades!</p>
				)}
			</div>
		</div>
	);
}

export default KontoPage;
