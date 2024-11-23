const { Router } = require("express");
const { MongoClient } = require("mongodb");

const router = new Router();
router.get("/", async (req, res) => {
	const _token = req.headers.authorization;

	if (!_token || !_token.length)
		return res
			.status(401)
			.json({ error: "not_logged_in", message: "Not logged in" });

	const client = new MongoClient(process.env.MONGODB_URL); // Connect to the database

	await client.connect();
	const db = client.db(process.env.DB_NAME);
	const users = db.collection("users");

	const user = await users.findOne({ token: _token });
	client.close();

	if (!user)
		return res
			.status(401)
			.json({ error: "invalid_user", message: "You are logged in to an invalid user" });
	return res.json(user);
});

module.exports = router;
