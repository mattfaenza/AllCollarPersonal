var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	username: String,
	//acceptable since it's hashed before it's stored
	password: String,
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

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});	

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
userSchema.methods.isValidPassword = function(password){
	return bcrypt.compareSync(password, this.passwordHash);
};
	
	
//Compiling Schema into a Model
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;