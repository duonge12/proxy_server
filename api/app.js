const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Hello from Express without serverless-http!");
});

module.exports = (req, res) => {
	app(req, res); // this wraps your express app manually
};
