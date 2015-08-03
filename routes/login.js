var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');

router.get('/', function(req, res) {
    res.render('login'); // load the login.ejs file
});

// process the login form
router.post('/', passport.authenticate('local-login', {
    successRedirect : '/dashboard', // redirect to the secure dashboard section
    failureRedirect : '/', // redirect back to the login page if there is an error
    failureFlash : true // allow flash messages
}));

 // FACEBOOK ROUTES =====================

 // route for facebook authentication and login
 router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to dash.
    res.redirect('/dashboard');
  });

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}		

module.exports = router;
