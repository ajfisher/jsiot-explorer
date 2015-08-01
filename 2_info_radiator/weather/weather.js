var bs = require("weatherfeed/bomscraper");

var argv = require("minimist")(process.argv.slice(2));

console.dir(argv);

if (argv.location == undefined || argv.state == undefined) {

    if (argv.location == undefined) {
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

    // get the data and then make decisions about it.
    // TODO Make this periodic so it updates every 10 mins
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

        // TODO now update value on the LED
    });

}
