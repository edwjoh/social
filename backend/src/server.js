const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const { authRouter, postRouter } = require("./routes");
const { validate } = require("./auth");
require("dotenv").config({ path: "../.env" });

const app = express();

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	limit: 10,
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,POST",
	})
);
app.use("/api/auth", limiter, authRouter);
app.post("/api/validera", validate);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`servern kör på ${PORT}`));
