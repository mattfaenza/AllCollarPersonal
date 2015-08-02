var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
	number: String,
	title: String,
	wage: String
});

var getJobData = function (res) {

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

var getJobInfo = function (res, id) {

	var Job;
	if (mongoose.models.jobs) {
		Job = mongoose.model('jobs');
	} else {
		Job = mongoose.model('jobs', jobSchema);
	}

	Job.findOne({"_id":id},function(err, jobs) {
		res.json(jobs);
	});
}

// make this available to our users in our Node applications
module.exports.getJobData = getJobData;
module.exports.getJobInfo = getJobInfo;


var getUserData = function (res) {
	
}
