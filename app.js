var express = require('express');
var path = require('path');
var favicon = require('./node_modules/serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('passport');
var flash = require('connect-flash');

var User = require('./models/user');
var Job = require('./models/job');


//Serving a web page
var http = require('http');

//Set up to connect to MongoDB using Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://groupuser:allCollar@ds053658.mongolab.com:53658/allcollardb');

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;
var app = express();

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log('Connected to DB');
});

require('./config/passport')(passport); // pass passport for configuration

//Example Users

// var johndoe = new User ({
//   username: 'jdoe',
//   password: 'password',
//   name: 'John Doe'
// });

// // create a new user called chris
// var chris = new User({
//   name: 'Chris',
//   username: 'sevilayha',
//   password: 'password' 
// });

// //Example Jobs

// var softjob = new Job ({
//   id: '1',
//   title: 'Software Developer',
//   compensation: '400'
// });


// // call the built-in save method to save to the database
// chris.save(function(err) {
//   if (err) throw err;

//   console.log('User saved successfully!');
// });

// // Saving it to the database.  
// johndoe.save(function (err) {if (err) console.log ('Error on save!')});
// softjob.save(function (err) {if (err) console.log ('Error on save!')});

// required for passport
app.use(session({ secret: 'mySecretKey' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

 // load our routes and pass in our app and fully configured passport
require('./routes.js')(app, passport);

var login = require('./routes/login');
var register = require('./routes/register');
var users = require('./routes/users');
var search = require('./routes/search');
var jobs = require('./routes/jobs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', login);
app.use('/login', login);
app.use('/register', register);
app.use('/users', users);
app.use('/search', search);
app.use('/jobs', jobs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(theport);
console.log('The magic happens on port ' + theport);

module.exports = app;
