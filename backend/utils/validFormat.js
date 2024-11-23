module.exports.validTitle = function validTitle(title) {
	if (!title) return false;
	if (typeof title !== "string") return false;
	if (!title.length) return false;

	const query = title.trim();
	if (!query.length) return false;
	if (query.length < 3) return false;
	if (query.length > 24) return false;

	return true;
};

module.exports.validDescription = function validDescription(description) {
	if (!description) return false;
	if (typeof description !== "string") return false;
	if (!description.length) return false;

	const query = description.trim();
	if (!query.length) return false;
	if (query.length < 3) return false;
	if (query.length > 245) return false;

	return true;
};

module.exports.validUsername = function validUsername(username) {
	if (!username) return false;
	if (typeof username !== "string") return false;
	if (!username.length) return false;

	const query = username.trim();
	if (!query.length) return false;
	if (query.length < 3) return false;
	if (query.length > 16) return false;

	return true;
};

module.exports.validPassword = function validPassword(password) {
	if (!password) return false;
	if (typeof password !== "string") return false;
	if (!password.length) return false;

	const query = password.trim();
	if (query.length < 8) return false;
	if (query.length > 32) return false;
	if (/[^A-Za-z0-9]/.test(password)) return false;

	return true;
};
