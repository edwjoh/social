import React, { useEffect, useState } from "react";
import { post } from "../interfaces/post-type";
import Post from "../Components/Post";
import { useAuth } from "../AuthContext";

function HomePage() {
	const { userId } = useAuth();
	const [posts, setPosts] = useState<post[] | null>(null);

	async function getPosts() {
		try {
			const res = await fetch(
				`http://localhost:3000/api/posts/posts${
					userId ? `?user_id=${userId}` : ""
				}`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
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
	}, [userId]);

	return (
		<div className="min-h-screen bg-blue-50 py-10 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl font-extrabold text-blue-600 mb-8">
					Senaste inläggen
				</h1>
				{posts ? (
					posts
						.sort(
							(a, b) =>
								Date.parse(b.created_at) -
								Date.parse(a.created_at)
						)
						.map((p) => <Post key={p.id} {...p} userId={userId} />)
				) : (
					<p className="text-blue-600">Hittade inga inlägg!</p>
				)}
			</div>
		</div>
	);
}

export default HomePage;
