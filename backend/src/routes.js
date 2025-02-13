const express = require("express");
const { login, register } = require("./auth");
const authMiddleware = require("./middleware");
const { getPosts, likePost, getUserPost, skapaPost } = require("./posts");

const authRouter = express.Router();
const postRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

postRouter.get("/posts", getPosts);
postRouter.post("/like", authMiddleware, likePost);
postRouter.post("/skapa", authMiddleware, skapaPost);
postRouter.get("/userPosts", authMiddleware, getUserPost);

module.exports = { authRouter, postRouter };
