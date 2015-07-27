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

module.exports = router;
