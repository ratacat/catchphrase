//need express, body-parser, _underscore, jquery?
// bower components public
//init express, app = express;

//bower install underscore & jquery?

//enable body-parser for form
//set public folder

//phrase objects
//have id, word, & definitions

//routes for json out?
//route for post, add to json in
//route for home


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
app.use(express.static("public"));
app.use(express.static("bower_components");

//make views path
var views = path.join(process.cwd,"views");