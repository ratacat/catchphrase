var phrases = [
	{id: 0,word: "this",def: "a special word referring to the current context"},
	{id: 1,word: "reference type",def: "a type of storage that holds a pointer to the actual object"},
	{id: 2,word: "abstraction",def: "a mental model that represents an encapsulated set of properties and behaviors"}
];

var express = require("express");
var body = require("body-parser");
var path = require("path");
var _ = require("underscore");
var db = require("./models.js");

var uuid = require('node-uuid');

var app = express();
app.use(body.urlencoded({extended: true}));

app.use(express.static("public")); 
app.use(express.static("bower_components"));

//make views path
var viewsDir = path.join(process.cwd(),"views");

//homepage
app.get("/",function(req,res){
	res.sendFile(path.join(viewsDir, "home.html"));
});


//json server out
app.get("/phrases", function(req,res) {
	db.Phrase.find({},function(err,phrases) {
		res.send(phrases);
	});
	// var data = JSON.stringify(phrases);
	// res.send(data);
});

app.delete("/phrases/:id", function(req,res) {
	console.log(req.params);
	db.Phrase.findOneAndRemove({ _id : req.params.id }, function(err,todo) {res.sendStatus(204)});
});


//form server in
app.post("/phrases",function(req,res) {
	//console.log("post received");
	newId = uuid.v4();
	newId = newId.replace(/-/gi, '');
	//console.log(req.body.phrase);
	db.Phrase.create(req.body.phrase, 
		function(err,phrase) {
		res.sendStatus(201,phrase);
	});
	// phrases.push({
	// 	id: newId,
	// 	word: req.body.phrase.word,
	// 	def: req.body.phrase.def,
	// });
	//console.log(phrases[phrases.length-1]);
	//res.sendStatus(200);
});

app.listen(3000,function() {
	console.log("Express is.");
});