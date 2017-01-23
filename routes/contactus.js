var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var router = express.Router();

var jsonParser = bodyParser.json();

var validation = function(req, res, next){
    req.assert('fullname', 'Full Name is required').notEmpty();
    req.assert('message', 'Message is required').notEmpty();

    var errors = req.validationErrors();

    if(errors)res.send("Please make sure that Full Name and Message are not empty");
    else return next();  
}

var saveData = function(req, res, next){
    var data = 'Full Name: ' + req.body.fullname + '\n';
    data += 'Type: ' + req.body.type + '\n';
    data += 'Message: ' + req.body.message + '\n';
    data += 'IP: ' + req.ip + '\n'
    fs.writeFile('../savedData.txt', data, function(err){
        if(err) throw err;
        return next();
    });
}

var redirectThankYou = function(req, res){
    req.session.fullname = req.body.fullname;
    console.log(req.body.fullname);
    res.redirect('http://localhost:3000/thankyou');
}

router.post('/', jsonParser, validation, saveData, redirectThankYou);

router.get('/', function(req, res, next){
    res.render('contactus');
});

module.exports = router;

