const express = require("express");
const serverless = require("serverless-http");
const app = express();

// Routes
app.get("/", (req, res) => {
	res.send("Request default");
});

app.get("/a", (req, res) => {
	if (req.headers.origin === "http://127.0.0.1:5500") {
		return res.send("Request a");
	} else {
		return res.send("Forbidden a");
	}
});

app.get("/b", (req, res) => {
	if (req.headers.origin === "http://127.0.0.1:5500") {
		return res.send("Request b");
	} else {
		return res.send("Forbidden b");
	}
});

module.exports = serverless(app);
