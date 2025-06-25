const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();

const acceptedOrigins = ["http://abc.com"];

app.use((req, res, next) => {
	const origin = req.headers.origin;

	if (origin && !acceptedOrigins.includes(origin)) {
		return res.status(403).json({ error: "Forbidden origin" });
	}

	next();
});
app.get("/", (req, res) => {
	res.send("Origin accepted");
});

module.exports = serverless(app);
