var express = require('express');
var router = express.Router();



router.param('jobid', function(req, res, next, jobid){
	console.log('job id is ' + jobid);
	req.jobid = jobid;
	next();
});

/* GET users listing. */
router.get('/:jobid', function(req, res){
	res.send('this is job #'+ req.jobid);
	/* TODO: call a query to get job with req.jobid*/
});

router.get('/', function(req,res){
	/* Should redirect to the search page if an id isn't specified*/
	res.redirect('/search');
});

module.exports = router;
