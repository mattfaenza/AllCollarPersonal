var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res){
	var dir = path.resolve('./html/register.html');
	res.sendFile(dir);
});
router.get('/login', function(req, res){
	var dir = path.resolve('./html/login.html');
	res.sendFile(dir);
});

router.post('/', function(req, res){
	var user = new User({	
		username: req.body.user,
		first: req.body.fname,
		last: req.body.lname,
		email: req.body.email
	});

	user.save(function(err) {
 		if (err) throw err;

	 	console.log(user.username +' saved successfully!');
	});

	res.redirect('/');
});
// var asd = document.getElementById("submitButton");
// console.log(asd);

module.exports = router;
