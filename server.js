//using globally installed express, make sure express is later installed in project dependencies
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var User = require('./db/user');

app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');


app.get("/", function (req,res) {
	//already knows the view folder by default
		User.find({},function(err, data){
			if (err) throw err;
			console.log(data);
			res.render('pages/index', { users: data });
		});	
});

app.get("/adduser", function (req,res) {
		res.render('pages/adduser');
});

app.get("/:id", function (req,res) {
		User.findById(req.params.id,function(err, data){
			if (err) throw err;
			console.log(data);
			res.render('pages/user', { user: data });
		});	
});

app.get("/edituser/:id", function (req,res){
		User.findById(req.params.id,function(err, data){
			if (err) throw err;
			console.log(data);
			res.render('pages/edituser', { user: data });
		});	
});

app.get("/removeuser/:id", function (req,res){
		User.findByIdAndRemove(req.params.id,function(err, data){
			if (err) throw err;
			console.log(data);
			res.redirect('/');
		});	
});

app.post("/adduser", function (req,res) {
	//already knows the view folder by default
		var newUser = new User({
			_id: new mongoose.Types.ObjectId(),
			email: req.body.email,
			password: req.body.pass,
			firstName: req.body.fname,
			lastName: req.body.lname,
			bio: req.body.bio
	    });
		newUser.save(function(err) {
			if (err) throw err;
			console.log('User Created Successfully');
			//do something like reload to reflect change
			res.redirect('/');
		});

});

app.post("/edituser", function (req,res) {

	    var editUser = {
			email: req.body.email,
			password: req.body.pass,
			firstName: req.body.fname,
			lastName: req.body.lname,
			bio: req.body.bio
	    };

	    User.findByIdAndUpdate(req.body.id,editUser,function(err, data){
			if (err) throw err;
			console.log(data);
			res.redirect('/'+req.body.id);
		});	
});





app.listen(8080);


console.log("Server has started");