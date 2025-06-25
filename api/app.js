const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();

const acceptedOrigins = ["http://abc.com"];
let accepted = false;
app.use((req, res, next) => {
	const origin = req.headers.origin;

	if (origin && acceptedOrigins.includes(origin)) {
		accepted = true;
	}
});

app.get("/a", (req, res) => {
	if (accepted) {
		res.send("Request a");
	} else {
		res.status(403).send("Forbidden");
	}
});
app.get("/b", (req, res) => {
	if (accepted) {
		res.send("Request b");
	} else {
		res.status(403).send("Forbidden");
	}
});

module.exports = serverless(app);
