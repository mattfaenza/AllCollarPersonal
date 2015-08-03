var express = require('express');
var mkdirp = require('mkdirp');
var multer = require('multer');
var upload = multer({ dest: 'upload/'});
var fs = require('fs');
var mongoose = require('mongoose');
var router = express.Router();

var jobSchema = new mongoose.Schema({
	id: String,
	title: String,
	fullDesc: String,
	reqSkills: String,
	locale: String,
	employer: String, //username foreign key
	tagList: Array,
	compensation: String,
	length: String,
	applicants: Array, //foreign keys for user:usernames
	isPositionFilled: Boolean,
	//the username of the user that has been hired - a foreign key for username
	userHired: String, //another username foreign key
	isCompleted: Boolean,
	tel: { type: Number, max: 10, min: 9 },
	//can we not use the email from the user schema??
	email: String
});

var userSchema = new mongoose.Schema({
	username: String,
	//Since we don't want to store passwords explicitly
	passwordHash: String,
	passwordSalt: String,
	email: String,
	name: {
    first: String,
    last: { type: String, trim: true }
	},
	phoneNumber: { type: Number, max: 10, min: 9 },
	locale: String,
	//should be represented as a file
	resume: String,
	organization: String,
	privilege: String,
	//list of jobs completed (by job id)
	jobHistory: Array,
	//list of jobs applied to by user - foreign keys for job id
	jobApps: Array,
	//Rating as an employee - avergaed
	hunterRating: { type: Number, max: 0, min: 5 },
	//Rating as an employer - averaged
	employerRating: { type: Number, max: 0, min: 5 }
});

// Logs out
router.post('/:jobID', upload.single('resume'), function(req, res){
	if ( req.file ) {
		var uploadPath = 'upload/' + req.params.jobID + '/' + req.user.username;
		mkdirp(uploadPath, function(err) {
			if ( err ) {
				console.log('ERROR: could not create upload folder for ' + req.params.jobID);
			} else { 
				var source = fs.createReadStream('upload/' + req.file.filename ),
					dest = fs.createWriteStream(uploadPath + '/' + req.file.originalname);

				source.pipe(dest);
				source.on('end', function() {
					fs.unlink('upload/' + req.file.filename );
				});
			}
		});
		// Update the user into applicants!!!!
		var Job;
		if (mongoose.models.jobs) {
			Job = mongoose.model('jobs');
		} else {
			Job = mongoose.model('jobs', jobSchema);
		}

		Job.findOne({"_id":req.params.jobID},function(err, job) {
			if ( !isInArray( req.user.username, job.applicants ) ) {
				Job.update( {"_id":req.params.jobID},
							{$push: {'applicants' : req.user.username}},
							{upsert:true},
							function(err, data) {});

				var User;
				if (mongoose.models.users) {
					User = mongoose.model('users');
				} else {
					User = mongoose.model('users', userSchema);
				}

				User.update( {"_id":req.user['_id']},
							 {$push: {'jobApps' : job}},
							 {upsert:true},
							 function(err, data) {});
			}
		});

		res.redirect('/dashboard/jobInfo' + req.url);
	}
});

function isInJSONArray( element, array ) {
	for ( var i = 0; i < array.length; i++ ) {
		if ( array[i]['_id'] == element ) {
			return true;
		}
	}
	return false;
}

function isInArray( element, array ) {
	for ( var i = 0; i < array.length; i++ ) {
		if ( array[i] == element ) {
			return true;
		}
	}
	return false;
}

module.exports = router;
