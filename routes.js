module.exports = function(app, passport) {
dashboard = require('./models/dashboard.js')
//Login
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure dashboard section
        failureRedirect : '/login', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
    }));


//Register
    app.get('/register', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('register.ejs', { message: req.flash('registerMessage') });
    });

     // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

//Dashboard
    app.get('/dashboard', isLoggedIn, function(req, res) {
        dashboard.getJobData(res, req);
    });

    app.get('/jobInfo/:id', isLoggedIn, function(req, res) {
        dashboard.getJobInfo(res, req);
    });
	
//Profile
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
	
//Search

//Logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

        // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    // if (req.isAuthenticated())
        return next();

    // // if they aren't redirect them to the home page
    // res.redirect('/');
}
