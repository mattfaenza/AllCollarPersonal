var express = require('express');
var router = express.Router();
var auth = require("../config/authentication");


router.param('userid', function(req, res, next, userid){
	console.log('user id is ' + userid);
	req.userid = userid;
	next();
});

/* GET users listing. */
router.get('/:userid', auth.isLoggedIn, function(req, res){
	res.send('hello '+ req.userid);
	/* TODO: call a query to get user with req.userid*/
});

router.get('/',auth.isLoggedIn, function(req,res){
	/* Should redirect to the current user's profile if an id isn't specified*/
	res.send("User's profile");
	res.send(req.user);
	//res.redirect('/users/(current user id)')
});

module.exports = router;
