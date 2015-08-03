var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
	
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password
		//not sure if these fields are needed since we aren't overrriding anything? keeping it for now to be safe
        usernameField : 'user',
        passwordField : 'pwd',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

            // find a user whose username is the same as the forms username
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'username' :  username }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that username
                if (user) {
                    return done(null, false, req.flash('registerMessage', 'That username is already taken.'));
    				
                } else {
    				// check to see if theres already a user with that email
    				User.findOne({ 'email' :  req.body.email }, function(err, user) {
    				// if there are any errors, return the error
    					if (err)
    						return done(err);
    					if (user) {
    						return done(null, false, req.flash('registerMessage', 'That email is already in use.'));
    				    }else{
            				// if there is no user with that username or email
                            // create the user
                            var newUser = new User();

                            // set the user's  credentials
                            newUser.username = username;
                            console.log(username);
                            newUser.email = req.body.email;
                            console.log(newUser.email);
                            newUser.passwordHash = newUser.generateHash(password);
                            console.log(newUser.passwordHash);
                            // save the user
                            newUser.save(function(err) {
                                if (err)
                                    throw err;
            					console.log(newUser.username +' saved successfully!');
                                return done(null, newUser);
                            });
                        }
                    });
                }
            });
        });
    }));
    	
	passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with username
		//not sure if these fields are needed since we aren't overrriding anything? keeping it for now to be safe
        usernameField : 'user',
        passwordField : 'pwd',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with username and password from our form
        // check if user already exists (it should)
        User.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.isValidPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            console.log(user + " logged in successfully");
            // all is well, return successful user
            return done(null, user);
        });

    }));

};