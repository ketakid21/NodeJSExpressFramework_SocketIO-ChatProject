/* Node JS express framework Server using Soket IO */

var port = (process.env.PORT || 3000); // This is for deploying application to Heroku
	
var express = require('express');
var app = express(); // app is express request handler.

//To get the file path to a folder we will require the native Node module path, near the top of app.js.
/* http://www.fullstacktraining.com/articles/how-to-serve-static-files-with-express
express.static is used to serve static files with express.  */

var path = require('path');

/* The path module exposes a join method that allows us to chain together variables to create a file path. The join
method is used instead of specifying a full file path, as this avoids issues of operating systems working differently
with forward slashes and backslashes. So we'll pass path.join into the express.static method. And then we'll path the
folder information into path.join. The first parameter to use is a native Node variable __dirname which contains the
file path of the current folder. The second parameter will be the name of the folder containing the static resources,
in our case public. use is a method to configure the middleware used by the routes of the Express HTTP server object.
The method is defined as part of Connect that Express is based upon. */

app.use(express.static(path.join(__dirname, 'public')));

/* The module.exports or exports is a special object which is included in every JS file in the Node.js application 
by default. module is a variable that represents current module and exports is an object that will be exposed as a 
module. So, whatever you assign to module.exports or exports, will be exposed as a module. exports is an object. So,
you can attach properties or methods to it. The following example exposes an object with a string property 
in Message.js file. var app = module.exports = express.createServer(); : express.createServer() has been deprecated */

// Create http server instance.
var server = require('http').createServer(app); 

//Middleware
app.listen(port, function () {
  console.log((new Date()) + ' Server is listening on port : '+port);
})

/* https://expressjs.com/en/guide/writing-middleware.html
Writing middleware for use in Express apps : Middleware functions are functions that have access to the request object
(req), the response object (res), and the next middleware function in the application’s request-response cycle. The 
next middleware function is commonly denoted by a variable named next. Middleware functions can perform the following
tasks:

Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware in the stack.
If the current middleware function does not end the request-response cycle, it must call next() to pass control to the
next middleware function. Otherwise, the request will be left hanging. 
Here is a simple example of a middleware function called “myLogger”. This function just prints “LOGGED” when a request
to the app passes through it. The middleware function is assigned to a variable named myLogger.

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
Notice the call above to next(). Calling this function invokes the next middleware function in the app. The next() function is not a part of the Node.js or Express
API, but is the third argument that is passed to the middleware function. The next() function could be named anything, but by convention it is always named “next”.
To avoid confusion, always use this convention. To load the middleware function, call app.use(), specifying the middleware function. */

/* below line is to avoid error on console - XMLHttpRequest cannot load http://127.0.0.1:3000/socket.io/?EIO=3&transport=polling&t=LXaMfn1. 
No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. The response had HTTP
status code 404. You can try to install cors module from npm.*/ 

app.use(function (req, res, next) { 
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
res.setHeader('Access-Control-Allow-Credentials', true); 
next(); 
});

/* if your app is created with express framework, use a CORS middleware like */

/*var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}

app.config(function() {
    app.use(allowCrossDomain);
});    */

/* Route for getting index.html page */
	
app.get('/', function(req, res,next) { 
    res.sendFile(__dirname + '/index.html');
});

/* Route for getting about.html page */

app.get('/about.html', function(req, res,next) {  
    res.sendFile(__dirname + '/public/html/about.html');
});
	
// Include SoketIO library and attach to server. This binds Socket IO to the server.
var socketIO = require('socket.io')(server);

// Connection event occurs when handshake happens. First time client sends request to server.
socketIO.on('connection', function (socket) {
	
  console.log('User connected');
  
  // When client-server connection gets disconnected, this event will get fired.
  socket.on('disconnect', function () {
    console.log('User disconnected');
  });
  
});




/* // Existing contents of auto generated app.js file from express gnerator (express express_chat) -

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; */
