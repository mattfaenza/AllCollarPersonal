var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var users = require('../models/user');

var isAuthenticated = require('../config/authentication');

router.use(isAuthenticated);

router.get('/', isAuthenticated, function(req, res){
	res.render('profile', {user : req.user});
});

router.post('/', isAuthenticated, function(req, res){
	var query = {username: req.user.username};
	var updates = {email: req.body.email,
				   phone: req.body.phone,
				   locale: req.body.province};
	var options = {upsert: true, new: true};
	users.findOneAndUpdate(query, updates, options, function(err, res){
		console.log("successfully changed");
	});
	res.redirect('/profile');
});

module.exports = router;