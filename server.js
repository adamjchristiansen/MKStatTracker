const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
// }


// //Mongo setup
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017/MKStatTracker';

function Insert(db, myCollection, json) {
	// Insert a single document
	db.collection(myCollection).insertOne(json, function(err, r) {
		assert.equal(null, err);
		assert.equal(1, r.insertedCount);

		// Insert multiple documents
		// db.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {
		//   assert.equal(null, err);
		//   assert.equal(2, r.insertedCount);
		//   db.close();
		// });
	});
}


// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to mongo server");

	app.listen(app.get('port'), () => {
		console.log('listening on port: ' + app.get('port'))
	});

	app.get('/api/cups', function(req, res) {
		console.log("in get");

		var user_id = req.query['id'] || 'default';
		var token = req.query['token'] || 'default';
		var geo = req.query['geo'] || 'default';

		res.send(JSON.stringify(user_id + ' ' + token + ' ' + geo));
	});

	app.post('/api/cups', function(req, res) {
		console.log("in post");
		console.log(req.body);

		Insert(db, "cups", req.body);
		res.sendStatus(200);
	});
});



//get the number of wins for each player
// db.cups.aggregate([
//     { $group: { _id: "$winner.name", count: { $sum:1 } } },
// ])

//get the cups where "adam" was one of the players
// db.cups.aggregate([
//     { $match: { "players.name" : "adam" } }
// ])