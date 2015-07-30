var mongoose = require('mongoose');

var getJobData = function (res) {
	var jobSchema = new mongoose.Schema({
		number: String,
		title: String,
		wage: String
	});

	var Job;
	if (mongoose.models.jobs) {
		Job = mongoose.model('jobs');
	} else {
		Job = mongoose.model('jobs', jobSchema);
	}

	Job.find(function(err, jobs) {
			res.send(jobs);
	})

}

// make this available to our users in our Node applications
module.exports.getJobData = getJobData;

var getUserData = function (res) {
	
}