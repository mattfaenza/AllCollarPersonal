var mongoose = require('mongoose');
var jobSchema = new mongoose.Schema({
	number: String,
	title: String,
	wage: String
});
<<<<<<< HEAD

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

=======
var getJobInfo = function (res, id) {
>>>>>>> alda-branch
	var Job;
	if (mongoose.models.jobs) {
		Job = mongoose.model('jobs');
	} else {
		Job = mongoose.model('jobs', jobSchema);
	}
<<<<<<< HEAD

=======
>>>>>>> alda-branch
	Job.findOne({"_id":id},function(err, jobs) {
		res.json(jobs);
	});
}
<<<<<<< HEAD

=======
>>>>>>> alda-branch
// make this available to our users in our Node applications
module.exports.getJobInfo = getJobInfo;
<<<<<<< HEAD


var getUserData = function (res) {
	
}
=======
var getUserData = function (res) {
}
>>>>>>> alda-branch
