var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

var job = require('../models/job');

var isAuthenticated = require('../config/authentication');

router.use(isAuthenticated);

router.get('/', isAuthenticated, function(req,res){
	job.find({}, function(err, jobs){
		if (err)
			throw err;
		res.render('search', { "jobs": jobs,
								"user": req.user});
	});
	
});

module.exports = router;
