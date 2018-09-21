	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const mongoose	= require( 'mongoose' );
	mongoose.set('useCreateIndex', true);
	mongoose.set('debug', true);
	mongoose.set('bufferCommands', 'enable');
	//console.log(mongoose);
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE MY-MODULES DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘

//	──[ BUILD THE CONNECTION STRING.	]───────────────────────────────────────────────
	const { MONGODB: { SERVER, HOST, PORT, NAME, OPTIONS } } = require('./config_01');
	
//	mongodb://username:password@host1:port1/database?options
	const URL_STRING = `${SERVER}${HOST}:${PORT}/${NAME}`;
	const DATABASE_URL 	= process.env.MONGODB_URI||URL_STRING;
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	CREATE THE DATABASE CONNECTION.													│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const MONGODB_CONNECT = mongoose.connect(`${DATABASE_URL}`,OPTIONS)
	.then(DB => {
		console.log('→ DATA BASE IS CONNECTED');
		console.log(`────────────────────────────────────────────────────`);
	})
	.catch(err	=> {
		console.error('→ DATA BASE IN ERROR');
		console.error(`────────────────────────────────────────────────────`);
		console.error(`→ ${err.name.toUpperCase()}`);
		console.error(`→ ${err.message.toUpperCase()}`);
		console.error(`────────────────────────────────────────────────────`);
	});

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	CONNECTION EVENTS.																│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const CONNECTION = mongoose.connection;

//	──[ IF THE CONNECTION THROWS AN ERROR. ]────────────────────────────────────────────
	CONNECTION.on('error',function (err) {  
		console.log(`→ CONNECTION ON ERROR:`); 
		console.log(`→ ${err.name.toUpperCase()}`);
		console.log(`→ ${err.message.toUpperCase()}`);
		console.log(`────────────────────────────────────────────────────`);
	});

//	──[ WHEN IT IS CONNECTING. ]────────────────────────────────────────────
	CONNECTION.on('disconnected', function() {
		console.log(`→ CONNECTION READY ON STATE: 0`);
		console.log(`→ DISCONNECTED	MONGODB`);
		console.log(`────────────────────────────────────────────────────`);
	});

//	──[ WHEN IT IS CONNECTING. ]────────────────────────────────────────────
	CONNECTION.on('connected', function() {
		var DB_NAME = CONNECTION.db.databaseName;
		console.log(`→ CONNECTION READY ON STATE: 1`);
		console.log(`→ CONNECTED	MONGODB`);
		console.log(`────────────────────────────────────────────────────`);
		console.log(`→ ON DATABASE:	${DB_NAME.toUpperCase()}`);
		console.log(`→ ON URI:	${DATABASE_URL.toUpperCase()}`);
		console.log(`────────────────────────────────────────────────────`);
	});

//	──[ WHEN SUCCESSFULLY CONNECTED. ]──────────────────────────────────────────────────
	CONNECTION.on('connecting', function() {
		console.log(`→ CONNECTION READY ON STATE: 2`);
		console.log(`→ CONNECTING	MONGODB`);
		console.log(`────────────────────────────────────────────────────`);
	});

//	──[ WHEN THE CONNECTION IS DISCONNECTED. ]──────────────────────────────────────────
	CONNECTION.on('disconnecting', function () {
		console.log(`→ CONNECTION READY ON STATE: 2`);
		console.log('→ DISCONNECTING MONGODB');
		console.log(`────────────────────────────────────────────────────`);
	});

//	──[ IF THE NODE PROCESS ENDS, CLOSE THE MONGOOSE CONNECTION. ]──────────────────────
	process.on('SIGINT', function() {  
		CONNECTION.close(function () { 
			console.log('→ MONGODB	CONNECTION END THROUGH APP TERMINATION');
			console.log(`────────────────────────────────────────────────────`); 
			process.exit(0); 
		});
	});
	
	module.exports = MONGODB_CONNECT;