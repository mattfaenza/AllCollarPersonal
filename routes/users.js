var express = require('express');
var router = express.Router();

var users = require('../models/user');

var isAuthenticated = require('../config/authentication');


router.use(isAuthenticated);

router.param('username', function(req, res, next, username){
	console.log('user id is ' + username);
	req.username = username;
	next();
});

// /* GET users listing. */
router.get('/:username', isAuthenticated, function(req, res){
	console.log(req.username);
	var user = users.findOne({username: req.username}, function(err, user){
		if (err)
			return next(err);
		console.log(user);

		res.render('users', {user : user,
				     jobs : user.jobsHistory});
	});

	/* TODO: call a query to get user with req.userid*/
});

router.get('/', isAuthenticated ,function(req,res){
	/* Should redirect to the current user's profile if an id isn't specified*/
	//res.send(req.user.username)
	res.render('users', {user : req.user,
							 jobs : req.user.jobsHistory});
	// res.send("hello");
	// res.redirect('/users/(current user id)')
});

module.exports = router;
