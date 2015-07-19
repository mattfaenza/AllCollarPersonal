var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res){
	var dir = path.resolve('./html/login.html');
	res.sendFile(dir);
});

module.exports = router;
