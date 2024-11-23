const { Router } = require("express");
const { createHash } = require("crypto");
const { MongoClient } = require("mongodb");
const { validPassword, validUsername } = require("../../utils/validFormat");

const router = new Router();
router.post("/", async (req, res) => {
	const client = new MongoClient(process.env.MONGODB_URL);
	const _token = req.headers.authorization;

	if (_token && _token.length) {
		await client.connect();
		const db = client.db(process.env.DB_NAME);
		const users = db.collection("users");

		const user = await users.findOne({ token: _token });
		if (!user) {
			client.close();
			return res
				.status(400)
				.json({
					error: "invalid_user",
					message: "You are logged in to an invalid user",
				});
		}

		client.close();
		return res
			.status(400)
			.json({
				error: "already_logged_in",
				message: "You are already logged in",
			});
	}

	const body = req.body;

	if (!body.username)
		return res
			.status(400)
			.json({ error: "no_username", message: "No username was provided" });
	if (!body.password)
		return res
			.status(400)
			.json({ error: "no_password", message: "No password was provided" });

	if (!validPassword(body.password))
		return res
			.status(400)
			.json({
				error: "invalid_password",
				message: "An invalid password was provided",
			});
	if (!validUsername(body.username))
		return res
			.status(400)
			.json({
				error: "invalid_username",
				message: "An invalid username was provided",
			});

	await client.connect();
	const db = client.db(process.env.DB_NAME);
	const users = db.collection("users");

	const user = await users.findOne({ username: body.username });
	if (!user) {
		client.close();
		return res
			.status(400)
			.json({
				error: "no_account",
				message: "Password or username is incorrect",
			});
	}

	const token = createHash("sha256")
		.update(user.id + body.password)
		.digest("hex");

	if (user.token !== token)
		return res.status(400).json({
			error: "invalid_username_password",
			message: "Password or username is incorrect",
		});

	client.close();
	return res.status(200).json(user);
});

module.exports = router;
