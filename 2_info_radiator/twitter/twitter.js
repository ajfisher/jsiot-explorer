var five = require("johnny-five");
var Twitter = require("twitter");

var twitter_creds = require ("./access.js");
var board = new five.Board();
var led;
var keyword = "robot";

if (process.argv[2] == undefined) {
    console.log("Using keyword 'robot', pass a keyword next time");
} else {
    keyword = process.argv[2];
    console.log("Tracking keyword: %s", keyword);
}

board.on("ready", function() {
    led = new five.Led({pin: 9});
});

var client = new Twitter({
    consumer_key: twitter_creds.TWITTER_CONSUMER_KEY,
    consumer_secret: twitter_creds.TWITTER_CONSUMER_SECRET,
    access_token_key: twitter_creds.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: twitter_creds.TWITTER_ACCESS_TOKEN_SECRET,
});

client.stream('statuses/filter', {track: keyword }, function(stream) {

    stream.on("data", function(tweet) {
        if (board.isReady) {
            led.fade({
                easing: "linear",
                duration: 1000,
                cuePoints: [0, 0.7, 1],
                keyFrames: [0, 255, 0],
            });
            console.log("---");
            console.log(tweet.text);
        }
    });

    stream.on("error", function(error) {
        console.log(error);
    });
});

