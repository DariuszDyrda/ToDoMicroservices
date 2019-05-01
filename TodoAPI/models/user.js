var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var { Schema } = mongoose;

const secret = require('../config/config');

var UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	todos: [{ type: Schema.Types.ObjectId, ref: 'todo' }],
	settings: {
		dontShowCompletedTasks: {
			type: Boolean,
			default: false
		}
	},
	hash: {
		type: String
	},
	salt: {
		type: String
	}
});

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
	return jwt.sign({ username: this.username }, secret);
};

UserSchema.methods.toAuthJSON = function () {
	return {
		username: this.username,
		settings: this.settings,
		token: this.generateJWT()
	};
};

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('user', UserSchema);

module.exports = User;
