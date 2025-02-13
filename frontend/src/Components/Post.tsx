import React, { useState } from "react";
import LikeIkon from "./LikeButton";
import Cookies from "js-cookie";

export default function Post({
	id,
	title,
	body,
	user_id,
	like_count,
	liked_by_user,
	userId,
}) {
	const token = Cookies.get("token");
	const [likes, setLikes] = useState(like_count);
	const [liked, setLiked] = useState(!!liked_by_user);

	async function like() {
		try {
			const res = await fetch("http://localhost:3000/api/posts/like", {
				method: "POST",
				body: JSON.stringify({ user_id: userId, post_id: id }),
				headers: {
					Authorization: token ? token : "",
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				console.log("gick inte att lika");
				return;
			}

			setLiked(true);
			setLikes((prev) => prev + 1);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6">
			<h2 className="text-2xl font-bold text-blue-600 mb-2">{title}</h2>
			<p className="text-blue-800 mb-4">{body}</p>
			<div className="flex items-center text-sm text-blue-500">
				<span className="font-medium text-blue-600">
					User {user_id}
				</span>
			</div>
			<div className="flex items-center mt-3 space-x-2">
				<button
					type="button"
					onClick={like}
					disabled={!userId || liked}
					className={`flex items-center space-x-1 ${
						!userId
							? "text-gray-400 cursor-not-allowed"
							: "text-blue-600 hover:text-blue-800 cursor-pointer"
					}`}
				>
					<LikeIkon liked={liked} />
				</button>
				<p className="text-blue-600">{likes}</p>
			</div>
		</div>
	);
}
