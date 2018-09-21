	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const mongoose			= require('mongoose');
	
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	INDEX MODELS.																	│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const {
		UserSchema
	} = require('./schemas/index');
	
	module.exports = {
		User: mongoose.model('user', UserSchema),
	}