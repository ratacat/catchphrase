mongoose = require("mongoose");

mongoose.connect("mongodb://localhost");

var phraseSchema = new mongoose.Schema({
	id: {
		type: String,
		default: ""
	},
	word: {
		type:String,
		default: ""
	},
	def: {
		type:String,
		default: ""
	}
});

var Phrase = mongoose.model("Phrase", phraseSchema);
module.exports.Phrase = Phrase;