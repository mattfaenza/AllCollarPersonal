var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	passwordHash: String,
	passwordSalt: String,
	email: String,
	name: {
    first: String,
    last: { type: String, trim: true }
	},
	phoneNumber: { type: Number, max: 10, min: 9 },
	locale: String,
	resume: String,
	organization: String,
	privilege: String,
	jobHistory: String,
	jobApps: String,
	hunterRating: { type: Number, max: 0, min: 5 },
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
userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude'; 

  return this.name;
};	
	
	
//Compiling Schema into a Model
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;