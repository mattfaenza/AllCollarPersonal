var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

var job = require('../models/job');

var isAuthenticated = require('../config/authentication');

router.use(isAuthenticated);

router.post('/', isAuthenticated, function(req,res, next){
	res.redirect('/search');
	next();
});
//var search = "software developer";
router.get('/', isAuthenticated, function(req,res){
	var regex = new RegExp(req.query["term"], 'i');
	console.log(regex);
	// if (search == ""){
	// 	job.find({}, function(err, jobs){
	// 		if (err)
	// 			throw err;
	// 		res.render('search', { "jobs": jobs,
	// 								"user": req.user});
	// 	});
	// }else{
	job.find({'title' : regex}, function(err, jobs){
		console.log(jobs);
		if (err)
			throw err;
		res.render('search', { "jobs": jobs,
								"user": req.user});
	});

});
module.exports = router;
