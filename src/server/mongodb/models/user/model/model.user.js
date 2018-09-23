	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const mongoose	= require('mongoose');
	
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	USER SCHEMA.																	│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const UserSchema  = require('./schema/schema.user');
	
	module.exports = User: mongoose.model('user', UserSchema);