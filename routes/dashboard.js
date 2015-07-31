var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

var dashboard = require('../models/dashboard');


/* GET home page. */
router.get('/', function(req, res){
	var dir = path.resolve('./html/dashboard.html');
	res.sendFile(dir);
});

router.get('/profile', function(req, res){
	var dir = path.resolve('./html/profile.html');
	res.sendFile(dir);
});

router.get('/search', function(req, res){
	var dir = path.resolve('./html/search.html');
	res.sendFile(dir);
});

router.get('/logout', function(req, res){
	var dir = path.resolve('./html/login.html');
	res.sendFile(dir);
});
// var asd = document.getElementById("submitButton");
// console.log(asd);


router.get('/jobs', function(req, res){
	dashboard.getJobData(res);
});

router.get('/jobInfo/:id', function(req, res){
	var dir = path.resolve('./html/jobInfo.html');
	res.sendFile(dir);
});

router.get('/jobData/:id', function(req, res){
	dashboard.getJobInfo(res, req.params.id);
});

module.exports = router;
