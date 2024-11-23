const { Router } = require("express");
const { createHash, randomUUID } = require("crypto");
const { MongoClient } = require("mongodb");
const { validPassword, validUsername } = require("../../utils/validFormat");

const router = new Router();
router.post("/", async (req, res) => {
	const _token = req.headers.authorization;

	const client = new MongoClient(process.env.MONGODB_URL);

	condition: if (_token && _token.length) {
		await client.connect();
		const db = client.db(process.env.DB_NAME);
		const users = db.collection("users");

		const user = await users.findOne({ token: _token });
		if (!user) {
			client.close();
			break condition;
		}

		client.close();
		return res
			.status(400)
			.json({
				error: "already_logged_in",
				message: "Already logged in to an existing account",
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
	if (!body.confirmPassword)
		return res
			.status(400)
			.json({
				error: "no_confirm_password",
				message: "No confirm password was provided",
			});

	if (body.password !== body.confirmPassword)
		return res
			.status(400)
			.json({
				error: "passwords_do_not_match",
				message: "Password & confirm password don't match",
			});

	if (!validPassword(body.password))
		return res
			.status(400)
			.json({
				error: "invalid_password",
				message: "An invalid password was provided",
			});
	if (!validUsername(body.username))
		return res.status(400).json({
			error: "invalid_username",
			message: "An invalid username was provided",
		});

	await client.connect();
	const db = client.db(process.env.DB_NAME);
	const users = db.collection("users");

	if (await users.findOne({ username: body.username })) {
		client.close();
		return res.status(400).json({ error: "username_taken", message: "Username already taken" });
	}

	const id = randomUUID();
	if (await users.findOne({ id })) {
		client.close();
		return res
			.status(400)
			.json({ error: "error_occurred", message: "An error has occurred try again later" });
	}

	const timestamp = Date.now();
	const token = createHash("sha256")
		.update(id + body.password)
		.digest("hex");

	const data = {
		id,
		username: body.username,
		timestamp,
		token,
		admin: false,
	};
	await users.insertOne(data);

	client.close();
	return res.status(200).json(data);
});

module.exports = router;
