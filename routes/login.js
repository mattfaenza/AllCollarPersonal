var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res){
	var dir = path.resolve('./html/login.html');
	res.sendFile(dir);
});
router.get('/register', function(req, res){
	var dir = path.resolve('./html/register.html');
	res.sendFile(dir);
});
// var asd = document.getElementById("submitButton");
// console.log(asd);

module.exports = router;
