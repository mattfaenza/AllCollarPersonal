var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/', function(req,res){
	var dir = path.resolve('./html/dashboard.html');
	res.sendFile(dir);
});

module.exports = router;
