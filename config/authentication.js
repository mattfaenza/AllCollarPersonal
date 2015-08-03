
// route middleware to make sure a user is logged in
var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        console.log("logged in ");
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');
};

module.exports = isAuthenticated;