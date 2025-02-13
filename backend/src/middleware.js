require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
	const token = req.headers.authorization;
	if (!token) return res.status(401).json({ error: "Ingen token" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_NYCKEL);
		req.userId = decoded.userId;
		next();
	} catch (err) {
		return res.status(401).json({ error: "Felaktig eller gammal token" });
	}
}

module.exports = authMiddleware;
