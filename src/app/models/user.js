const mongoose = require("../../database");
const bcrypt   = require('bcryptjs')

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},

	email: {
		type: String,
		unique: true,
		require: true,
		lowercase: true,
	},

	password: {
		type: String,
		require: true,
		select: false,
	},

	roles: {
		type: String,
		require: true,
		enum: ['user', 'admin'],
		default: 'user',
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	updatedAt: {
		type: Date,

	}
});

UserSchema.pre('save', async function (next){
	var hash = await bcrypt.hash(this.password, 10);
	this.password = hash;

	next();
});

UserSchema.pre('findOneAndUpdate', async function(next) {
	var hash = await bcrypt.hash(this._update.password, 10);

	this._update.password  = hash;
	this._update.updatedAt = new Date(); 

	next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;