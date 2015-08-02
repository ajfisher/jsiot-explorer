var five = require("johnny-five");

var board = new five.Board();

board.on("ready", function() {

    var led = five.Led({pin:13});

    led.blink(1000);

});
