var five = require("johnny-five");
var Phant = require("phant-client").Phant;

var access = require("./access_keys.json");

var phant = new Phant();
var p_streamd;

var board = new five.Board();
var temperature;

// This is a custom temperature controller for the chip we're using as
// it hasn't made it into Johnny-Five quite yet.
var LM335_controller = {
    initialize: {
        value: function (opts, dataHandler) {
            var pin = opts.pin;
            this.io.pinMode(pin, this.io.MODES.ANALOG);
            this.io.analogRead(pin, function(data) {
                dataHandler.call(this, data);
            }.bind(this));
        }
    },
    toCelsius : {
        value: function(raw) {
            var mv = (raw/1024.0) * 5000;
            var k = (mv/10);
            return (k-273.15);
        }
    },
};

board.on("ready", function() {

    temperature = five.Temperature({
        pin: "A0",
        controller: LM335_controller,
        freq: 10000  // log every 10 seconds
    });

    temperature.on("data", function(data) {
        console.log(data.celsius + "°C " + data.kelvin + "°K");
        // log the data to phant
        phant.add(p_streamd, {
            temp: data.celsius,
        });
    });
});

phant.connect(access, function(error, streamd) {
    if (error) {
        console.log(error);
        return;
    }

    // set this to a context where it can be used by Johnny-Five.
    // This isn't ideal but phant doesn't emit an event when it connects and
    // it's not worth connecting over and over again.
    p_streamd = streamd;
});


