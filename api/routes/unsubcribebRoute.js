// Trending
// ALL
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "User route root" });
});

router.get("/profile", (req, res) => {
	res.json({ name: "Alice", age: 30 });
});

module.exports = router;
