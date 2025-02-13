const db = require("./db");

function getPosts(req, res) {
	const { user_id } = req.query;

	const posts = db
		.prepare(
			`
		SELECT posts.*, 
       	COUNT(likes.post_id) AS like_count,
       	SUM(CASE WHEN likes.user_id = ? THEN 1 ELSE 0 END) AS liked_by_user
		FROM posts
		LEFT JOIN likes ON posts.id = likes.post_id
		GROUP BY posts.id;
	`
		)
		.all(user_id);

	res.json(posts);
}

function getUserPost(req, res) {
	const userId = req.userId;
	const posts = db
		.prepare(
			`
			SELECT posts.*, COUNT(likes.post_id) AS like_count
			FROM posts
			LEFT JOIN likes ON posts.id = likes.post_id
			WHERE posts.user_id = ?
			GROUP BY posts.id
			`
		)
		.all(userId);
	res.json(posts);
}

function skapaPost(req, res) {
	const { title, kropp } = req.body;
	const userId = req.userId;

	const q = db.prepare(
		"INSERT INTO posts (title, body, user_id) VALUES (?, ?, ?)"
	);
	const result = q.run(title, kropp, userId);

	if (result.changes > 0) {
		res.json("Skapandet lyckades");
	} else {
		res.status(404).json("Fel någonstans");
	}
}

function likePost(req, res) {
	const userId = req.userId;
	const { post_id } = req.body;
	const existingLike = db
		.prepare("SELECT 1 FROM likes WHERE user_id = ? AND post_id = ?")
		.get(userId, post_id);

	if (existingLike) {
		return res.status(400).json({ message: "You already liked this post" });
	}
	const q = db.prepare("INSERT INTO likes (user_id, post_id) VALUES (?, ?)");
	const result = q.run(userId, post_id);

	if (result.changes > 0) {
		res.json({ message: "Gillade!" });
	} else {
		res.status(404).json({ message: "Post not found" });
	}
}

module.exports = { getPosts, likePost, getUserPost, skapaPost };
