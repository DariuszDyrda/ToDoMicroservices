const jwt = require('express-jwt');
const secret = require('../config/config')

function getTokenfromHeader(req) {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		return req.headers.authorization.split(' ')[1];
	}
	if (req.query && req.query.token) {
		return req.query.token;
	}
	return null;
}

const auth = {
	required: jwt({
		secret,
		getToken: getTokenfromHeader
	}),
	optional: jwt({
		secret,
		getToken: getTokenfromHeader,
		credentialsRequired: false
	})
};

module.exports = auth;
