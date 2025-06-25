const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.get("/", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); // optional
	console.log("Request received at root path");
	res.send("Request default");
});

module.exports = (req, res) => {
	app(req, res);
};
