const express = require("express");
const serverless = require("serverless-http");
const app = express();

// Middleware: attach per-request acceptance flag
app.use((req, res, next) => {
	const origin = req.headers.origin;
	if (origin && acceptedOrigins.includes(origin)) {
		req.isAcceptedOrigin = true;
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "*");
	} else {
		req.isAcceptedOrigin = false;
	}
	next();
});

// Routes
app.get("/", (req, res) => {
	if (req.isAcceptedOrigin) {
		return res.send("Request default");
	} else {
		return res.send("Forbidden default");
	}
});

app.get("/a", (req, res) => {
	if (req.isAcceptedOrigin) {
		return res.send("Request a");
	} else {
		return res.send("Forbidden a");
	}
});

app.get("/b", (req, res) => {
	if (req.isAcceptedOrigin) {
		return res.send("Request b");
	} else {
		return res.send("Forbidden b");
	}
});

module.exports = serverless(app);
