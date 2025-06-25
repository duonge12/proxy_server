const express = require("express");
const serverless = require("serverless-http");
const app = express();

const allowedOrigins = [
	"http://127.0.0.1:5501",
	"https://your-frontend-domain.vercel.app",
];

app.use((req, res, next) => {
	const origin = req.headers.origin;

	if (origin) {
		// Always set headers so browser can read any response
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "*");

		// Now check if it's accepted
		req.isAcceptedOrigin = allowedOrigins.includes(origin);
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

module.exports = (req, res) => {
	app(req, res);
};
