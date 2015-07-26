//Controller for user account requests (login/off, register, session, resets).

var mongoose = require('mongoose');

var AccountController = function (user, sessionData, resetMailer) {
//resetMailer will be used to send password reset username
//crypto and uuid used for generating hashes and unique ids for user login/register
    this.crypto = require('crypto');
    this.uuid = require('node-uuid');
    this.ApiResponse = require('../models/api-response.js');
    this.ApiMessages = require('../models/api-messages.js');
    this.userProfile = require('../models/userProfile.js');
    this.user = user;
    this.sessionData = sessionData;
    this.resetMailer = resetMailer;
};

//Getters and Setters for our session data
AccountController.prototype.getSession = function () {
    return this.sessionData;
};

AccountController.prototype.setSession = function (sessionData) {
    this.sessionData = sessionData;
};

//Hash the password so we can store the hash instead
AccountController.prototype.hashPassword = function (password, salt, callback) {        
    // we use pbkdf2 to hash and iterate 10k times by default into a 64 bit key
    var iters = 10000, keyLen = 64; 
    this.crypto.pbkdf2(password, salt, iters, keyLen, callback);
};

AccountController.prototype.logon = function(username, password, callback) {
	//refer to current account controller instance for using inside callback functions created inline
    var acctctrl = this;
	//Try to match given users username with one in database
    acctctrl.user.findOne({ username: username }, function (err, user) {
	//if query produces error, invoke callback passing error to api 
        if (err) {
            return callback(err, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.DB_ERROR } }));
        }
		
        if (user) {
			//Hash and compare
            acctctrl.hashPassword(password, user.passwordSalt, function (err, passwordHash) {

                if (passwordHash == user.passwordHash) {
					//User may create a profile now that they have logged in
                    var userProfile = new acctctrl.userProfile({
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });
					//Save profile to session
                    acctctrl.sessionData.userProfile = userProfile;
					//Pass success to api
                    return callback(err, new acctctrl.ApiResponse({
                        success: true, extras: {
                            userProfile:userProfile
                        }
                    }));
                } else {
				//Password was not matched, pass error to api
                    return callback(err, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.INVALID_PWD } }));
                }
            });
        } else {
		//username did not exist in database
            return callback(err, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.USERNAME_NOT_FOUND } }));
        }

    });
};

AccountController.prototype.logoff = function () {
    if (this.sessionData.userProfile) delete this.sessionData.userProfile;
    return;
};

AccountController.prototype.register = function (newUser, callback) {
    var acctctrl = this;
	
	//Check for db error or dupe username
    acctctrl.user.findOne({ username: newUser.username }, function (err, user) {

        if (err) {
            return callback(err, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.DB_ERROR } }));
        }

        if (user) {
            return callback(err, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.USERNAME_ALREADY_EXISTS } }));
        } else {

            newUser.save(function (err, user, numberAffected) {

                if (err) {
                    return callback(err, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.DB_ERROR } }));
                }
                //This check is to ensure the database will be affected correctly - addition of 1 entry   
                if (numberAffected === 1) {

                    var userProfile = new acctctrl.userProfile({
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });

                    return callback(err, new acctctrl.ApiResponse({
                        success: true, extras: {
                            userProfile: userProfile
                        }
                    }));
                } else {
                    return callback(err, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.COULD_NOT_CREATE_USER } }));
                }             

            });
        }

    });
};

//Given a username, will send a reset password link in an email to the address associated with that username.
AccountController.prototype.resetPassword = function (username, callback) {
    var acctctrl = this;
    acctctrl.user.findOne({ email: email }, function (err, user) {

        if (err) {
            return callback(err, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.DB_ERROR } }));
        }

        // Save the user's username and a password reset hash in sessionData
        var passwordResetHash = acctctrl.uuid.v4();
        acctctrl.sessionData.passwordResetHash = passwordResetHash;
        acctctrl.sessionData.usernameWhoRequestedPasswordReset = username;

        acctctrl.mailer.sendPasswordResetHash(username, passwordResetHash);

        return callback(err, new acctctrl.ApiResponse({ success: true, extras: { passwordResetHash: passwordResetHash } }));
    })
};

AccountController.prototype.resetPasswordFinal = function (username, newPassword, passwordResetHash, callback) {
    var me = this;
    if (!acctctrl.sessionData || !acctctrl.sessionData.passwordResetHash) {
        return callback(null, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.PASSWORD_RESET_EXPIRED } }));
    }

    if (acctctrl.sessionData.passwordResetHash !== passwordResetHash) {
        return callback(null, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.PASSWORD_RESET_HASH_MISMATCH } }));
    }

    if (acctctrl.sessionData.usernameWhoRequestedPasswordReset !== username) {
        return callback(null, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.PASSWORD_RESET_USERNAME_MISMATCH } }));
    }

    var passwordSalt = this.uuid.v4();

    acctctrl.hashPassword(newPassword, passwordSalt, function (err, passwordHash) {

        acctctrl.user.update({ username: username }, { passwordHash: passwordHash, passwordSalt: passwordSalt }, function (err, numberAffected, raw) {

            if (err) {
                return callback(err, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.DB_ERROR } }));
            }

            if (numberAffected < 1) {

                return callback(err, new acctctrl.ApiResponse({ success: false, extras: { msg: acctctrl.ApiMessages.COULD_NOT_RESET_PASSWORD } }));
            } else {
                return callback(err, new acctctrl.ApiResponse({ success: true, extras: null }));
            }                
        });
    });
};

module.exports = AccountController;