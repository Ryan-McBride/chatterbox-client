// YOUR CODE HERE:

// my code here


var message = {
	username: 'RyBryMcClaire',
  	text: 'we\'re dropping bombs here....',
  	roomname: 'boom boom room'
};

$(document).ready(function(){

	$('#refresh').on('click', function(event){
		viewMessages();
	})
});

var message = function (){
	$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'POST',
	  data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message sent');
	  },
	  error: function (data) {
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to send message');
	  }
	});}


var viewMessages = function (parameter){
	$.ajax({
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'GET',
	  contentType: 'application/json',
	  success: function (data) {
	  


	    for (var i = 0; i < data.results.length; i++) {
	    	var id = data.results[i].objectId; //stores the users' id in a variable
	  		
	  		if($('#'+id)[0] === undefined){

		    	var $node = ('<div id='+id+' class="chat"></div>'); //makes a jquery node with the id equal to the users id
		    	$('#main').prepend($node); //appends the node to the DOM's body
		    	$('#'+id).append('<p class = username></p>'); //adds a p-tag for the user name
		    	$('#'+id).find('.username').text(data.results[i].username); //inserting clean(ie less system hackable) username text

		    	$('#'+id).append('<p class = message></p>'); //adds a p-tag for the message
		    	$('#'+id).find('.message').text(data.results[i].text);//inserting clean(ie less system hackable) username message
			}
	    };

	  },
	  error: function (data) {
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to send message');
	  }	
});}


viewMessages();

