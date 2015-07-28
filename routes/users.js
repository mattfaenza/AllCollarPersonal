var express = require('express');
var router = express.Router();



router.param('userid', function(req, res, next, userid){
	console.log('user id is ' + userid);
	req.userid = userid;
	next();
});

/* GET users listing. */
router.get('/:userid', function(req, res){
	res.send('hello '+ req.userid);
	/* TODO: call a query to get user with req.userid*/
});

router.get('/', function(req,res)){
	/* Should redirect to the current user's profile if an id isn't specified*/
	res.send("User's profile");
}

module.exports = router;
