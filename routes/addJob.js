var express = require('express');
var router = express.Router();
var job = require('../models/job');

var isAuthenticated = require('../config/authentication');

router.use(isAuthenticated);

// Logs out
router.get('/', isAuthenticated, function(req, res){
	res.render('addJob.ejs');
});

router.post('/', isAuthenticated, function(req, res) {
	var newJob = new job({ 	title : req.body.title,
							fullDesc : req.body.desc,
							reqSkills : req.body.req,
							locale : req.body.place,
							employer : req.user.username,
							compensation : req.body.compensation,
							length : req.body.duration,
							applicants : [],
							isCompleted : false,
							tel : req.body.tel,
							email : req.body.email
						});
	
	newJob.save ( function ( err, data ) {
		if ( err ) {
			console.log(err);
		} else {
			res.redirect('/dashboard');
		}
	});
});

module.exports = router;