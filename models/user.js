var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
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