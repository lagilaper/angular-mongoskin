function getDatas(db, collname, params, res){
	//connect to specific collections
	var dbase = db.collection(collname);
	
	if(!res){
		res = params;
		params = {};
	}

	dbase.find(params).toArray(function(err, result) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				return res.send(err);

			res.json(result); // return all datas in JSON format
		});
};

function saveDatas(db, collname, params, callback) {
	//connect to specific collections
	var dbase = db.collection(collname);

	//insert date
	params.date = new Date();

	//insert to collections
	dbase.insert(params, callback);
};

function deleteDatas(db, collname, params, callback){
	//connect to specific collections
	var dbase = db.collection(collname);

	//insert to collections
	dbase.remove(params, callback)
}

module.exports = function(app, db) {

	var coll = "applicant";

	// api ---------------------------------------------------------------------
	// get all datas
	app.get('/api/datas', function(req, res) {

		// use mongoskin to get all datas in the database
		getDatas(db, coll, res);
	});

	// create data and send back all datas after creation
	app.post('/api/datas', function(req, res) {

		// create a data, information comes from AJAX request from Angular
		saveDatas(db, coll, req.body, function(err, result) {
			if (err)
				return res.send(err);

			// get and return all the datas after you create another
			getDatas(db, coll, res);
		});

	});

	// delete a data
	app.delete('/api/datas/:id', function(req, res) {
		var _id = db.helper.toObjectID(req.params.id);
		deleteDatas(db, coll, {
			_id : _id
		}, function(err, result) {
			if (err)
				return res.send(err);

			getDatas(db, coll, res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};