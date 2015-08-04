var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

var dashboard = require('../models/dashboard'),
	job = require('../models/job');

var isAuthenticated = require('../config/authentication');

router.use(isAuthenticated);

router.post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var title = req.job.title
        var fullDesc = req.job.fullDesc;
        var reqSkills = req.job.reqSkills;
        var locale = req.job.locale;
        var employer = req.job.employer;
		var compensation = req.job.compensation;
		var length = req.job.length;
		var tagList = req.job.tagList;
        //call the create function for our database
        job.create({
            title : title,
            fullDesc : fullDesc,
            reqSkills : reqSkills,
            locale : locale,
			employer : employer,
			compensation : compensation,
			length : length,
			tagList : tagList,
			
        }, function (err, job) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Job has been created
                  console.log('POST creating new Job: ' + Job);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("Jobs");
                        // And forward to success page
                        res.redirect("/Jobs");
                    },
                    //JSON response will show the newly created Job
                    json: function(){
                        res.json(Job);
                    }
                });
              }
        })
    });


/* GET home page. */
router.get('/', isAuthenticated, function(req, res){
	job.getJobData(res, req);	// render the dashboard ejs
});

router.get('/profile', isAuthenticated, function(req, res){
	res.redirect('/users');
});

router.get('/search', isAuthenticated, function(req, res){
	res.render('search.ejs');
});

router.get('/addJob', sAuthenticated, function(req, res){
	res.render('addJob.ejs');
});

router.get('/jobs', isAuthenticated, function(req, res){
	job.getJobData(res, req);	// render the dashboard ejs
});

router.get('/jobInfo/:id', isAuthenticated, function(req, res){
	job.getJobInfo(res, req);
});

module.exports = router;
