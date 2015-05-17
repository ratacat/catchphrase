//need express, body-parser, _underscore, jquery?
//phrase objects
//have id, word, & definitions
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
	var data = JSON.stringify(phrases);
	res.send(data);
});

app.delete("/phrases/:id", function(req,res) {
	var index; 
	//set value of the id
	var targetId = req.params.id;
	console.log(phrases);

	//find item in the array matching the id
	//var targetItem = _.findWhere(phrases, {id: targetId});

	//had trouble comparing the targetId to the phraseId, target ID was a string
	for (var i=0;i<phrases.length;i++){
		console.log("phraseId: " + phrases[i].id + "("+typeof(phrases[i].id)+")");
		console.log("targetId: " + targetId + "("+typeof(targetId)+")");
		if (phrases[i].id.toString() === targetId) {
			index = i;
			console.log("i: "+ i);
		}
	}
	//console.log("targetItem:" + targetItem);

	//get the index of the found item
	//var index = phrases.indexOf(targetItem);

	//remove the item at that index, only remove 1 item
	console.log("splicing 1 element at index "+index);
	console.log(targetItem = phrases.splice(index,1));

	//respond with the JSON of the item we deleted, good practice
	res.send(JSON.stringify(targetItem));
});

//form server in
app.post("/phrases",function(req,res) {
	console.log("post received");
	newId = uuid.v4();
	newId = newId.replace(/-/gi, '');
	//console.log(newId);
	phrases.push({
		id: newId,
		word: req.body.phrase.word,
		def: req.body.phrase.def,
	});
	console.log(phrases[phrases.length-1]);
	res.sendStatus(200);
});

app.listen(3000,function() {
	console.log("Express is.");
});