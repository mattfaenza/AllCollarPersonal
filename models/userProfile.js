//This file includes a read-only version of a user's profile to be used when pass user data to outer layers from the database.

var mongoose = require('mongoose');

var UserProfile= function(cnf) {
    this.email = cnf.email,
    this.firstName = cnf.firstName,
    this.lastName = cnf.lastName
};

module.exports = UserProfile;