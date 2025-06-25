const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.get("/", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); // optional
	res.send("Request default");
});

app.get("/a", (req, res) => {
	if (req.headers.origin === "http://127.0.0.1:5500") {
		res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
		return res.send("Request a");
	} else {
		return res.status(403).send("Forbidden a");
	}
});

app.get("/b", (req, res) => {
	if (req.headers.origin === "http://127.0.0.1:5500") {
		res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
		return res.send("Request b");
	} else {
		return res.status(403).send("Forbidden b");
	}
});

// Handle preflight OPTIONS requests
app.options("*", (req, res) => {
	const origin = req.headers.origin;
	if (origin === "http://127.0.0.1:5500") {
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "*");
		return res.sendStatus(204);
	}
	res.sendStatus(403);
});

module.exports = serverless(app);
