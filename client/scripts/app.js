// YOUR CODE HERE:

// my code here


// var message = {
// 	username: 'Mel Brooks',
//   	text: 'It\'s good to be the king',
//   	roomname: 'lobby'
// };

var friends = function(){
	$('.chat').on('click', 'a', function(event){
		app.addFriend();
	});
}

$(document).ready(function(){

	$('#refresh').on('click', function(event){ //when the #refresh is clicked, this function is called
		app.init(); //function displayes new messages
	});

	friends();
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
	});
};

var app = {
  init : function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {

        for (var i = 0; i < data.results.length; i++) {
          var id = data.results[i].objectId; //stores the users' id in a variable

          if($('#'+id)[0] === undefined && data.results[i].username !== undefined && data.results[i].text !== undefined ){
            //this if statement skips over tweets that are already populated or empty username or messages

            var $node = ('<div id='+id+' class="chat"></div>'); //makes a jquery node with the id equal to the users id
            $('#main').prepend($node); //appends the node to the DOM's body
            $('#'+id).append('<a href="#" class = username></a>'); //adds a p-tag for the user name
            $('#'+id).find('.username').text(data.results[i].username); //inserting clean(ie less system hackable) username text

            $('#'+id).append('<p class = message></p>'); //adds a p-tag for the message
            $('#'+id).find('.message').text(data.results[i].text);//inserting clean(ie less system hackable) username message

            $('#'+id).append('<p class = roomname></p>'); //adds a p-tag for the message
            $('#'+id).find('.roomname').text('room name: ' + data.results[i].roomname);//inserting clean(ie less system hackable) username message

           }
        }
       friends();
      },

      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      } 
     }); 
	
  	},

  	send: function(message){
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
		});
  	},

  	fetch: function(){
  		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  type: 'GET'})
  	},

  	clearMessages: function(){
  		$('.chat').remove();
  	},

  	addMessage: function(message) {
 		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: 'https://api.parse.com/1/classes/chatterbox',
		  type: 'POST',
		  data: JSON.stringify(message),
		  contentType: 'application/json',
		  
		  success: function () {
		  	var id = 'bananaRama';
            var $node = ('<div id='+id+' class="chat"></div>'); //makes a jquery node with the id equal to the users id
            $('#main').prepend($node); //appends the node to the DOM's body
            $('#'+id).append('<p class = username></p>'); //adds a p-tag for the user name
            $('#'+id).find('.username').text(message.username); //inserting clean(ie less system hackable) username text

            $('#'+id).append('<p class = message></p>'); //adds a p-tag for the message
            $('#'+id).find('.message').text(message.text);//inserting clean(ie less system hackable) username message

            $('#'+id).append('<p class = roomname></p>'); //adds a p-tag for the message
            $('#'+id).find('.roomname').text('room name: ' + message.roomname);//inserting clean(ie less system hackable) username message

		    console.log('chatterbox: Message appended');
		  	friends();
		  },
		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('chatterbox: Failed to append message');
		  }

		}); 		
	
  	},

	addRoom: function(room) {
		/*
		       expect($('#roomSelect').children().length).to.equal(1);
      });*/
	var room = ""+room;

    var $node = ('<div id='+room+'></div>'); //makes a jquery node with the id equal to the users id
    $('#roomSelect').prepend($node); //appends the node to the DOM's body
    $('#'+room).text(room);
    

	},

	addFriend: function(){
		$.ajax({type:'POST'})
		return true;
	},

};
app.init();

