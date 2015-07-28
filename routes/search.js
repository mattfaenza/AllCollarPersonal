var express = require('express');
var router = express.Router();


router.get('/', function(req,res){
	res.send("User's profile");
});

module.exports = router;
