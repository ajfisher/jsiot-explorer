var five = require("johnny-five");

// web server elements
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var board, lightsensor;

var port = 8001;

server.listen(port);
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

console.log("MESSAGE: Web server now listening on http://localhost:%s", port);

// Set up Socket IO
var io = require('socket.io').listen(server);

// handler for when connection comes in.
io.sockets.on("connection", function(socket) {

    if (board.isReady) {
        lightsensor.on("data", function(value) {
            var dp = [{
                time: (new Date()).getTime() / 1000,
                y: value,
            }];
            console.log(dp);
            socket.emit("data", {dp: dp});
        });
    }
});

board = new five.Board();
board.on("ready", function() {

    lightsensor = new five.Sensor({
        pin: "A0",
        freq: 1000,
    });
});

