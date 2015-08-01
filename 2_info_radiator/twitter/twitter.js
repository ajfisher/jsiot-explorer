var Twitter = require("twitter");

var twitter_creds = require ("./access_af.js");

var client = new Twitter({
    consumer_key: twitter_creds.TWITTER_CONSUMER_KEY,
    consumer_secret: twitter_creds.TWITTER_CONSUMER_SECRET,
    access_token_key: twitter_creds.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: twitter_creds.TWITTER_ACCESS_TOKEN_SECRET,
});

client.stream('statuses/filter', {track: "robot" }, function(stream) {
    stream.on("data", function(tweet) {
        console.log("---");
        console.log(tweet.text);
    });

    stream.on("error", function(error) {
        console.log(error);
    });
});

