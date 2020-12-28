const { verify } = require('jsonwebtoken');

const getTokenPayload = token => {
	return verify(token, process.env.APP_SECRET);
};

const getUserId = (req, authToken) => {
	try {
		if (req && req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];

			if (!token) {
				throw new Error('No token found');
			}

			const { userId } = getTokenPayload(token);

			return userId;
		} else if (authToken) {
			const { userId } = getTokenPayload(token);

			return userId;
		}

		throw new Error('Not authenticated');
	} catch (err) {
		console.error(err);
	}
};

module.exports = { getUserId };
