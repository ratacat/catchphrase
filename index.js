//need express, body-parser, _underscore, jquery?


//phrase objects
//have id, word, & definitions
phrases = [
	{
	id: 0,
	word: "this",
	def: "a special word referring to the current context"},

	{id: 1,
	word: "reference type",
	def: "a type of storage that holds a pointer to the actual object"},

	{id: 2,
	word: "abstraction",
	def: "a mental model that represents an encapsulated set of properties and behaviors"}
];

//route for del


//other files
//app.js
//--render 

//index.html
//base html
//underscore template for card

express = require("express");
body = require("body-parser");
path = require("path");

app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("bower_components"));

//make views path
var views = path.join(process.cwd(),"views");

//homepage
app.get("/",function(req,res){
	res.send(phrases);
});

//json server out
app.get("/phrases", function(req,res) {

});

//form server in
app.post("/phrases",function(req,res) {

});

app.listen(3000,function() {
	console.log("Express is.");
});