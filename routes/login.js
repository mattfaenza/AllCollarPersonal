var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var passport = require('passport');
var auth = require('../config/authentication');

router.get('/', function(req, res) {
    res.render('login'); // load the login.ejs file
});

// process the login form
router.post('/', passport.authenticate('local-login', {
    successRedirect : '/dashboard', // redirect to the secure dashboard section
    failureRedirect : '/', // redirect back to the login page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;
