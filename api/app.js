const express = require("express");
const serverless = require("serverless-http");
const app = express();

const acceptedOrigins = [
	"http://abc.com",
	"https://proxy-server-gamma-five.vercel.app",
];

// Middleware: attach per-request acceptance flag
app.use((req, res, next) => {
	const origin = req.headers.origin;
	req.isAcceptedOrigin = origin && acceptedOrigins.includes(origin);
	next();
});

// Routes
app.get("/", (req, res) => {
	if (req.isAcceptedOrigin) {
		return res.send("Request default");
	} else {
		return res.status(403).send("Forbidden default");
	}
});

app.get("/a", (req, res) => {
	if (req.isAcceptedOrigin) {
		return res.send("Request a");
	} else {
		return res.status(403).send("Forbidden a");
	}
});

app.get("/b", (req, res) => {
	if (req.isAcceptedOrigin) {
		return res.send("Request b");
	} else {
		return res.status(403).send("Forbidden b");
	}
});

module.exports = serverless(app);
