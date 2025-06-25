const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();

const acceptedOrigins = [
	"http://abc.com",
	"https://proxy-server-gamma-five.vercel.app",
];
let accepted = false;
app.use((req, res, next) => {
	const origin = req.headers.origin;

	if (origin && acceptedOrigins.includes(origin)) {
		accepted = true;
	}
});
app.get("/", (req, res) => {
	if (accepted) {
		res.send("Request default");
	} else {
		res.send("Forbidden default");
	}
});
app.get("/a", (req, res) => {
	if (accepted) {
		res.send("Request a");
	} else {
		res.send("Forbidden a");
	}
});
app.get("/b", (req, res) => {
	if (accepted) {
		res.send("Request b");
	} else {
		res.send("Forbidden b");
	}
});

module.exports = serverless(app);
