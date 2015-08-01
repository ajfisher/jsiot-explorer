var five = require("johnny-five");
var Phant = require("phant-client").Phant;

var access = require("./access_keys.json");

var phant = new Phant();

phant.connect(access, function(error, streamd) {
    if (error) {
        console.log(error);
        return;
    }

    var value = (22+(Math.random() * (5 - -5) + -5));
    console.log("Write %s to phant", value);

    phant.add(streamd, {
        "temp": value,
    });
});


