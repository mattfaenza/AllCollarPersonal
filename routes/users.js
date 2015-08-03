var express = require('express');
var router = express.Router();
var auth = require('../config/authentication');


router.use(auth);

router.param('userid', function(req, res, next, userid){
	console.log('user id is ' + userid);
	req.userid = userid;
	next();
});

/* GET users listing. */
router.get('/:userid', auth, function(req, res){
	res.send('hello '+ req.userid);
	/* TODO: call a query to get user with req.userid*/
});

router.get('/', auth ,function(req,res){
	/* Should redirect to the current user's profile if an id isn't specified*/
	res.render('profile', { user : req.user});
	//res.send("hello");
	//res.redirect('/users/(current user id)')
});

module.exports = router;
