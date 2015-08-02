var bs = require("weatherfeed/bomscraper");
var five = require("johnny-five");

var argv = require("minimist")(process.argv.slice(2));

var board = new five.Board();
var led;

if (!argv.hasOwnProperty("location") || !argv.hasOwnProperty("state")) {
    if (argv.location == undefined && argv.state != undefined) {
        // print out a list of locations for the state
        bs.fetch.forecast({state: argv.state}, function(data) {
            console.log(Object.keys(bs.cache.forecast.data[argv.state]));
            process.exit();
        });
    } else {
        // print the usage message
        console.log("Usage: node weather.js --location loc --state state");
        console.log("  Use state only to print a list of all locations. eg:");
        console.log("  node weather.js --state VIC");
        process.exit();
    }
} else {
    board.on("ready", function () {

        led = five.Led.RGB({
            pins: { red: 9, green: 10, blue: 11 }
        });

        function get_weather() {
            // goes and gets the weather and then sets the colour of the LED 
            // as is required.

            var weather = bs.fetch.forecast({
                location: argv.location.toUpperCase(), 
                state: argv.state,
            }, function forecast_cb(data) {
                // basically get the first of min_0, max_0 or min_1 as the first one
                // to be populated is the current next forecast for the next 12 hours
                var temperature = null;

                ["min_0", "max_0", "min_1"].forEach(function(forecast_val) {
                    if (data[forecast_val] !== '' && temperature == null) {
                        temperature = data[forecast_val];
                    }
                });

                console.log("Next forecast temp is: %s °C", temperature);

                // do the colour selection.
                if (temperature < 15) {
                    led.color("#0000FF");
                } else if (temperature > 25) {
                    led.color("#FF0000");
                } else {
                    led.color("#00FF00");
                }

                // kill the process after a couple of seconds to allow for the
                // message to be written and the LED will stay lit.
                setTimeout(function() {process.exit()}, 2000);
            });
        }

        get_weather();
    });
}
