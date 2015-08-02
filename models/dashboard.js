var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
	id: String,
	title: String,
	fullDesc: String,
	reqSkills: String,
	locale: String,
	employer: String,
	tagList: Array,
	compensation: String,
	length: String,
	applicants: String,
	isPositionFilled: Boolean,
	//the username of the user that has been hired
	userHired: String,
	isCompleted: Boolean,
	phoneNumber: { type: Number, max: 10, min: 9 },
	email: String
});

var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	locale: String,
	rating: String,
	recentJob: String

});

var getJobData = function (res, req) {

	var Job;
	if (mongoose.models.jobs) {
		Job = mongoose.model('jobs');
	} else {
		Job = mongoose.model('jobs', jobSchema);
	}

	Job.find(function(err, jobs) {
		res.render('dashboard.ejs', {
            "jobs" : jobs
        });
	})

}

var getJobInfo = function (res, req) {

	var Job;
	if (mongoose.models.jobs) {
		Job = mongoose.model('jobs');
	} else {
		Job = mongoose.model('jobs', jobSchema);
	}

	Job.findOne({"_id":req.params.id},function(err, job) {
		res.render('jobInfo.ejs', {
			"jobInfo" : job
		});
	});
}


var getUserData = function (res, id) {

	var User, Job;
	// if (mongoose.models.users) {
	// 	User = mongoose.model('users');
	// } else {
	// 	User = mongoose.model('users', userSchema);
	// }

	if (mongoose.models.jobs) {
		Job = mongoose.model('jobs');
	} else {
		Job = mongoose.model('jobs', jobSchema);
	}

	// Dummy User
	var user = {
		username: "admin",
		//Since we don't want to store passwords explicitly
		passwordHash: "111111",
		passwordSalt: "111",
		email: "admin@test.com",
		name: {
	    first: "admin",
	    last: "admin"
		},
		phoneNumber: "123456789",
		locale: "China",
		//should be represented as a file
		resume: "rinimei",
		organization: "nimei",
		privilege: "admin",
		//list of jobs completed (by job id)
		jobHistory: [],
		//list of jobs applied to by user - foreign keys for job id
		jobApps: ["55bd444f99be19a904b3b416", "55bd811be4b013b5a814bc0f"],
		//Rating as an employee - avergaed
		hunterRating: "5",
		//Rating as an employer - averaged
		employerRating: "5"
	};

	// User.findOne({"_id":id},function(err, users) {
	// 	Job.find({'_id':{$in:users.jobApps}}, function(err, jobs){
	// 		users.jobApps = jobs;
	// 		res.json(users);
	// 	});
	// });
		Job.find({'_id':{$in:user.jobApps}}, function(err, jobs){
			user.jobApps = jobs;
			res.json(user);
		});
}


// make this available to our users in our Node applications
module.exports.getJobData = getJobData;
module.exports.getJobInfo = getJobInfo;
module.exports.getUserData = getUserData;
