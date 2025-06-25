const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();

const acceptedOrigins = ["http://abc.com"];

app.use((req, res, next) => {
	const origin = req.headers.origin;

	if (origin && !acceptedOrigins.includes(origin)) {
		res.status(403).send("Origin not allowed");
		return;
	}

	next();
});
app.get("/a", (req, res) => {
	res.send("Request a");
});
app.get("/b", (req, res) => {
	res.send("Request b");
});

module.exports = serverless(app);
