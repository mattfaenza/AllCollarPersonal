var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

// var User = require('../models/user');
var passport = require('passport');


/* GET home page. */

router.get('/', function(req, res){
// render the page and pass in any flash data if it exists
	res.render('register', { registerMessage: req.flash('registerMessage') });
});


router.post('/', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));



// router.post('/', function(req, res){
// 	var user = new User({	
// 		username: req.body.user,
// 		first: req.body.fname,
// 		last: req.body.lname,
// 		email: req.body.email
// 	});

// 	user.save(function(err) {
//  		if (err) throw err;

// 	 	console.log(user.username +' saved successfully!');
// 	});

// 	res.redirect('/');
// });
// // var asd = document.getElementById("submitButton");
// // console.log(asd);

module.exports = router;
