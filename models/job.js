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
	isCompleted: Boolean
});

// custom method to add string to end of title
// you can create more important methods like title validations or formatting
// you can also do queries and find similar jobs 
jobSchema.methods.dudify = function() {
  // add some stuff to the users title
  this.title = this.title + '-dude'; 

  return this.title;
};	


//Compiling Schema into a Model
var Job = mongoose.model('Job', jobSchema);

// make this available to our users in our Node applications
module.exports = Job;