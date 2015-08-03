var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

var dashboard = require('../models/dashboard'),
	job = require('../models/job');

var isAuthenticated = require('../config/authentication');

router.use(isAuthenticated);

/* GET home page. */
router.get('/', isAuthenticated, function(req, res){
	job.getJobData(res, req);	// render the dashboard ejs
});

router.get('/profile', isAuthenticated, function(req, res){
	res.redirect('/users');
});

router.get('/search', isAuthenticated, function(req, res){
	res.render('search.ejs');
});


router.get('/jobs', isAuthenticated, function(req, res){
	job.getJobData(res, req);	// render the dashboard ejs
});

router.get('/jobInfo/:id', isAuthenticated, function(req, res){
	job.getJobInfo(res, req);
});

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = router;
