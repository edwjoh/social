const bcrypt = require("bcryptjs");
const db = require("./db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

async function login(req, res) {
	const { email, password } = req.body;
	const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

	if (!user) {
		return res.status(400).json({ error: "Ogilig inloggning" });
	}

	const correct = await bcrypt.compare(password, user.password);
	if (!correct) {
		return res.status(400).json({ error: "Ogilig inloggning" });
	}

	const token = jwt.sign(
		{ userId: user.id, email: user.email },
		process.env.JWT_NYCKEL,
		{
			expiresIn: "7d",
		}
	);

	res.json({ token });
}

async function register(req, res) {
	const { email, password } = req.body;
	const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

	if (user)
		return res.status(400).json({
			error: "Det finns redan ett konto med den email-adressen",
		});

	const hashedPassword = await bcrypt.hash(password, 12);
	db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(
		email,
		hashedPassword
	);

	res.json({ message: `skapade användare med emailen: ${email}` });
}

function validate(req, res) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}

	try {
		const user = jwt.verify(token, process.env.JWT_NYCKEL);
		return res.json({ id: user.userId });
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}
}

module.exports = { login, register, validate };
