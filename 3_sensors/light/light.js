// web server elements
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var board;

//
//
// Set up the application server
//
var port = 8001;

server.listen(port);
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

console.log("MESSAGE: Web server now listening on http://localhost:%s", port);

// Set up Socket IO
var io = require('socket.io').listen(server);

io.sockets.on("connection", function(socket) {

    setInterval(function() {
        var dp = [{
            time: (new Date()).getTime() / 1000,
            y: (Math.random() * (1023)),
        }];
        socket.emit("data", {dp: dp});
    }.bind(this), 1000)
});
