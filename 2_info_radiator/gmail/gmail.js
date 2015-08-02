var auth = require("./auth.js");
var five = require("johnny-five");
var fs = require('fs');
var google = require('googleapis');

var TEST_CONN = false;
var CENTER_SERVO = false;
if (process.argv[2] == "test") {
    TEST_CONN = true;
} else if( process.argv[2] == "centre") {
    CENTER_SERVO = true;
}

var board = new five.Board();
var servo;
var servo_min = 30, servo_max = 150;

board.on("ready", function() {

    servo = new five.Servo({pin: 9});

    // Now board is ready, Load client secrets from a local file and get the details.
    fs.readFile('2_info_radiator/gmail/client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        // Authorize a client with the loaded credentials, then call the Gmail API.
        auth.authorize(JSON.parse(content), getInbox);
    });

});

function getInbox(auth) {

    var gmail = google.gmail('v1');
    gmail.users.labels.get({
        auth: auth,
        userId: 'me',
        id: 'INBOX'
    }, function(err, response) {

        if (err) {
            console.log('API returned an err: ' + err);
            return;
        }

        if (TEST_CONN) {
            console.log(response);
        }

        // get how many unread threads you have as a proportion of the total
        var full = response.threadsUnread / response.threadsTotal;
        console.log("%s% of threads unread", (full*100).toFixed(2));

        if (CENTER_SERVO) {
            servo.to(90);
        } else {
            var pos = servo_min + ((servo_max-servo_min)*full);
            servo.to(Math.round(pos));
        }
    });

    setTimeout(getInbox, 10000, auth);
}
