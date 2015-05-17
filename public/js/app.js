//on window load
$(function() {
   var $newPhraseForm = $('#newPhraseForm');

    //on form submit, prevent pageload, post json, and reset form
    $newPhraseForm.on("submit", function(e) {
    	e.preventDefault();
    	Phrase.create($(this).serialize());
    });

    render("phraseTemplate");

});

function Phrase() {};

Phrase.create = function($newPhraseData) {
    //console.log("submit init");
    if (!isValid()){
    	$('#error').html("Please add a word and a definition.");
    	return false;}

    //serialize grabs all inputs from form and turns to a string

    //console.log("npd:"+$newPhraseData);
    if ($newPhraseData.indexOf("word")) {
        $.post("/phrases", $newPhraseData).
        done(function(data) {
            //console.log("d2:" + data);
            render("phraseTemplate");
            $("#newPhraseForm")[0].reset();

        });
     } else {console.log("$newPhraseData.word not true");}
};

Phrase.delete = function(phrase) {
	var phraseId = $(phrase).data().id;
	//console.log(phraseId);
	$.ajax({
		url: '/phrases/' + phraseId,
		type: 'DELETE',
		success: function(res) {
			render("phraseTemplate");
		}
	});

};
//was getting error "Uncaught SyntaxError: unexpected token o       localhost/:1"
//when you try to pass anything but text through JSON.parse();

function render(templateId) {
	//console.log("render init");
	//get json and build template view
    $.get('/phrases').done(function(phrases) {
    	//console.log(phrases);
    	//phrases = JSON.parse(phrases);
    	//console.log(phrases);
    	$("#cardRow").html('');
        _.each(phrases,function(element,index,list) {
         	//console.log("data: " + element);
            var template = _.template($("#" + templateId).html());
           // console.log(template);
           //first key in object sets the variable in the template
            $("#cardRow").append(template({element: element}));
        });

    });
}

function isValid(){
        	var $wordInput = $("#wordInput");
        	var $defInput = $("#defInput");
        	//console.log("wi:"+$wordInput.val());
        	if ($wordInput.val() === '' && $defInput.val() === ''){
        		return false;
        	} else {return true;} 
}