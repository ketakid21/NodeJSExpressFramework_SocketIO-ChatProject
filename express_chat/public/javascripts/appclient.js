/* WebSocket Chat Client */

"use strict"; // Strict mode 

/* Clear placeholder text once user clicks on it */

 function clearPlaceholderTextOnFocus() {
 
 var messagevar = document.getElementById('message').placeholder = '';
 
   /* $(function(){
	 $('#message').attr('placeholder', ' ');
	 }); */
}

/* Add placeholder text once user clicks away from textarea */

function addPlaceholderTextOnBlur() {
  /*  $(function(){
	$('#message').attr('placeholder', 'Write your message here ...');
	}); */
  var messagevar = document.getElementById('message').placeholder = 'Write your message here ...';
}

/* Window onLoad Function */

/* window.onload fires when everything in the page has finished loading. That means that not only the entire DOM is loaded, but any linked resources such as images 
are fully loaded. Any code that is not in a function will just be evaluated normally as it is read. If you have jquery I would suggest you use it in 
$(document).ready() */

window.load = windowonloadFunction();

function windowonloadFunction(){

    var supportmsglbl = document.getElementById('supportmsg');
	var messagetxt = document.getElementById('message');
	var sendbtnvar = document.getElementById('sendbtn');
	var messagelogtxt = document.getElementById('messagelog');
	
	if('WebSocket' in window){
	console.log("Your Browser is supporting Websockets.");
	supportmsglbl.innerHTML = 'Your Browser supports Websockets.';
	var img = document.createElement("img");
	img.src = "../images/check.png";
	supportmsglbl.appendChild(img);
	}
else{
	console.log("Your Browser does not support Websockets. Please enable websockets to use this chat app");
	supportmsglbl.innerHTML = 'Your Browser does not support Websockets.';
	var img = document.createElement('img');
	img.src = "../images/cross.png";
	supportmsglbl.appendChild(img);
	messagetxt.disabled = true;
	sendbtnvar.disabled = true;
	}
	
	var closeConnectionbtn = document.getElementById('closeConnectionbtn');
	
	var socket = io.connect(window.location.origin);
		
	if (!socket.connected){
		messagelogtxt.innerHTML = 'Connecting to Server. Please wait.' + '\n';
		messagetxt.disabled = true;
		sendbtnvar.disabled = true;
	}
	
}

// Add a connect listener
/*socket.on('connect',function(client) {
    console.log('Client has connected to the server!');
	console.log("Socket connection status : "+socket.connected);
	var messagetxt = document.getElementById('message');
    var sendbtnvar = document.getElementById('sendbtn');
	var messagelogtxt = document.getElementById('messagelog');

	messagelogtxt.innerHTML = 'You are now connected to server - ' + event.currentTarget.url + '\n';
	messagetxt.disabled = false;
	sendbtnvar.disabled = false;
}); */

/* Close Window Function */

/* only using window.close is working in chrome but in firefox it is not working and dev tools shows error - 
// Scripts may not close windows that were not opened by script. http://keelypavan.blogspot.com/2006/07/closing-tabwindow-in-mozilla-using.html
// window.open("about:blank","_self");
This opens a new page, (non-existent), into a target frame/window, (_parent which of course is the window in which the script is executed), and defines parameters such as window size etc, (in this case none are defined as none are needed). Now that the browser thinks a script opened a page we can quickly close it in the standard way...

window.close(); */

function closeWindow(){

var win = window.open("about:blank","_self");
win.close();
}

/* WebSocket onerror Event */

/*wsocket.onerror = function(error){

console.log('Websocket error : '+error);
}; */

/* Send message to the server using WebSocket */

function sendMsgUsingWebSockets(){

var messagetxt = document.getElementById('message');
var chatmsg = messagetxt.value;

messagetxt.focus();

	if(chatmsg != ''){
	  //wsocket.send(chatmsg);
	  printClientInput(chatmsg);
	  chatmsg = '';
	  messagetxt.value = '';
	}
}

/* Print message sent to the Server from Client */

function printClientInput(msg){

var messagelogtxt = document.getElementById('messagelog');

messagelogtxt.innerHTML += 'Client : ' + msg + '\n';
console.log(msg);
}

/* WebSocket onmessage Event (Prints message received from Server)*/

// Receive messages from server. When client receives message from server then onmessage event is called.

/*wsocket.onmessage = function (event){

var messagelogtxt = document.getElementById('messagelog');
	
var message = event.data;
messagelogtxt.innerHTML += 'Server : ' + message + '\n';
}; */

/* WebSocket onclose Event */

/*wsocket.onclose = function (event){

var messagetxt = document.getElementById('message');
var sendbtnvar = document.getElementById('sendbtn');
var messagelogtxt = document.getElementById('messagelog');

messagelogtxt.innerHTML += 'Disconnected from Server.';
messagetxt.disabled = true;
sendbtnvar.disabled = true;
}; */

/* Close connection button Click Event */

/* The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.

For example, this can be useful when:

Clicking on a "Submit" button, prevent it from submitting a form
Clicking on a link, prevent the link from following the URL
Note: Not all events are cancelable. Use the cancelable property to find out if an event is cancelable.

Note: The preventDefault() method does not prevent further propagation of an event through the DOM. Use the stopPropagation() method to handle this. */

/*closeConnectionbtn.onclick = function(event){

event.preventDefault();
wsocket.close();
}; */

/* Reset Text entered for chat on click of Reset Button */

function resetText(){

var messagetxt = document.getElementById('message');

messagetxt.value = "";
messagetxt.focus();
}

/* Submit chat text by clicking Enter button on Keyboard */

function submitEnterKey(){

var messagetxt = document.getElementById('message');
var sendbtnvar = document.getElementById('sendbtn');

messagetxt.addEventListener("keyup",function(event){
event.preventDefault();
		if(event.keyCode == 13){
		//The "g" switch is global replace, "m" means it should happen more than once. Note: If you are replacing a value (and not a regular expression), 
		// only the first instance of the value will be replaced. To replace all occurrences of a specified value, use the global (g) modifier. 
		// piece of code with the javascript replace method removes all three types of line breaks by using this bit of a regular expression: \r\n|\n|\r. 
		//This tells it to replace all instance of the \r\n then replace all \n than finally replace all \r. It goes through and removes all types of line 
		//breaks from the designated text string. The "gm" at the end of the regex statement signifies that the replacement should take place over many 
		// lines (m) and that it should happen more than once (g). The "g" in the javascript replace code stands for "greedy" which means the replacement 
		// should happen more than once if possible. If for some reason you only wanted the first found occurrence in the string to be replaced then you 
		//would not use the "g". http://www.textfixer.com/tutorials/javascript-line-breaks.php

		messagetxt.value = messagetxt.value.replace(/(\r\n|\n|\r)/gm,"");
		sendbtnvar.click();
		}
	});
}